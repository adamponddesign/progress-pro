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
    schema = ProgrammeSchema()      #get/set schema from ProgrammeSchema
    programme = Programme.get(id=programme_id)  # get/set programme

    if not programme:
        abort(404)

    try:
        data = schema.load(request.get_json())      #load the updated info onto data
        programme.set(**data)       # add all the data to the programme
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




# use ? in url to filter items in the db  ••••••••••••••••••••••••••••••••••••••••••

@router.route('/programmes/<int:programme_id>/exercise-items', methods=['GET'])
@db_session
@secure_route
def show_exercise_items(programme_id):


    schema = ExerciseItemSchema(many=True)
    day = request.args.get('day')       #set day variable to hold the day from the request query string
    programme = Programme.get(id=programme_id)  #set programme variale to hold programme_id
    exercise_items = ExerciseItem.select(lambda item: item.day == day and item.programme == programme)
    # set exercise_items to be all the exercise items for the current day, from the current programme

    return schema.dumps(exercise_items)










@router.route('/programmes/<int:programme_id>/exercise-items', methods=['POST'])
@db_session
@secure_route
def create_exercise_item(programme_id):
    schema = ProgrammeSchema()
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

    return schema.dumps(programme)



@router.route('/programmes/<int:programme_id>/exercise-items/<int:item_id>', methods=['DELETE'])
@db_session
@secure_route
def delete_exercise_item(programme_id, item_id):
    schema = ProgrammeSchema()
    programme = Programme.get(id=programme_id)      #get/set programme id
    exercise_item = ExerciseItem.get(id=item_id)    #get/set specific entry id

    if not exercise_item:
        abort(404)

    exercise_item.delete()      #delete the specific entry
    db.commit()

    return schema.dumps(programme)
    # return the whole programme data to the user, now with the item deleted



@router.route('/programmes/<int:programme_id>/exercise-items/<int:item_id>', methods=['PUT'])
@db_session
@secure_route
def update_exercise_item(programme_id, item_id):
    schema = ProgrammeSchema()      # get/set the schema
    exercise_item_schema = ExerciseItemSchema()
    programme = Programme.get(id=programme_id)      #get/set programme id
    exercise_item = ExerciseItem.get(id=item_id)    #get/set specific entry id

    if not exercise_item:
        abort(404)

    try:
        data = exercise_item_schema.load(request.get_json())  #load the updated info onto data
        exercise_item.set(**data)       # add all the data to the programme


        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(programme)
    # return the whole programme data to the user, now with the item updated
