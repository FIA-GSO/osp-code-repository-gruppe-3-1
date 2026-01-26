# app/services/user_service.py
from app.extensions import db
from app.models.user_model import User
from werkzeug.security import generate_password_hash

class UserService:

    @staticmethod
    def get_all_users():
        """Return all users"""
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id: int):
        """Get a single user by ID"""
        return User.query.get(user_id)

    @staticmethod
    def create_user(email: str, password: str, company_name=None, contact_person=None) -> User:
        """Create a new user with hashed password"""
        if User.query.filter_by(email=email).first():
            raise ValueError("Email already exists")

        password_hash = generate_password_hash(password)
        user = User(
            email=email,
            password_hash=password_hash,
            company_name=company_name,
            contact_person=contact_person
        )
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def update_user(user_id: int, **kwargs) -> User:
        """Update user fields (email, company_name, contact_person, active)"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")

        # Only allow certain fields to be updated
        allowed_fields = ["email", "company_name", "contact_person", "active"]
        for field in allowed_fields:
            if field in kwargs:
                setattr(user, field, kwargs[field])

        # Optional: update password if provided
        if "password" in kwargs and kwargs["password"]:
            user.password_hash = generate_password_hash(kwargs["password"])

        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id: int) -> bool:
        """Delete a user permanently"""
        user = User.query.get(user_id)
        if not user:
            return False
        db.session.delete(user)
        db.session.commit()
        return True

    @staticmethod
    def deactivate_user(user_id: int) -> User:
        """Soft delete: set active=False"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")
        user.active = False
        db.session.commit()
        return user
