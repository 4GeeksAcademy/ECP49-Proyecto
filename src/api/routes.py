from flask import request, jsonify, url_for, Blueprint, abort, redirect
from api.models import db, User, Videogame, Consoles, Genres
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
#get all videogames
@api.route('/videogames', methods=['GET'])
@cross_origin(methods=["GET"], headers=["Content-Type", "Authorization"])
def getVideogames():
    allVideogames = Videogame.query.all()

    result = list(map(lambda item: item.serialize(), allVideogames))

    return jsonify(result), 200

#get single videogame
@api.route('/videogames/<int:id>', methods=['GET'])
@cross_origin(methods=["GET"], headers=["Content-Type", "Authorization"])
def get_single_videogame(id):
    videogame = Videogame.query.get(id)

    videogame_json = videogame.to_json()
    if '_sa_instance_state' in videogame_json:
        del videogame_json['_sa_instance_state']
        return videogame_json
      
# @api.route('/videogames', methods=['GET'])
# def index():
#     videogame = Videogame.query.all()

### VIDEOGAME METHODS ###
@api.route('/videogames', methods=['GET'])
def get_videogames():
    all_videogames = Videogame.query.all()
    result = list(map(lambda item: item.serialize(), all_videogames))
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

    try:
        db.session.commit()
        return jsonify({"message": "Videogame created successfully"}), 201
    except Exception as error:
        print(error)
        return jsonify({"message": "Error creating videogame"}), 500

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


### CONSOLE METHODS ###
# Ruta para obtener todas las consolas
@api.route('/consoles', methods=['GET'])
def get_all_consoles():
    consoles = Consoles.query.all()

    if not consoles:
        return jsonify({"msg": "Consoles not found"}), 404

    serialized_consoles = [console.serialize() for console in consoles]
    return jsonify(serialized_consoles), 200

# Ruta para obtener una consola por su ID
@api.route('/consoles/<int:console_id>', methods=['GET'])
def get_console_by_id(console_id):
    console = Consoles.query.get(console_id)

    if not console:
        return jsonify({"msg": "Console not found"}), 404

    serialized_console = console.serialize()
    return jsonify(serialized_console), 200

# Ruta para crear una nueva consola
@api.route('/consoles', methods=['POST'])
def create_console():
    request_body = request.get_json()

    if "name" not in request_body or "company" not in request_body or "year" not in request_body:
        return jsonify({"error": "Incomplete data"}), 400

    new_console = Consoles(
        name=request_body["name"],
        company=request_body["company"],
        year=request_body["year"]
    )

    db.session.add(new_console)
    db.session.commit()

    return jsonify({"msg": "New console added successfully"}), 200

# Ruta para actualizar una consola por su ID
@api.route('/consoles/<int:console_id>', methods=['PUT'])
def update_console(console_id):
    console = Consoles.query.get(console_id)

    if not console:
        return jsonify({"msg": "Console not found"}), 404

    request_body = request.get_json()

    # Actualizar los campos proporcionados en el cuerpo de la solicitud
    if "name" in request_body:
        console.name = request_body["name"]
    if "company" in request_body:
        console.company = request_body["company"]
    if "year" in request_body:
        console.year = request_body["year"]

    db.session.commit()

    return jsonify({"msg": f"Console with ID {console_id} updated successfully"}), 200

# Ruta para eliminar una consola por su ID
@api.route('/consoles/<int:console_id>', methods=['DELETE'])
def delete_console(console_id):
    console = Consoles.query.get(console_id)

    if not console:
        return jsonify({"msg": "Console not found"}), 404

    db.session.delete(console)
    db.session.commit()

    return jsonify({"msg": f"Console with ID {console_id} successfully deleted"}), 200



### GENRES METHODS ###
#GET ALL GENRES#

@api.route('/genres', methods=['GET'])
def get_all_genres():
    genres = Genres.query.all()

    if not genres:
        return jsonify({"msg": "Genres Not Found"}), 404

    serialized_genres = [genre.serialize() for genre in genres]
    return jsonify(serialized_genres), 200

#GET ONE GENRE BY ID#

@api.route('/genres/<int:genre_id>', methods=['GET'])
def get_genre_by_id(genre_id):
    genre = Genres.query.get(genre_id)

    if not genre:
        return jsonify({"msg": "Genre Not Found"}), 404

    serialized_genre = genre.serialize()
    return jsonify(serialized_genre), 200

#POST NEW GENRE#

@api.route('/genres', methods=['POST'])
def create_new_genre():
    request_body = request.get_json()

    if "type" not in request_body:
        return jsonify({"error": "Incomplete Data"}), 400

    new_genre = Genres(
        type=request_body["type"]
    )

    db.session.add(new_genre)
    db.session.commit()

    return jsonify({"msg": "New Genre Created"}), 200

#PUT ONE GENRE#

@api.route('/genres/<int:genre_id>', methods=['PUT'])

def update_genre(genre_id):
    genre = Genres.query.get(genre_id)

    if not genre:
        return jsonify({"msg": "Genre Not Found"}), 404
    
    request_body = request.get_json()

    if "type" in request_body:

        genre.type = request_body["type"]

    db.session.commit()

    return jsonify({"msg": "Genre Updated"}), 200

#DELETE ONE GENRE#

@api.route('/genresList/<int:genre_id>', methods=['DELETE'])

def delete_genre(genre_id):

    genre = Genres.query.get(genre_id)

    if not genre:
        return jsonify({"msg": "Genre not found"}), 404
    
    db.session.delete(genre)
    db.session.commit()

    return jsonify({"msg": f"Console with ID {genre_id} successfully deleted"}), 200
















