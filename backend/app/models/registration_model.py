from app.extensions import db
from datetime import datetime
from sqlalchemy import Enum

class Registration(db.Model):
    __tablename__ = "registration"


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id", ondelete="CASCADE"), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("status.id"), nullable=False)


    type = db.Column(Enum("stand", "lecture", name="registration_type"), nullable=False)
    remarks = db.Column(db.Text, nullable=True)
    tables_needed = db.Column(db.Integer, nullable=True)
    chairs_needed = db.Column(db.Integer, nullable=True)


    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    # Beziehungen
    user = db.relationship("User", back_populates="registrations")
    event = db.relationship("Event", back_populates="registrations")
    status = db.relationship("Status", back_populates="registrations")