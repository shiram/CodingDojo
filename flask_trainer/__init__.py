from flask import Flask 
from flask_trainer.product.views import product_blueprint

app = Flask(__name__)
app.register_blueprint(product_blueprint)