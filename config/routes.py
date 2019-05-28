from app import app
from controllers import members

app.register_blueprint(members.router, url_prefix='/api')
