"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Genders
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#GET ALL GENDERS#

@api.route('/genders', methods=['GET'])
def get_all_genders():
    genders = Genders.query.all()

    if not genders:
        return jsonify({"msg": "No se encontraron generos"}), 404

    serialized_genders = [genders.serialize() for gender in genders]
    return jsonify(serialized_genders), 200

#GET ONE GENDER BY ID#

@api.route('/genders/<int:gender_id>', methods=['GET'])
def get_gender_by_id(gender_id):
    gender = Genders.query.get(gender_id)

    if not gender:
        return jsonify({"msg": "Genero no encontrado"}), 404

    serialized_gender = gender.serialize()
    return jsonify(serialized_gender), 200

#POST NEW GENDER#

@api.route('/genders', methods=['POST'])
def create_new_gender():
    request_body = request.get_json()

    if "type" not in request_body:
        return jsonify({"error": "Datos incompletos"}), 400

    new_gender = Genders(
        type=request_body["type"]
    )

    db.session.add(new_gender)
    db.session.commit()

    return jsonify({"msg": "Nuevo genero creado"}), 200





