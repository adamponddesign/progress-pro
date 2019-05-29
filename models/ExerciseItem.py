from app import db
from pony.orm import Required, Optional, Json
from marshmallow import Schema, fields, post_load
from .Exercise import Exercise

class ExerciseItem(db.Entity):
    programme = Required('Programme')
    exercise = Required('Exercise')
    day = Required(str)
    weights = Optional(Json)

class ExerciseItemSchema(Schema):
    id = fields.Int()
    day = fields.Str()
    weights = fields.Nested('WeightSchema', many=True)
    exercise = fields.Nested('ExerciseSchema', dump_only=True)
    exercise_id = fields.Int(load_only=True)

    @post_load
    def load_exercise(self, data):
        data['exercise'] = Exercise.get(id=data['exercise_id'])

        del data['exercise_id']
        return data


class WeightSchema(Schema):
    value = fields.Int(required=True)
    date = fields.Str(required=True)
