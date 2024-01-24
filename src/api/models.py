from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
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
    
class Genres(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(180), unique=False, nullable=False)
   
    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
        }
    
