from flask_restx import Namespace, Resource, fields
from app.services.user_service import UserService

api = Namespace("users", description="User operations")

user_model = api.model("User", {
    "id": fields.Integer(readonly=True),
    "username": fields.String(required=True)
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
