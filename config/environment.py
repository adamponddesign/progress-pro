import os

secret = os.getenv('SECRET', 'well secure')

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/progress-pro')
