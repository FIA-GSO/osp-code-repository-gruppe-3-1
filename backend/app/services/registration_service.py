from app.extensions import db
from app.models.registration_model import Registration
from app.models.lecture_model import Lecture
from datetime import datetime
from app.models.status_model import Status


class RegistrationService:

    @staticmethod
    def get_all():
        return Registration.query.all()

    @staticmethod
    def get_by_id(registration_id: int):
        return Registration.query.get(registration_id)

    @staticmethod
    def create_registration_form(
        user_id: int,
        event_id: int,
        status_id: int,
        chairs_needed: int,
        tables_needed: int,
        remarks: str,
        with_lecture: bool,
        lecture_payload: dict | None
    ):
        registration = Registration(
            user_id=user_id,
            event_id=event_id,
            status_id=status_id,
            chairs_needed=chairs_needed,
            tables_needed=tables_needed,
            remarks=remarks,
            with_lecture=with_lecture
        )

        db.session.add(registration)
        db.session.flush()

        if with_lecture and lecture_payload:
            lecture = Lecture(
                registration_id=registration.id,
                title=lecture_payload.get("title"),
                description=lecture_payload.get("description"),
                speaker=lecture_payload.get("speaker"),
                required_tech=lecture_payload.get("required_tech"),
                preferred_time=lecture_payload.get("preferred_time")
            )
            db.session.add(lecture)

        db.session.commit()
        return registration

    @staticmethod
    def update_registration_form(
        registration_id: int,
        chairs_needed: int,
        tables_needed: int,
        remarks: str,
        with_lecture: bool,
        lecture_payload: dict | None
    ):
        reg = Registration.query.get(registration_id)
        if not reg:
            raise ValueError("Registration not found")

        reg.chairs_needed = chairs_needed
        reg.tables_needed = tables_needed
        reg.remarks = remarks
        reg.with_lecture = with_lecture

        if with_lecture:
            if reg.lecture:
                reg.lecture.title = lecture_payload.get("title")
                reg.lecture.description = lecture_payload.get("description")
                reg.lecture.speaker = lecture_payload.get("speaker")
                reg.lecture.required_tech = lecture_payload.get("required_tech")
                reg.lecture.preferred_time = lecture_payload.get("preferred_time")
            else:
                lecture = Lecture(
                    registration_id=reg.id,
                    title=lecture_payload.get("title"),
                    description=lecture_payload.get("description"),
                    speaker=lecture_payload.get("speaker"),
                    required_tech=lecture_payload.get("required_tech"),
                    preferred_time=lecture_payload.get("preferred_time")
                )
                db.session.add(lecture)

        else:
            if reg.lecture:
                db.session.delete(reg.lecture)

        reg.updated_at = datetime.utcnow()
        db.session.commit()

        return reg

    @staticmethod
    def delete_registration(registration_id: int):
        reg = Registration.query.get(registration_id)
        if not reg:
            return False

        db.session.delete(reg)
        db.session.commit()
        return True
    
    #janik -----------------------!
    @staticmethod
    def update_registration_status(registration_id: int, new_status_id: int):
        registration = Registration.query.get(registration_id)
        if not registration:
            return None, "Registration not found"

        status = Status.query.get(new_status_id)
        if not status:
            return None, "Invalid status"

        registration.status_id = new_status_id
        db.session.commit()

        return registration, None
