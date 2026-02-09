from app.extensions import db
from app.models.event_model import Event

class EventService:

    @staticmethod
    def get_all():
        return Event.query.all()

    @staticmethod
    def get_by_id(event_id):
        return Event.query.get(event_id)

    @staticmethod
    def create(name, event_date, registration_locked=False):
        event = Event(
            name=name,
            event_date=event_date,
            registration_locked=registration_locked
        )
        db.session.add(event)
        db.session.commit()
        return event

    @staticmethod
    def update(event_id, name=None, event_date=None, registration_locked=None):
        event = Event.query.get(event_id)
        if not event:
            return None

        if name is not None:
            event.name = name
        if event_date is not None:
            event.event_date = event_date
        if registration_locked is not None:
            event.registration_locked = registration_locked

        db.session.commit()
        return event

    @staticmethod
    def delete(event_id):
        event = Event.query.get(event_id)
        if not event:
            return False

        db.session.delete(event)
        db.session.commit()
        return True
