from werkzeug.security import check_password_hash
from flask import session
from app.models.user_model import User
from app import db

class AuthService:

    @staticmethod
    def login(email: str, password: str):
        user = User.query.filter_by(email=email).first()

        if not user:
            return None

        if not check_password_hash(user.password_hash, password):
            return None

        session["user_id"] = user.id
        session["email"] = user.email
        session["roles"] = [r.role.name for r in user.roles]
        session["company_name"] = user.company_name
        session["contact_person"] = user.contact_person

        return user

    @staticmethod
    def logout():
        session.clear()

    @staticmethod
    def get_current_user():
        uid = session.get("user_id")
        if not uid:
            return None
        return User.query.get(uid)
