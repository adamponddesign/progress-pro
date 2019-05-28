from flask import Blueprint    #, request, jsonify, abort, g
from pony.orm import db_session
# from marshmallow import ValidationError
# from app import db
from models.User import User, UserSchema
# from lib.secure_route import secure_route

router = Blueprint(__name__, 'users') # creates a router for this controller

@router.route('/users', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    schema = UserSchema(many=True)
    users = User.select() #
    return schema.dumps(users) #


@router.route('/users/<int:user_id>', methods=['GET'])
@db_session
def show(user_id):
    # This will serialize our data
    schema = UserSchema()
    # This gets a user by ID
    user = User.get(id=user_id)

    # If we can't find a user, send a 404 response
    if not user:
        abort(404)

    # otherwise, send back the user data as JSON
    return schema.dumps(user)
