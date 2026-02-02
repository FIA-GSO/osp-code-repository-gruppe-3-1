from app.extensions import db
from datetime import datetime


class Lecture(db.Model):
    __tablename__ = "lecture"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    registration_id = db.Column(
        db.Integer,
        db.ForeignKey("registration.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    speaker = db.Column(db.String(255), nullable=False)
    required_tech = db.Column(db.Text, nullable=True)
    preferred_time = db.Column(db.String(100), nullable=True)

    registration = db.relationship(
        "Registration",
        back_populates="lecture",
        uselist=False
    )
