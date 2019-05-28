from pony.orm import db_session
from app import db
from models.Member import Member

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

    # create some cars
    Member(name="Arnie")
    Member(name="Martin")
    Member(name="Phil")

    # save the data to the database
    db.commit()
