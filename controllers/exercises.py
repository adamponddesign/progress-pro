from flask import Blueprint
from pony.orm import db_session
from models.Exercise import Exercise, ExerciseSchema

router = Blueprint(__name__, 'exercises')

@router.route('/exercises', methods=['GET'])
@db_session
def index():
    schema = ExerciseSchema(many=True)
    exercises = Exercise.select()
    return schema.dumps(exercises)
