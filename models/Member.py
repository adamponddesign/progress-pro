from pony.orm import Required
from marshmallow import Schema, fields
from app import db


class Member(db.Entity):
    name = Required(str)
    # programmes = Set('Programme')


class MemberSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)
