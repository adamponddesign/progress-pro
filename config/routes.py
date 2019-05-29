from app import app
from controllers import users, programmes, exercises, exercise_items, auth

app.register_blueprint(users.router, url_prefix='/api')
app.register_blueprint(programmes.router, url_prefix='/api')
app.register_blueprint(exercises.router, url_prefix='/api')
app.register_blueprint(exercise_items.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
