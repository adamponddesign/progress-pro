# from datetime import date
from pony.orm import db_session
from app import db
from models.User import User
from models.Programme import Programme
from models.Exercise import Exercise
from models.ExerciseItem import ExerciseItem

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

#seed exercises•••••••••••••••••••••••••••••••••••••••••••••••••••••••
    #arms
    bicep_curl = Exercise(name="Bicep Curl")
    tricep_extension = Exercise(name="Tricep Extension")

    #chest
    barbell_bench_press = Exercise(name="Barbell Bench Press")
    dumbbell_fly = Exercise(name="Dumbbell Fly")

    #shoulders
    dumbbell_shoulder_press = Exercise(name="Dumbbell Shoulder Press")

    #legs
    squat = Exercise(name="Squat")
    leg_press = Exercise(name="Leg Press")
    leg_extension = Exercise(name="Leg Extension")

    #back
    wide_grip_lat_pulldown = Exercise(name="Wide Grip Lat Pulldown")
    cable_seated_row = Exercise(name="Cable Seated Row")

    #full body
    dead_lift = Exercise(name="Dead Lift")

# seed members ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    poser_pete = User(name="Poser Pete")
    insta_stacey = User(name="Insta Stacey")
    big_stan = User(name="Big Stan")
    big_tony = User(name="Big Tony")
    weedy_will = User(name="Weedy Will")
    ronnie_on_roids = User(name="Ronnie On Roids")

# seed programmes •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    summer = Programme(
        name='Summer Programme',
        user=poser_pete
    )
    winter = Programme(
        name='Winter Programme',
        user=insta_stacey
    )

    ExerciseItem(
        exercise=squat,
        day='Monday',
        weights=[{'value':100, 'date':'2018-12-12'},{'value':110, 'date': '2019-01-15'}],
        programme=summer
    )

    ExerciseItem(
        exercise=squat,
        day='Monday',
        weights=[{'value':80, 'date':'2018-12-12'},{'value':85, 'date': '2019-01-15'}],
        programme=winter
    )




    db.commit()
