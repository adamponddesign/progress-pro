from pony.orm import Required, Set
from marshmallow import Schema, fields
from app import db

class User(db.Entity):
    name = Required(str)
    programmes = Set('Programme')

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)
    programmes = fields.Nested('ProgrammeSchema', many=True)
