from pony.orm import db_session
from app import db
from models.User import User
from models.Programme import Programme
from models.Day import Day
from models.Exercise import Exercise

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

    #create exercises
    bench_press = Exercise(name="Bench Press")
    shoulder_press = Exercise(name="Shoulder Press")
    squat = Exercise(name="Squat")
    bicep_curl = Exercise(name="Bicep Curl")
    tricep_extension = Exercise(name="Tricep Extension")
    leg_press = Exercise(name="Leg Press")
    dead_lift = Exercise(name="Dead Lift")


    # create days
    monday = Day(
                name="Monday",
                exercises=[squat, bench_press]

            )
    tuesday = Day(name="Tuesday")
    wednesday = Day(name="Wednesday")
    thursday = Day(name="Thursday")
    friday = Day(name="Friday")
    saturday = Day(name="Saturday")
    sunday = Day(name="Sunday")


    # create some members
    arnie = User(name="Arnie")
    martin = User(name="Martin")
    phil = User(name="Phil")


    # create some programmes
    Programme(
        name='Summer Programme',
        user=arnie,
        days=[monday, wednesday, friday]
    )
    Programme(
        name='Winter Programme',
        user=phil,
        days=[tuesday, thursday, saturday]
    )





    # save the data to the database
    db.commit()
