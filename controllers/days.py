from flask import Blueprint    #, request, jsonify, abort, g
from pony.orm import db_session
# from marshmallow import ValidationError
# from app import db
from models.Day import Day, DaySchema
# from lib.secure_route import secure_route

router = Blueprint(__name__, 'days') # creates a router for this controller

@router.route('/days', methods=['GET'])
@db_session # Allows access to the database in the `index` function
def index():
    schema = DaySchema(many=True)
    days = Day.select() # get all the days
    return schema.dumps(days) # `schema.dumps` converts the list to JSON
