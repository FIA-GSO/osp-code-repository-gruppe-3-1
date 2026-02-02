from flask import Flask
from flask_restx import Api
from .config import Config
from .extensions import db, mail

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    mail.init_app(app)

    from app.models.user_model import User
    from app.models.role_model import Role
    from app.models.user_role_model import UserRole
    from app.models.registration_model import Registration
    from app.models.event_model import Event
    from app.models.status_model import Status
    from app.models.lecture_model import Lecture

    with app.app_context():
        db.create_all()

    # Swagger
    api = Api(
        app,
        title="My REST API",
        version="1.0",
        description="Example Flask REST API",
        doc="/swagger"   
    )

    app.secret_key = "verysecretkey"
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True

    from app.routes.user_routes import api as user_ns
    api.add_namespace(user_ns, path="/api/users")
    from app.routes.auth_routes import api as auth_ns
    api.add_namespace(auth_ns, path="/api/auth")
    from app.routes.registration_routes import api as reg_ns
    api.add_namespace(reg_ns, path="/api/registration")
    
    # from backend.app.routes.smtp.mail_routes import mail_bp
    # app.register_blueprint(mail_bp, url_prefix='/mail')

    return app