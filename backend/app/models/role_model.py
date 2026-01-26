from app.extensions import db

class Role(db.Model):
    __tablename__ = "role"


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    users = db.relationship("UserRole", back_populates="role", cascade="all, delete-orphan")