"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, abort, redirect
from api.models import db, User, Videogame
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/videogames', methods=['GET'])
def getVideogames():
    allVideogames = Videogame.query.all()

    result = list(map(lambda item: item.serialize(), allVideogames))

    return jsonify(result), 200

# @api.route('/videogames', methods=['GET'])
# def index():
#     videogame = Videogame.query.all()

# #check that there is any videogame, if yes, show
#     if len(videogame) < 1:
#         return jsonify({"msg": "not found"}), 404
#     serialized_videogame = list(map(lambda x: x.serialize(), videogame))
#     return jsonify (serialized_videogame), 200 

#add new videogame
@api.route("/videogames/new", methods=["GET", "POST"])
def new_videogame():
    data = request.get_json()
    videogame = Videogame(
        name=data['name'],
        pegi=int(data['pegi']),
        year=int(data['year'])
    )

    db.session.add(videogame)

#try commit,if created show a message, if not give an error with message
    try:
        db.session.commit()
        return jsonify({"message":"videogame created succesfully"}),201
    except Exception as error:
        print(error)
        return jsonify({"message":"error creating videogame"}), 500

#update info videogame
@api.route("/videogames/<int:id>", methods=["PUT" ])
def update_videogame(id):
    videogame = Videogame.query.get(id)

    if not videogame:
        abort(404)

    if request.method == "PUT":
        data = request.get_json()

        if not data.get("id"):
            abort(400, description="Id field is mandatory.")
    
        videogame.name = data.get("name", videogame.name)
        videogame.pegi = int(data.get("pegi", videogame.pegi))
        videogame.year = int(data.get("year", videogame.year))

        db.session.commit()

        return redirect("/videogame/{}".format(videogame.id))

#delete videogame
@api.route("/videogames/<int:id>/delete", methods=["DELETE" ])
def delete_videogame(id):
    videogame = Videogame.query.get(id)

    if not videogame:
        abort(404)

    db.session.delete(videogame)
    db.session.commit()

    return redirect("/")
