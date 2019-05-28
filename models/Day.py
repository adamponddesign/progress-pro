from app import db
from pony.orm import Required, Optional   #, Set
from marshmallow import Schema, fields   #, post_load


# The model describes the database table
class Day(db.Entity):
    name = Required(str)
    programme = Optional('Programme')




# The `schema` descibes the serialization/deserialization
class DaySchema(Schema):
    id = fields.Int() # dump_only means "write only"
    name = fields.Str(required=True)
    programme = fields.Nested('ProgrammeSchema', exclude=('days',), dump_only=True)
