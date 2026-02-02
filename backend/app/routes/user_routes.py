from flask_restx import Namespace, Resource, fields
from app.services.user_service import UserService

api = Namespace("users", description="User operations")

# Request / Response model for Swagger
user_model = api.model("User", {
    "id": fields.Integer(readonly=True),
    "email": fields.String(required=True),
    "password_hash":fields.String,
    "company_name": fields.String,
    "contact_person": fields.String,
    "active": fields.Boolean,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime,
    "roles": fields.List(
        fields.String,
        attribute="role_names", 
        description="List of role names"
    )
})

# For updating a user (password optional)
update_user_model = api.model("UpdateUser", {
    "email": fields.String(description="User login email"),
    "password_hash": fields.String(description="Plain-text password"),
    "company_name": fields.String(description="Company name (optional)"),
    "contact_person": fields.String(description="Contact person (optional)"),
    "active": fields.Boolean(description="Is user active"),
    "roles": fields.List(fields.String, description="List of roles to assign")
})

# For creating a user (password required)
create_user_model = api.model("CreateUser", {
    "email": fields.String(required=True, description="User login email"),
    "password_hash": fields.String(required=True, description="Plain-text password"),
    "company_name": fields.String(description="Company name (optional)"),
    "contact_person": fields.String(description="Contact person (optional)"),
    "roles": fields.List(fields.String, description="List of roles to assign", required=False)
})

@api.route("/")
class UserList(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        """Get all users"""
        return UserService.get_all_users()

    @api.expect(create_user_model)
    @api.marshal_with(user_model, code=201)
    def post(self):
        """Create a new user"""
        data = api.payload
        return UserService.create_user(
            email=data["email"],
            password=data["password"],
            company_name=data.get("company_name"),
            contact_person=data.get("contact_person"),
            roles=data.get("roles")  
        ), 201


@api.route("/<int:user_id>")
@api.param("user_id", "The user identifier")
class UserDetail(Resource):
    @api.marshal_with(user_model)
    def get(self, user_id):
        """Get a user by ID"""
        user = UserService.get_user_by_id(user_id)
        if not user:
            api.abort(404, "User not found")
        return user

    @api.expect(update_user_model)
    @api.marshal_with(user_model)
    def put(self, user_id):
        """Update a user"""
        data = api.payload
        try:
            return UserService.update_user(user_id, **data)
        except ValueError as e:
            api.abort(404, str(e))

    def delete(self, user_id):
        """Delete a user"""
        success = UserService.delete_user(user_id)
        if not success:
            api.abort(404, "User not found")
        return {"message": "User deleted successfully"}, 200
