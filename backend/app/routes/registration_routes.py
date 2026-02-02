from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
from app.services.registration_service import RegistrationService

api = Namespace("registrations", description="Registration operations")

registration_model = api.model("Registration", {
    "id": fields.Integer,
    "user_id": fields.Integer,
    "event_id": fields.Integer,
    "status_id": fields.Integer,
    "with_lecture": fields.Boolean,
    "remarks": fields.String,
    "chairs_needed": fields.Integer,
    "tables_needed": fields.Integer,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime,
    "lecture": fields.Nested(api.model("LectureForm", {
        "title": fields.String,
        "description": fields.String,
        "speaker": fields.String,
        "required_tech": fields.String,
        "preferred_time": fields.String
    }))
})

registration_form_model = api.model("RegistrationForm", {
    "user_id": fields.Integer(required=True),
    "event_id": fields.Integer(required=True),
    "status_id": fields.Integer(required=True),
    "chairs_needed": fields.Integer,
    "tables_needed": fields.Integer,
    "remarks": fields.String,
    "with_lecture": fields.Boolean(required=True),

    "lecture": fields.Nested(api.model("LectureForm", {
        "title": fields.String,
        "description": fields.String,
        "speaker": fields.String,
        "required_tech": fields.String,
        "preferred_time": fields.String
    }))
})

status_update_model = api.model("StatusUpdate", {
    "status_id": fields.Integer(required=True, description="New status ID for the registration")
})

@api.route("/")
class RegistrationList(Resource):
    @api.marshal_list_with(registration_model)
    def get(self):
        return RegistrationService.get_all()


@api.route("/form")
class RegistrationForm(Resource):

    @api.expect(registration_form_model)
    @api.marshal_with(registration_model, code=201)
    def post(self):
        data = request.json

        lecture_payload = data.get("lecture") if data.get("with_lecture") else None

        reg = RegistrationService.create_registration_form(
            user_id=data["user_id"],
            event_id=data["event_id"],
            status_id=data["status_id"],
            chairs_needed=data.get("chairs_needed"),
            tables_needed=data.get("tables_needed"),
            remarks=data.get("remarks"),
            with_lecture=data["with_lecture"],
            lecture_payload=lecture_payload
        )

        return reg, 201

@api.route("/form/<int:registration_id>")
class RegistrationFormUpdate(Resource):

    @api.expect(registration_form_model)
    @api.marshal_with(registration_model)
    def put(self, registration_id):
        data = request.json

        lecture_payload = data.get("lecture") if data.get("with_lecture") else None

        try:
            reg = RegistrationService.update_registration_form(
                registration_id=registration_id,
                chairs_needed=data.get("chairs_needed"),
                tables_needed=data.get("tables_needed"),
                remarks=data.get("remarks"),
                with_lecture=data.get("with_lecture"),
                lecture_payload=lecture_payload,
            )
        except ValueError as e:
            api.abort(404, str(e))

        return reg

@api.route("/<int:registration_id>")
class RegistrationDetail(Resource):

    @api.marshal_with(registration_model)
    def get(self, registration_id):
        reg = RegistrationService.get_by_id(registration_id)
        if not reg:
            api.abort(404, "Registration not found")
        return reg

    def delete(self, registration_id):
        ok = RegistrationService.delete_registration(registration_id)
        if not ok:
            api.abort(404, "Registration not found")
        return {"message": "Registration deleted"}
    

# Janik -------------------------!
@api.route("/<int:registration_id>/status")
class UpdateRegistrationStatus(Resource):
    
    @api.expect(status_update_model)
    @api.marshal_with(registration_model)
    def put(self, registration_id):
        """Update the status of a registration"""
        data = request.get_json()
        if not data:
            api.abort(400, "Missing JSON body")

        new_status_id = data.get("status_id")
        if new_status_id is None:
            api.abort(400, "status_id is required")

        registration, error = RegistrationService.update_registration_status(
            registration_id,
            new_status_id
        )

        if error:
            api.abort(400, error)

        return registration