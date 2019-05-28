from flask import Blueprint    #, request, jsonify, abort, g
from pony.orm import db_session
# from marshmallow import ValidationError
# from app import db
from models.Exercise import Exercise, ExerciseSchema
# from lib.secure_route import secure_route

router = Blueprint(__name__, 'exercises') # creates a router for this controller

@router.route('/exercises', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    schema = ExerciseSchema(many=True)
    exercises = Exercise.select() # get all the exercises
    return schema.dumps(exercises) # `schema.dumps` converts the list to JSON
