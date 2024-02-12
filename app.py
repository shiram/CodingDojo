from flask import Flask
from config import *

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

@app.route('/')
def hello_world():
    return "hello from flask"

if __name__ == '__main__':
    app.run()