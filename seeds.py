from pony.orm import db_session
from app import db
from models.User import User
from models.Programme import Programme

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():



    # create some members
    arnie = User(name="Arnie")
    martin = User(name="Martin")
    phil = User(name="Phil")


    # create some programmes
    Programme(
        name='Summer Programme',
        user=arnie
    )
    Programme(
        name='Winter Programme',
        user=phil
    )





    # save the data to the database
    db.commit()
