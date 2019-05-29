from flask import Blueprint, request, jsonify, abort, g
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Programme import Programme, ProgrammeSchema
from models.Exercise import Exercise
from models.ExerciseItem import ExerciseItem, ExerciseItemSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'programmes') # creates a router for this controller

@router.route('/programmes', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    schema = ProgrammeSchema(many=True)
    programmes = Programme.select() # get all the programmes
    return schema.dumps(programmes) # `schema.dumps` converts the list to JSON


@router.route('/programmes', methods=['POST'])
@db_session
@secure_route
def create():
    # This will deserialize the JSON from insomnia
    schema = ProgrammeSchema()

    try:
        # attempt to convert the JSON into a dict
        data = schema.load(request.get_json())
        # Use that to create a programme object
        programme = Programme(name=data['name'], user=g.current_user)
        db.commit()

    except ValidationError as err:
        # if the validation fails, send back a 422 response
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    # otherwise, send back the programme data as JSON
    return schema.dumps(programme), 201


@router.route('/programmes/<int:programme_id>', methods=['GET'])
@db_session
def show(programme_id):
    # This will serialize our data
    schema = ProgrammeSchema()
    # This gets a programme by ID
    programme = Programme.get(id=programme_id)

    # If we can't find a programme, send a 404 response
    if not programme:
        abort(404)

    # otherwise, send back the programme data as JSON
    return schema.dumps(programme)


@router.route('/programmes/<int:programme_id>', methods=['PUT'])
@db_session
@secure_route
def update(programme_id):
    schema = ProgrammeSchema()
    programme = Programme.get(id=programme_id)

    if not programme:
        abort(404)

    try:
        data = schema.load(request.get_json())
        programme.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(programme)


@router.route('/programmes/<int:programme_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(programme_id):
    programme = Programme.get(id=programme_id)

    if not programme:
        abort(404)

    programme.delete()
    db.commit()

    return '', 204

@router.route('/programmes/<int:programme_id>/exercise-items', methods=['POST'])
@db_session
@secure_route
def create_exercise_item(programme_id):
    programme_schema = ProgrammeSchema()
    exercise_item_schema = ExerciseItemSchema()
    programme = Programme.get(id=programme_id)

    if not programme:
        abort(404)

    try:
        data = exercise_item_schema.load(request.get_json())
        ExerciseItem(**data, programme=programme)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return programme_schema.dumps(programme)


@router.route('/programmes/<int:programme_id>/exercise-items/<int:item_id>', methods=['DELETE'])
@db_session
@secure_route
