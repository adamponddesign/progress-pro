from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields

class Exercise(db.Entity):
    name = Required(str)
    exercise_items = Set('ExerciseItem')

class ExerciseSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    exercise_items = fields.Nested('ExerciseItemSchema', many=True, dump_only=True)
