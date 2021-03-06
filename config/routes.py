import os
from app import app
from controllers import programmes, exercises, auth

app.register_blueprint(programmes.router, url_prefix='/api')
app.register_blueprint(exercises.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')


@app.route('/') # homepage
@app.route('/<path:path>') # any other path
def catch_all(path='index.html'):

    if os.path.isfile('public/' + path): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html') # otherwise send back the index.html file
