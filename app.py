from flask import Flask, render_template
from config import *

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

@app.route('/')
def hello_world():
    return "hello from flask"

@app.route('/test-view')
def test_view():
    return render_template('test.html')

if __name__ == '__main__':
    app.run()