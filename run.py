from flask_trainer import app
from config import *

app.config.from_object(DevelopmentConfig)

if __name__ == '__main__':
    app.run()