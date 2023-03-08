import pandas as pd
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModel, pipeline
import torch.nn.functional as f
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from Data import initialize_app



class RelevantQuote:
    def __init__(self, responseQuery):
        self.query = responseQuery

    def load_models(self):
        self.tokenizer_sentiment = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
        self.model_sentiment = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english')

        self.similarity_tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
        self.similarity_model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')

    def get_sentiment(self, query ):

        inputs = self.tokenizer_sentiment(query, return_tensors="pt")
        logits = self.model_sentiment(**inputs).logits


        predicted_class_id = logits.argmax().item()
        return self.model_sentiment.config.id2label[predicted_class_id]
    
    def load_data(self):
        self.df = pd.read_csv('/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/server/quotes_dataset.csv')
        self.df = self.df.iloc[:, :3]
        self.df.columns = ['Quote', 'Author', 'Tags']
        self.df = self.df.dropna()


    def get_top_matches(self, num):
        vectorizer = TfidfVectorizer()

        print("Tranforming all quotes")
        quotes_vectorized = vectorizer.fit_transform(self.df['Quote'])
        print("Transformed")

        print(self.query)
        s=input("Wait")
        query_vectorized = vectorizer.transform([self.query])
        
        print("Cosine similarities")
        similarity = cosine_similarity(query_vectorized, quotes_vectorized)
        print("Found cosine similarity")
        # Find the index of the most similar quote
        top_quotes_indices = similarity.argsort()
        top_quotes_indices = top_quotes_indices[0][::-1]
        top_quotes_indices = top_quotes_indices[:num]

        self.top_quotes_indices = top_quotes_indices
        return top_quotes_indices

    def mean_pooling(self, model_output, attention_mask):
        token_embeddings = model_output[0]
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)


    def similarity_score(self, sentences):
        encoded_input = self.similarity_tokenizer(sentences, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            model_output = self.similarity_model(**encoded_input)

        sentence_embeddings = self.mean_pooling(model_output, encoded_input['attention_mask'])
        sentence_embeddings = f.normalize(sentence_embeddings, p =2, dim=1)

        cosine_similarity = torch.nn.functional.cosine_similarity(sentence_embeddings[0], sentence_embeddings[1], dim=0)

        return cosine_similarity.item()
    

    def get_most_relevant_quote(self):
        max_score = 0
        relevant_quote = ""
        for i, index in enumerate(self.top_quotes_indices):
            print(self.df['Quote'][index])
            
            if self.get_sentiment(self.df['Quote'][index]) == 'POSITIVE':
                sentences = [self.df['Quote'][index], self.query]
                score = self.similarity_score(sentences)
                print(score)
                s=input()
                if max_score < score:
                    max_score = score
                    relevant_quote = self.df['Quote'][index]
        

        return relevant_quote
    

    def calculate(self):
        self.load_data()
        self.load_models()
        x = self.get_top_matches(10)
        for i in x:
            print(self.df['Quote'][i])
            s=input()
        return self.get_most_relevant_quote()







# def load_data_labels():
#     df = pd.read_csv('/Users/sakshi/Desktop/Mood-Mate/server/quotes_dataset.csv')
#     df = df.iloc[:, :3]
#     df.columns = ['Quote', 'Author', 'Tags']

#     df['Tags'] = df['Tags'].str.split(', ')
#     df = df.explode('Tags')
#     class_counts = pd.Series(df['Tags']).value_counts().sort_values(ascending=False)

#     return class_counts


# def sentence_similarity(query):
#     df = pd.read_csv('/Users/sakshi/Desktop/Mood-Mate/server/quotes_dataset.csv')
#     df = df.iloc[:, :3]
#     df.columns = ['Quote', 'Author', 'Tags']
#     max_score = 0
#     quote_needed = ""
#         i = 0
#         for quote in df['Quote']:
#             print("Chekcing for something. ", i )
#             x = similarity_score([quote, query], 0) 
#             if x> max_score:
#                 max_score = x
#                 quote_needed =quote

#             i = i + 1
    








if __name__ == "__main__":

    RelevantQuoteClass = RelevantQuote("I got late to work today ")
    quote = RelevantQuoteClass.calculate()
    print(quote)

    
