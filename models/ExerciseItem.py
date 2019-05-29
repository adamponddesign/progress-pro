from app import db
from pony.orm import Required, Json
from marshmallow import Schema, fields

class ExerciseItem(db.Entity):
    name = Required(str)
    programme = Required('Programme')
    exercise = Required('Exercise')
    day = Required(str)
    weights = Required(Json)

class ExerciseItemSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    weight = fields.Nested('WeightSchema', many=True)


class WeightSchema(Schema):
    value = fields.Int(required=True)
    date = fields.Date(required=True)
