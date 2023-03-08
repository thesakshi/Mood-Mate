import pandas as pd
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, pipeline
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModel
import torch.nn.functional as f
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from Data import get_data

def initiate_classifier():
    ''' Initiates the HuggingFace's Zero Shot Classification Pipeline.'''

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    return classifier

def zero_shot_classifier(classifier, quote, classes):
    ''' Using the Zero Shot Classifier, it classifiers the quote and class as 'inspirational', it returns a score which describes how inspirational is the quote.'''
    
    classifier_output = classifier(quote, classes)
    return classifier_output['scores'][0]

def mean_pooling(model_output, attention_mask):
    ''' Pooling to determine the output of a sentence similarity classifer.'''
    token_embeddings = model_output[0]
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


def get_sentiment(responseQuery):
    ''' Returns the sentiment score associated with a query. '''
    tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
    model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english')

    inputs = tokenizer(responseQuery, return_tensors="pt")
    logits = model(**inputs).logits

    predicted_class = logits.argmax().item()

    # Compute percentage of positive sentiment class
    if predicted_class == 1:
        positive_percentage = logits.softmax(dim=1)[0][1].item() * 100
    else:
        positive_percentage = (1 - logits.softmax(dim=1)[0][0].item()) * 100

    return positive_percentage

def similarity_score(sentences, emotion):
    ''' Returns the Similarity Score of the sentences (cosine similarity)'''
    tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/LaBSE')
    model = AutoModel.from_pretrained('sentence-transformers/LaBSE')
    encoded_input = tokenizer(sentences, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    sentence_embeddings = f.normalize(sentence_embeddings, p =2, dim=1)

    cosine_similarity = torch.nn.functional.cosine_similarity(sentence_embeddings[0], sentence_embeddings[1], dim=0)

    return cosine_similarity.item()




def tfidf_10(query, ref):
    ''' From the entire Dataset, we choose the top 10 quotes using tf-idf similarity, and then choose the quote with the highest inspirational score.'''
    df = get_data(ref)

    vectorizer = TfidfVectorizer()

    print("Tranforming all quotes")
    quotes_vectorized = vectorizer.fit_transform(df['Quote'])
    print("Transformed")

    query_vectorized = vectorizer.transform([query])
    
    print("Cosine similarities")
    similarity = cosine_similarity(query_vectorized, quotes_vectorized)
    print("Found cosine similarity")
    # Find the index of the most similar quote
    top_quotes_indices = similarity.argsort()
    top_quotes_indices = top_quotes_indices[0][::-1]
    top_quotes_indices = top_quotes_indices[:10]


    max_score = 0
    quote = ""
    author = ""
    classifier = initiate_classifier()
    for i, index in enumerate(top_quotes_indices):
        print(df.iloc[index]['Quote'])
        print(df.iloc[index]['Tags'])
        print("*****")

        inspirational_score = zero_shot_classifier(classifier, df.iloc[index]['Quote'], ['inspirational'])

        if inspirational_score > max_score:
            max_score = inspirational_score
            quote = df.iloc[index]['Quote']
            author = df.iloc[index]['Author']
      

        
    final_quote = author + " says, '" + quote + "'"
    return final_quote






def get_quote(responseQuery, ref):

    return tfidf_10(responseQuery, ref)

# if __name__ == "__main__":
    
#     top_indices = 
#     print(top_indices)
