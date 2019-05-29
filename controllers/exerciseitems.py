from flask import Blueprint
from pony.orm import db_session
from models.ExerciseItem import ExerciseItem, ExerciseItemSchema


router = Blueprint(__name__, 'exerciseitems')

@router.route('/exerciseitems', methods=['GET'])
@db_session
def index():
    schema = ExerciseItemSchema(many=True)
    exerciseitems = ExerciseItem.select()
    return schema.dumps(exerciseitems)
