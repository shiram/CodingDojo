from werkzeug.exceptions import abort
from flask import Blueprint, render_template
from flask import Blueprint
from flask_trainer.product.models import PRODUCTS

product_blueprint = Blueprint('product', __name__, url_prefix='/product')

@product_blueprint.route('/')
@product_blueprint.route('/home')
def index():
    return render_template('home.html', products=PRODUCTS)

@product_blueprint.route('/<string:product_name>/')
def product_detail(product_name):
    product = PRODUCTS.get(product_name)
    if not product:
        abort(404)
    return render_template('product.html', product=product)