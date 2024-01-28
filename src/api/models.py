from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    genres_fav = db.relationship('Genre_fav', backref='user', lazy=True)
    consoles_fav = db.relationship('Consoles_fav', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "genres_fav": [fav.serialize() for fav in self.genres_fav],
            "consoles_fav": [console_fav.console.serialize() for console_fav in self.consoles_fav],
            # do not serialize the password, its a security breach
        }
class Administrador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Administrador {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Videogame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180), unique=False, nullable=False)
    pegi = db.Column(db.Integer)
    year = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "pegi": self.pegi,
            "year": self.year
        }
    # def to_json(self):
    #     return self.serialize()
# def __repr__(self):
#         return '<Videogame %r>' % self.id
    



###################### START CONSOLES #######################    
    


class Consoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180), unique=False, nullable=False)
    company = db.Column(db.String(180), unique=False, nullable=False)
    year = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "company": self.company,
            "year": self.year
        }

class Consoles_fav(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    console_id = db.Column(db.Integer, db.ForeignKey('consoles.id'), nullable=False)

    console = db.relationship('Consoles', backref=db.backref('users_fav'))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "console_id": self.console_id
        }
    

    
###################### START GENRES #######################
       
class Genres(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(180), unique=False, nullable=False)
    genres_fav = db.relationship('Genre_fav', backref='genres', lazy=True)

    def __repr__(self):
        return '<Genres %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
        }
    
class Genre_fav(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    genres_id = db.Column(db.Integer, db.ForeignKey('genres.id'),
        nullable=False)
      
    def __repr__(self):
        return '<Genre_fav %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "genres_id": self.genres_id,
            # do not serialize the password, its a security breach
        }
    
###################### END GENRES #######################
    

