from app.extensions import db
from app.models.event_model import Event
from app.models.registration_model import Registration
import math

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

    @staticmethod
    def get_event_summary(event_id: int):
        event = Event.query.get(event_id)
        if not event:
            return None, "Event not found"

        registrations = Registration.query.filter_by(event_id=event_id, status_id=2).all()

        total_chairs = sum(r.chairs_needed or 0 for r in registrations)
        total_tables = sum(r.tables_needed or 0 for r in registrations)

        combined_required_tech = ", ".join(
            r.lecture.required_tech for r in registrations if r.with_lecture and r.lecture and r.lecture.required_tech
        )

        halls_needed = math.ceil(total_tables / 30) if total_tables > 0 else 0

        return {
            "event_id": event_id,
            "event_name": event.name,
            "total_chairs": total_chairs,
            "total_tables": total_tables,
            "combined_required_tech": combined_required_tech,
            "halls_needed": halls_needed
        }, 


    @staticmethod
    def get_all_event_summaries():
        """Return a list of summaries for all events"""
        events = db.session.query(Event).all()
        summaries = [EventService.get_event_summary(e.id) for e in events]
        return summaries