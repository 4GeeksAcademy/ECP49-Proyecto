from api.models import db, User, Videogame, Consoles, Genres, Administrador, Genre_fav, Consoles_fav
from flask import request, jsonify, url_for, Blueprint, abort, redirect, Response
from api.utils import generate_sitemap, APIException
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#########   Auth    ############
@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({"msg": "User account already exists"})
    newUser = User(email = email, password = password)
    db.session.add(newUser)
    db.session.commit()
    return jsonify("Added User"), 200

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg" : "Bad username or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "Please login"})
    else:
        return jsonify({"user_id": user.id, "email":user.email}), 200



#######get all videogames   ############
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
# @api.route("/videogames/<int:id>", methods=["PUT" ])
# def update_videogame(id):
#     videogame = Videogame.query.get(id)

#     if not videogame:
#         abort(404)

#     if request.method == "PUT":
#         data = request.get_json()

#         if not data.get("id"):
#             abort(400, description="Id field is mandatory.")
    
#         videogame.name = data.get("name", videogame.name)
#         videogame.pegi = int(data.get("pegi", videogame.pegi))
#         videogame.year = int(data.get("year", videogame.year))

#         db.session.commit()

#         return redirect("/videogame/{}".format(videogame.id))

#delete videogame
@api.route("/videogames/<int:videogame_id>", methods=["DELETE" ])
def delete_videogame(videogame_id):
    videogame = Videogame.query.get(videogame_id)

    if not videogame:
        return jsonify({"msg": "Videogame Not Found"}), 404

    db.session.delete(videogame)
    db.session.commit()

    response = Response()
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 204
    response.headers['Access-Control-Allow-Methods'] = 'DELETE'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, HEAD, DELETE'

    return response

# Ruta para obtener un videojuego por su ID
@api.route('/videogames/<int:videogame_id>', methods=['GET'])
def get_videogame_by_id(videogame_id):
    videogame = Videogame.query.get(videogame_id)

    if not videogame:
        return jsonify({"msg": "Videogame not found"}), 404

    serialized_videogame = videogame.serialize()
    return jsonify(serialized_videogame), 200

# Ruta para actualizar un videojuego por su ID
@api.route('/videogames/<int:videogame_id>', methods=['PUT'])
def update_videogame(videogame_id):
    videogame = Videogame.query.get(videogame_id)

    if not videogame:
        return jsonify({"msg": "Videogame not found"}), 404

    request_body = request.get_json()

    # Actualizar los campos proporcionados en el cuerpo de la solicitud
    if "name" in request_body:
        videogame.name = request_body["name"]
    if "pegi" in request_body:
        videogame.pegi = request_body["pegi"]
    if "year" in request_body:
        videogame.year = request_body["year"]

    db.session.commit()

    return jsonify({"msg": f"Videogame with ID {videogame_id} updated successfully"}), 200


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

# Ruta para obtener las consolas favoritas de un usuario
@api.route('/consoles_fav', methods=['GET'])
@jwt_required()
def get_console_fav():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    consoles_fav = user.consoles_fav
    serialized_consoles_fav = [console_fav.console.serialize() for console_fav in consoles_fav]
    return jsonify(serialized_consoles_fav), 200

# Ruta para agregar o quitar una consola de las favoritas de un usuario
@api.route('/consoles_fav', methods=['POST'])
@jwt_required()
def toggle_console_fav():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    request_body = request.get_json()

    if "console_id" not in request_body:
        return jsonify({"error": "Incomplete data"}), 400

    console_id = request_body["console_id"]
    console = Consoles.query.get(console_id)

    if not console:
        return jsonify({"msg": "Console not found"}), 404

    # Verificar si ya existe la relación
    existing_fav = Consoles_fav.query.filter_by(user_id=current_user_id, console_id=console_id).first()

    if existing_fav:
        # Si ya es favorita, quitarla
        db.session.delete(existing_fav)
        db.session.commit()
        return jsonify({"msg": "Console removed from favorites successfully"}), 200
    else:
        # Si no es favorita, agregarla
        new_console_fav = Consoles_fav(user_id=current_user_id, console_id=console_id)
        db.session.add(new_console_fav)
        db.session.commit()
        return jsonify({"msg": "Console added to favorites successfully"}), 200    



###################### START GENRES #######################

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

##### POST FAVORITES GENRES ####

@api.route('/genre_fav', methods=['POST'])
def add_new_genre_fav():
    request_body_fav_genre = request.get_json()

    if (
        "genres_id" not in request_body_fav_genre
        or "user_id" not in request_body_fav_genre
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    
    new_fav_genre = Genre_fav(
        genres_id=request_body_fav_genre["genres_id"],
        user_id=request_body_fav_genre["user_id"]
    )
    
    db.session.add(new_fav_genre)
    db.session.commit()

    response_body = {
        "msg": "Nuevo genero favorito añadido exitosamente"
    }

    return jsonify(response_body), 200

##### GET FAVORITES GENRES ####

@api.route('/genre_fav', methods=['GET'])
def get_all_favorites_genres():
    all_favorites_genres = Genre_fav.query.all()
    results = [fav.serialize() for fav in all_favorites_genres]
    return jsonify(results), 200

@api.route('/user/<int:user_id>/genre_fav', methods=['GET'])
def get_user_favorites_genres(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user_favorites_genres = user.genres_fav
    results = [fav.serialize() for fav in user_favorites_genres]
    return jsonify(results), 200

###################### END GENRES #######################
######## LOGIN ADMINISTRADOR ########
@api.route("/loginadministrador", methods=["POST"])
def loginadministrador():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user2 = Administrador.query.filter_by(email=email).first()

    if user2 is None:
        return jsonify({"msg" : "Incorrect email "}), 401
    if user2.password != password:
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

