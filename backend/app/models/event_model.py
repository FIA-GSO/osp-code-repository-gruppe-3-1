from app.extensions import db

class Event(db.Model):
    __tablename__ = "event"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    registration_locked = db.Column(db.Boolean, nullable=False, default=False)

    registrations = db.relationship("Registration", back_populates="event", cascade="all, delete-orphan")