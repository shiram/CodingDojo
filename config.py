"""
An Example of using configuration classes in flask
"""

class BaseConfig(object):
    'Base config class'
    SECRET_KEY = 'Some random key'
    DEBUG = True
    TESTING = False

class DevelopmentConfig(BaseConfig):
    'Development environmenr specific config'
    DEBUG = True
    TESTING = True
    SECRET_KEY = 'A dev secret key'

class ProductionConfig(BaseConfig):
    'Production specific config'
    DEBUG = False
    #SECRET_KEY = open('/path/to/secret/file').read()

class StagingConfig(BaseConfig):
    'Staging specific config'
    DEBUG = True

