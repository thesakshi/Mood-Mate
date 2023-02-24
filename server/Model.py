import pandas as pd
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModel
import torch.nn.functional as f
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity



def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


def get_sentiment(responseQuery):
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
    tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/LaBSE')
    model = AutoModel.from_pretrained('sentence-transformers/LaBSE')
    search_pipeline = TextSearchPipeline(model=model, tokenizer=tokenizer, task='text-similarity-opposite')

    #Compute the similarity score between two sentences with opposite sentiment
    
    results = search_pipeline(sentences[1], sentences[0], top_k=1)

# Print the most similar quote and its similarity score
    most_similar_quote = results[0]['text']
    similarity_score = results[0]['score']
    print(f"The most similar quote to '{sentences[1]}' with opposite sentiment is:\n{most_similar_quote}\nSimilarity score: {similarity_score:.2f}")
#In this example code, we define a list of quotes with opposite sentiment and a search pipeline with the TextSearchPipeline class, using the pre-trained LaBSE model and the text-similarity-opposite task template. We then define an input sentence and use the search() method of the search pipeline to find the most similar quote in the list with opposite sentiment, with a maximum of 1 result (top_k=1). Finally, we print the most similar quote and its similarity score. You can adjust the top_k parameter to return more or fewer search results.






    # Print the similarity score
    print(f"Similarity score between '{sentences[0]}' and '{sentences[1]}' with opposite sentiment: {similarity_score:.2f}")

    

def load_data_labels(df):


    df['Tags'] = df['Tags'].str.split(', ')
    df = df.explode('Tags')
    class_counts = pd.Series(df['Tags']).value_counts().sort_values(ascending=False)

    return class_counts


    

def tfidf_10(query):
    df = pd.read_csv('/Users/sakshi/Desktop/Mood-Mate/server/quotes_dataset.csv')
    df = df.iloc[:, :3]
    df.columns = ['Quote', 'Author', 'Tags']
    df = df.dropna()



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
    top_quotes_indices = top_quotes_indices[:20]

    #return top_quotes_indices
    # print(len(top_quotes_indices))

    # # Print the top 100 quotes with their similarity scores
    max_score = 0
    quote = ""
    for i, index in enumerate(top_quotes_indices):
        #print(df.iloc[index]['Quote'])
        #print(df.iloc[index]['Tags'])
        #s=input()
        sentiment_class = get_sentiment(df.iloc[index]['Quote'])
        if sentiment_class > max_score:
            max_score = sentiment_class
            quote = df.iloc[index]['Quote']
        #similarity_score([df.iloc[index]['Quote'], query], 0)
       
    return quote

    # # Print the most similar quote
    # #print(df.iloc[most_similar_index]['Quote'])

    #classifier = pipeline("zero-shot-classification")
    #load_data_labels()




def get_quote(responseQuery):

    return tfidf_10(responseQuery)

# if __name__ == "__main__":
    
#     top_indices = 
#     print(top_indices)
