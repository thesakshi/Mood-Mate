from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from Model import get_quote
from Data import initialize_app

app = Flask(__name__)



@app.route('/get', methods=['GET'])
def get_articles():
    return jsonify ({"Hello": "World"})

ref = initialize_app()

@app.route('/add', methods=['POST'])
def add_articles():
    userID = request.json['userID']
    queryTime = request.json['time']
    responseQuery = request.json['responseQuery']

    

    relevant_quote = get_quote(responseQuery, ref)
    x=jsonify({'response': relevant_quote})
 
    return x





if __name__ == "__main__":

    app.run(debug=True)