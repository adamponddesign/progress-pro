from app import app
from controllers import programmes, exercises, auth

app.register_blueprint(programmes.router, url_prefix='/api')
app.register_blueprint(exercises.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
