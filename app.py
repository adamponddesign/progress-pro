from flask import Flask
from pony.orm import Database
from pony.orm import db_session

app = Flask(__name__)
db = Database()
db.bind('postgres', 'postgres://localhost:5432/progress-pro')

# pylint: disable=W0611,C0413
from models.Member import Member, MemberSchema

db.generate_mapping(create_tables=True)

member_schema = MemberSchema(many=True)

@app.route('/members')
@db_session
def index():
    members = Member.select()
    return member_schema.dumps(members), 200
