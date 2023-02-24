from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from Model import get_quote

app = Flask(__name__)



@app.route('/get', methods=['GET'])
def get_articles():
    return jsonify ({"Hello": "World"})

#ref = db.reference('/')

@app.route('/add', methods=['POST'])
def add_articles():
    userID = request.json['userID']
    queryTime = request.json['time']
    responseQuery = request.json['responseQuery']

    emotion = get_quote(responseQuery)


    # ref.set({
    #     'Users': 
    #     {
    #         'user1':
    #         {
    #             'name': 'Sakshi'
        
    #         },
    #         'user2':
    #         {
    #             'name': 'vinod'
    #         }
    #     }

    #})

    #print(userID)
    return jsonify({userID: emotion})





if __name__ == "__main__":
    app.run(debug=True)