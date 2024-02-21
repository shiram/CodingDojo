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

@product_blueprint.context_processor
def fullname_processor():
    def get_fullname(product):
        return f'{product["category"]} / {product["name"]}'
    return dict(get_fullname=get_fullname)