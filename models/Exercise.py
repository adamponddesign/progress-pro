from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields

class Exercise(db.Entity):
    name = Required(str)
    days = Set('Day')

class ExerciseSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    days = fields.Nested('DaySchema', many=True, exclude=('exercises', ))
