# app/services/user_service.py
from app.extensions import db
from app.models.user_model import User
from app.models.user_role_model import UserRole
from app.models.role_model import Role
from werkzeug.security import generate_password_hash


class UserService:

    @staticmethod
    def get_all_users():
        """Return all users"""
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id: int):
        """Get user by ID"""
        return User.query.get(user_id)

    @staticmethod
    def create_user(email: str, password: str, company_name=None, contact_person=None, roles=None) -> User:
        """Create a new user and assign roles"""
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
        db.session.flush()

        if roles and len(roles) > 0:
            for role_name in roles:
                role = Role.query.filter_by(name=role_name).first()
                if role:
                    user.roles.append(UserRole(role=role))
        else:
            default_role = Role.query.filter_by(name="User").first()
            if not default_role:
                raise ValueError("Default role 'User' not found in database")
            user.roles.append(UserRole(role=default_role))

        db.session.commit()
        return user

    @staticmethod
    def update_user(user_id: int, **kwargs) -> User:
        """Update user fields including roles"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")

        allowed_fields = ["email", "company_name", "contact_person", "active", "password"]
        for field in allowed_fields:
            if field in kwargs and kwargs[field] is not None:
                if field == "password":
                    user.password_hash = generate_password_hash(kwargs[field])
                else:
                    setattr(user, field, kwargs[field])

        if "roles" in kwargs and kwargs["roles"] is not None:
            user.roles.clear()
            db.session.flush()  
            for role_name in kwargs["roles"]:
                role = Role.query.filter_by(name=role_name).first()
                if role:
                    user_role = UserRole(user_id=user.id, role_id=role.id)
                    user.roles.append(user_role)

        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id: int) -> bool:
        """Hard delete user"""
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
