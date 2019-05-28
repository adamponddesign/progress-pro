from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields   #, post_load


# The model describes the database table
class Programme(db.Entity):
    name = Required(str)
    user = Required('User') # programe belongs to only one user
    days = Set('Day')



# The `schema` descibes the serialization/deserialization
class ProgrammeSchema(Schema):
    id = fields.Int() # dump_only means "write only"
    name = fields.Str(required=True)
    user = fields.Nested('UserSchema', exclude=('programmes',), dump_only=True)
    days = fields.Nested('DaySchema', many=True)
