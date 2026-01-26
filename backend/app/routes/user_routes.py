from flask_restx import Namespace, Resource, fields
from app.services.user_service import UserService

api = Namespace("users", description="User operations")

user_model = api.model("User", {
    "id": fields.Integer(readonly=True),
    "email": fields.String(required=True),
    "company_name": fields.String,
    "contact_person": fields.String,
    "active": fields.Boolean,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime
})

@api.route("/")
class UserList(Resource):

    @api.marshal_list_with(user_model)
    def get(self):
        return UserService.get_all_users()

    @api.expect(user_model)
    @api.marshal_with(user_model, code=201)
    def post(self):
        data = api.payload
        return UserService.create_user(data["username"]), 201
