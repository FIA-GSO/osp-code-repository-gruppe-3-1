from flask_restx import Namespace, Resource, fields
from flask import request
from app.services.event_service import EventService

api = Namespace("events", description="Event operations")

event_model = api.model("Event", {
    "id": fields.Integer,
    "name": fields.String,
    "event_date": fields.Date,
    "registration_locked": fields.Boolean,
})

event_create_model = api.model("EventCreate", {
    "name": fields.String(required=True),
    "event_date": fields.String(required=True, description="YYYY-MM-DD"),
    "registration_locked": fields.Boolean(default=False),
})


@api.route("/")
class EventList(Resource):
    @api.marshal_list_with(event_model)
    def get(self):
        """Get all events"""
        return EventService.get_all()

    @api.expect(event_create_model)
    @api.marshal_with(event_model, code=201)
    def post(self):
        """Create a new event"""
        data = request.get_json()

        event = EventService.create(
            name=data["name"],
            event_date=data["event_date"],
            registration_locked=data.get("registration_locked", False)
        )

        return event, 201


@api.route("/<int:event_id>")
class EventDetail(Resource):
    @api.marshal_with(event_model)
    def get(self, event_id):
        """Get event by ID"""
        event = EventService.get_by_id(event_id)
        if not event:
            api.abort(404, "Event not found")
        return event

    @api.expect(event_create_model)
    @api.marshal_with(event_model)
    def put(self, event_id):
        """Update an event"""
        data = request.get_json()

        event = EventService.update(
            event_id,
            name=data.get("name"),
            event_date=data.get("event_date"),
            registration_locked=data.get("registration_locked")
        )

        if not event:
            api.abort(404, "Event not found")

        return event

    def delete(self, event_id):
        """Delete an event"""
        ok = EventService.delete(event_id)
        if not ok:
            api.abort(404, "Event not found")
        return {"message": "Event deleted"}
