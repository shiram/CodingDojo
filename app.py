from flask import Flask

app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')

@app.route('/')
def hello_world():
    return "hello from flask"

if __name__ == '__main__':
    app.run()