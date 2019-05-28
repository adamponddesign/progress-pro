from flask import Blueprint    #, request, jsonify, abort, g
from pony.orm import db_session
# from marshmallow import ValidationError
# from app import db
from models.Programme import Programme, ProgrammeSchema
# from lib.secure_route import secure_route

router = Blueprint(__name__, 'programmes') # creates a router for this controller

@router.route('/programmes', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    schema = ProgrammeSchema(many=True)
    programmes = Programme.select() # get all the members
    return schema.dumps(programmes) # `schema.dumps` converts the list to JSON
