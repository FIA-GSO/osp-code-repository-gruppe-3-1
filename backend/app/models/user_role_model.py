from app.extensions import db

class UserRole(db.Model):
    __tablename__ = "user_role"

    user_id = db.Column(db.Integer, db.ForeignKey("usesr.id", ondelete="CASCADE"), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.id", ondelete="CASCADE"), primary_key=True)

    user = db.relationship("User", back_populates="roles")
    role = db.relationship("Role", back_populates="users")