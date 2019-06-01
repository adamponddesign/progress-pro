# from datetime import date
from pony.orm import db_session
from app import db
from models.User import User, UserSchema
from models.Programme import Programme
from models.Exercise import Exercise
from models.ExerciseItem import ExerciseItem

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    adam_p = User(
        name='adampond',
        email='adam.pond@hotmail.co.uk',
        password_hash=schema.generate_hash('pass')
    )




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
    poser_pete = User(
        name="Poser Pete",
        email="pete@hotmail.com",
        password_hash=schema.generate_hash('pass')
        )
    # insta_stacey = User(name="Insta Stacey")
    # big_stan = User(name="Big Stan")
    # big_tony = User(name="Big Tony")
    # weedy_will = User(name="Weedy Will")
    # ronnie_on_roids = User(name="Ronnie On Roids")

# seed programmes •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    summer = Programme(
        name='Summer Programme',
        user=adam_p
    )
    winter = Programme(
        name='Winter Programme',
        user=adam_p
    )

    ExerciseItem(
        exercise=dumbbell_fly,
        day='Monday',
        weights=[{'value':40, 'date':'2018-12-12'}, {'value':45, 'date': '2019-01-15'}],
        programme=summer
    )

    ExerciseItem(
        exercise=squat,
        day='Monday',
        weights=[{'value':100, 'date':'2018-12-12'}, {'value':110, 'date': '2019-01-15'}],
        programme=summer
    )

    ExerciseItem(
        exercise=barbell_bench_press,
        day='Wednesday',
        weights=[{'value':10, 'date':'2018-12-12'}, {'value':12, 'date': '2019-01-15'}],
        programme=summer
    )

    ExerciseItem(
        exercise=cable_seated_row,
        day='Friday',
        weights=[{'value':80, 'date':'2018-12-12'}, {'value':85, 'date': '2019-01-15'}],
        programme=summer
    )



    ExerciseItem(
        exercise=squat,
        day='Tuesday',
        weights=[{'value':80, 'date':'2018-12-12'}, {'value':85, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=dumbbell_shoulder_press,
        day='Thursday',
        weights=[{'value':12, 'date':'2018-12-12'}, {'value':14, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=wide_grip_lat_pulldown,
        day='Sunday',
        weights=[{'value':40, 'date':'2018-12-12'}, {'value':40, 'date': '2019-01-15'}],
        programme=winter
    )




    db.commit()
