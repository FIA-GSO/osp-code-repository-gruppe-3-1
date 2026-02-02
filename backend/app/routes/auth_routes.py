from flask_restx import Namespace, Resource, fields
from flask import request
from app.services.auth_service import AuthService

api = Namespace("auth", description="Authentication")

login_model = api.model("Login", {
    "email": fields.String(required=True),
    "password": fields.String(required=True)
})

user_session_model = api.model("UserSession", {
    "id": fields.Integer,
    "email": fields.String,
    "roles": fields.List(fields.String)
})

@api.route("/login")
class Login(Resource):
    @api.expect(login_model)
    @api.marshal_with(user_session_model)
    def post(self):
        data = api.payload
        user = AuthService.login(data["email"], data["password"])

        if not user:
            api.abort(401, "Invalid email or password")

        return {
            "id": user.id,
            "email": user.email,
            "roles": [r.role.name for r in user.roles]
        }, 200


@api.route("/logout")
class Logout(Resource):
    def post(self):
        AuthService.logout()
        return {"message": "Logged out"}, 200


@api.route("/me")
class Me(Resource):
    @api.marshal_with(user_session_model)
    def get(self):
        user = AuthService.get_current_user()
        if not user:
            api.abort(401, "Not logged in")

        return {
            "id": user.id,
            "email": user.email,
            "roles": [r.role.name for r in user.roles]
        }
