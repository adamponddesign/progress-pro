from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields

class Programme(db.Entity):
    name = Required(str)
    user = Required('User')
    exercise_items = Set('ExerciseItem')

class ProgrammeSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    user = fields.Nested('UserSchema', exclude=('programmes',), dump_only=True)
    exercise_items = fields.Nested('ExerciseItemSchema', many=True)
