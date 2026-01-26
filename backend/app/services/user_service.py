from app.extensions import db
from app.models.user_model import User


class UserService:

    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id: int):
        return User.query.get(user_id)

    @staticmethod
    def create_user(username: str) -> User:
        if User.query.filter_by(username=username).first():
            raise ValueError("Username already exists")

        user = User(username=username)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id: int) -> bool:
        user = User.query.get(user_id)
        if not user:
            return False

        db.session.delete(user)
        db.session.commit()
        return True
