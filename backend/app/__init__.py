from flask import Flask
from flask_restx import Api
from .config import Config
from .extensions import db, mail

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    mail.init_app(app)

    api = Api(
        app,
        title="My REST API",
        version="1.0",
        description="Example Flask REST API",
        doc="/swagger"   # Swagger UI URL
    )

    from app.routes.user_routes import api as user_ns
    api.add_namespace(user_ns, path="/api/users")
    
    from backend.app.routes.smtp.mail_routes import mail_bp
    app.register_blueprint(mail_bp, url_prefix='/mail')

    return app
