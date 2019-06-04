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
    tricep_pushdown = Exercise(name="Tricep Pushdown")

    #chest
    barbell_bench_press = Exercise(name="Barbell Bench Press")
    dumbbell_fly = Exercise(name="Dumbbell Fly")

    #shoulders
    dumbbell_shoulder_press = Exercise(name="Dumbbell Shoulder Press")
    lateral_dumbbell_raise = Exercise(name="Lateral Dumbbell Raise")

    #legs
    squat = Exercise(name="Squat")
    leg_press = Exercise(name="Leg Press")
    leg_extension = Exercise(name="Leg Extension")
    leg_curl = Exercise(name="Leg Curl")
    calf_raise = Exercise(name="Calf Raise")

    #back
    lat_pulldown = Exercise(name="Lat Pulldown")
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

# •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    ExerciseItem(
        exercise=dumbbell_fly,
        day='Monday',
        weights=[
        {'value':20, 'date':'2018-12-12'},
        {'value':20, 'date': '2019-01-15'},
        {'value':18, 'date': '2019-01-17'},
        {'value':18, 'date':'2019-01-25'},
        {'value':20, 'date':'2019-02-01'},
        {'value':22, 'date':'2019-02-03'},
        {'value':25, 'date':'2019-02-24'},
        {'value':27, 'date':'2019-03-02'},
        {'value':27, 'date':'2019-03-05'},
        {'value':27, 'date':'2019-04-02'},
        {'value':28, 'date':'2019-04-10'},
        {'value':28, 'date':'2019-04-13'},
        {'value':28, 'date':'2019-04-20'},
        {'value':27, 'date':'2019-04-22'},
        {'value':28, 'date':'2019-04-29'},
        {'value':30, 'date':'2019-05-01'},
        {'value':30, 'date':'2019-05-05'},
        {'value':30, 'date':'2019-05-10'},
        {'value':30, 'date':'2019-05-12'},
        {'value':30, 'date':'2019-05-14'},
        {'value':31, 'date':'2019-05-20'}
        ],
        programme=summer
    )

    ExerciseItem(
        exercise=squat,
        day='Monday',
        weights=[
        {'value':150, 'date':'2018-12-12'},
        {'value':149, 'date':'2019-01-15'},
        {'value':150, 'date':'2019-01-17'},
        {'value':152, 'date':'2019-01-23'},
        {'value':155, 'date':'2019-02-05'},
        {'value':153, 'date':'2019-02-15'},
        {'value':155, 'date': '2019-03-03'},
        {'value':155, 'date': '2019-03-09'},
        {'value':155, 'date': '2019-03-20'},
        {'value':152, 'date': '2019-04-03'},
        {'value':155, 'date': '2019-04-07'},
        {'value':155, 'date': '2019-04-12'},
        {'value':155, 'date': '2019-04-19'},
        {'value':157, 'date': '2019-04-22'},
        {'value':157, 'date': '2019-04-29'},
        {'value':157, 'date': '2019-05-03'},
        {'value':157, 'date': '2019-05-08'},
        {'value':157, 'date': '2019-05-12'},
        {'value':158, 'date': '2019-05-17'}
        ],
        programme=summer
    )

    ExerciseItem(
        exercise=barbell_bench_press,
        day='Wednesday',
        weights=[
        {'value':16, 'date':'2018-12-12'},
        {'value':16, 'date':'2019-01-15'},
        {'value':16, 'date':'2019-01-16'},
        {'value':18, 'date':'2019-01-23'},
        {'value':18, 'date':'2019-02-05'},
        {'value':18, 'date':'2019-02-10'},
        {'value':18, 'date':'2019-02-15'},
        {'value':20, 'date':'2019-03-03'},
        {'value':20, 'date':'2019-03-09'},
        {'value':20, 'date':'2019-03-20'},
        {'value':20, 'date':'2019-03-23'},
        {'value':20, 'date':'2019-04-03'},
        {'value':18, 'date':'2019-04-10'},
        {'value':20, 'date':'2019-04-13'},
        {'value':22, 'date':'2019-04-18'},
        {'value':22, 'date':'2019-04-20'},
        {'value':22, 'date':'2019-04-27'},
        {'value':22, 'date':'2019-05-03'},
        {'value':22, 'date':'2019-05-12'},
        {'value':23, 'date': '2019-05-15'}
        ],
        programme=summer
    )

    ExerciseItem(
        exercise=dumbbell_shoulder_press,
        day='Wednesday',
        weights=[
        {'value':18, 'date':'2018-12-12'},
        {'value':18, 'date':'2019-01-15'},
        {'value':18, 'date':'2019-01-23'},
        {'value':20, 'date':'2019-02-12'},
        {'value':20, 'date':'2019-02-16'},
        {'value':20, 'date': '2019-02-23'},
        {'value':21, 'date': '2019-03-04'},
        {'value':21, 'date': '2019-03-07'},
        {'value':22, 'date': '2019-03-12'},
        {'value':22, 'date': '2019-03-20'},
        {'value':22, 'date': '2019-04-04'},
        {'value':21, 'date': '2019-04-06'},
        {'value':20, 'date': '2019-04-12'},
        {'value':22, 'date': '2019-04-20'},
        {'value':22, 'date': '2019-04-23'},
        {'value':22, 'date': '2019-05-02'},
        {'value':19, 'date': '2019-05-10'},
        {'value':22, 'date': '2019-05-12'},
        {'value':22, 'date': '2019-05-14'},
        {'value':22, 'date': '2019-05-20'}
        ],
        programme=summer
    )

    ExerciseItem(
        exercise=cable_seated_row,
        day='Friday',
        weights=[
        {'value':59, 'date':'2018-12-12'},
        {'value':60, 'date':'2019-01-15'},
        {'value':60, 'date':'2019-01-16'},
        {'value':61, 'date':'2019-01-29'},
        {'value':60, 'date':'2019-02-10'},
        {'value':60, 'date':'2019-02-12'},
        {'value':60, 'date':'2019-02-17'},
        {'value':60, 'date':'2019-02-20'},
        {'value':60, 'date':'2019-02-23'},
        {'value':60, 'date':'2019-03-12'},
        {'value':60, 'date':'2019-03-15'},
        {'value':62, 'date':'2019-03-19'},
        {'value':62, 'date':'2019-03-21'},
        {'value':62, 'date':'2019-03-28'},
        {'value':62, 'date':'2019-04-12'},
        {'value':62, 'date':'2019-04-18'},
        {'value':63, 'date':'2019-04-20'},
        {'value':63, 'date':'2019-04-22'},
        {'value':63, 'date': '2019-05-02'},
        {'value':63, 'date':'2019-05-05'}
        ],
        programme=summer
    )

    ExerciseItem(
        exercise=leg_press,
        day='Friday',
        weights=[
        {'value':120, 'date':'2018-12-12'},
        {'value':120, 'date': '2019-01-15'},
        {'value':120, 'date':'2019-01-29'},
        {'value':120, 'date':'2019-02-01'},
        {'value':120, 'date':'2019-02-09'},
        {'value':121, 'date':'2019-03-01'},
        {'value':122, 'date':'2019-03-03'},
        {'value':121, 'date':'2019-03-08'},
        {'value':120, 'date':'2019-03-20'},
        {'value':120, 'date':'2019-04-04'},
        {'value':120, 'date':'2019-04-09'},
        {'value':120, 'date':'2019-04-15'},
        {'value':121, 'date':'2019-04-20'},
        {'value':122, 'date':'2019-04-23'},
        {'value':123, 'date':'2019-04-28'},
        {'value':120, 'date':'2019-05-04'},
        {'value':122, 'date':'2019-05-08'},
        {'value':123, 'date':'2019-05-12'},
        {'value':124, 'date':'2019-05-20'},
        {'value':125, 'date':'2019-06-04'},
        {'value':124, 'date':'2019-06-07'}
        ],
        programme=summer
    )

# •••••••••••••••••••••••••••••••••••••••••••••••••••••••

    ExerciseItem(
        exercise=squat,
        day='Tuesday',
        weights=[{'value':100, 'date':'2018-12-12'}, {'value':120, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=dumbbell_fly,
        day='Tuesday',
        weights=[{'value':20, 'date':'2018-12-12'}, {'value':20, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=dumbbell_shoulder_press,
        day='Thursday',
        weights=[{'value':12, 'date':'2018-12-12'}, {'value':14, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=cable_seated_row,
        day='Thursday',
        weights=[{'value':80, 'date':'2018-12-12'}, {'value':82, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=lat_pulldown,
        day='Sunday',
        weights=[{'value':40, 'date':'2018-12-12'}, {'value':42, 'date': '2019-01-15'}],
        programme=winter
    )

    ExerciseItem(
        exercise=leg_extension,
        day='Sunday',
        weights=[{'value':30, 'date':'2018-12-12'}, {'value':35, 'date': '2019-01-15'}],
        programme=winter
    )

    db.commit()
