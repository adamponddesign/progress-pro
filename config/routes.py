from app import app
from controllers import users, programmes, days

app.register_blueprint(users.router, url_prefix='/api')
app.register_blueprint(programmes.router, url_prefix='/api')
app.register_blueprint(days.router, url_prefix='/api')
