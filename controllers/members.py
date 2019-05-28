from flask import Blueprint    #, request, jsonify, abort, g
from pony.orm import db_session
# from marshmallow import ValidationError
# from app import db
from models.Member import Member, MemberSchema
# from lib.secure_route import secure_route

router = Blueprint(__name__, 'members') # creates a router for this controller

@router.route('/members', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    # This will serialize our data
    # `many=True` because there are many sandwiches, ie we expect a list
    schema = MemberSchema(many=True)
    members = Member.select() # get all the sandwiches
    return schema.dumps(members) # `schema.dumps` converts the list to JSON
