# Coding Guidelines

## Project Structure

```
root/
├── frontend/           # React + Vite application
├── backend/            # Flask API
├── .gitignore
├── README.md
└── CODING-GUIDELINES.md
```

## Naming Conventions

### Frontend

- **All Files**: lowercase with hyphens (e.g., `user-profile.jsx`, `nav-bar.jsx`, `use-auth.js`)
- **Folders**: lowercase with hyphens (e.g., `user-profile/`, `api-client/`)
- **Components**: Files are lowercase-hyphenated, but exports are PascalCase
- **Hooks**: lowercase-hyphenated files (e.g., `use-fetch.js`, `use-local-storage.js`)
- **Utilities**: lowercase-hyphenated (e.g., `format-date.js`, `api-client.js`)

### Backend

- **Python Files**: snake_case (e.g., `user_service.py`, `auth_controller.py`)
- **Folders**: snake_case (e.g., `user_routes/`, `api_services/`)
- **Classes**: PascalCase (e.g., `UserService`, `AuthManager`)
- **Functions/Variables**: snake_case (e.g., `get_user_data`, `is_active`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)

### Code Variables

- **JavaScript**: camelCase (e.g., `getUserData`, `isActive`)
- **Python**: snake_case (e.g., `get_user_data`, `is_active`)
- **Constants**: UPPER_SNAKE_CASE in both languages

## Frontend Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── api/            # API client and endpoints
│   │   ├── client.js   # Axios instance configuration
│   │   └── endpoints/  # API endpoint definitions
│   │       ├── user-api.js
│   │       └── auth-api.js
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── ui/         # Basic UI components
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   └── card.jsx
│   │   └── layout/     # Layout components
│   │       ├── header.jsx
│   │       ├── footer.jsx
│   │       └── sidebar.jsx
│   ├── features/       # Feature-based modules
│   │   └── user/
│   │       ├── components/
│   │       │   ├── user-profile.jsx
│   │       │   └── user-avatar.jsx
│   │       ├── hooks/
│   │       │   ├── use-user-query.js
│   │       │   └── use-update-user.js
│   │       └── pages/
│   │           └── user-dashboard.jsx
│   ├── hooks/          # Global custom hooks
│   │   └── use-auth.js
│   ├── lib/            # Third-party library configurations
│   │   ├── query-client.js
│   │   └── router.jsx
│   ├── routes/         # TanStack Router route definitions
│   │   ├── __root.jsx
│   │   ├── index.jsx
│   │   └── user/
│   │       └── $id.jsx
│   ├── styles/         # Global styles
│   │   └── global.css
│   ├── utils/          # Helper functions
│   │   ├── format-date.js
│   │   └── validators.js
│   └── main.jsx
├── .env.example
├── .eslintrc.json
├── package.json
└── vite.config.js
```

### Frontend Best Practices

- All file names are lowercase with hyphens
- One component per file
- Keep components small and focused (< 200 lines)
- Use functional components with hooks
- Props should be destructured in function parameters
- Use TanStack Query for server state management (queries and mutations)
- Use TanStack Router for routing and navigation
- API calls should be defined in `/api/endpoints`
- Wrap API calls with custom hooks using useQuery and useMutation
- Use absolute imports with path aliases (`@/components`, `@/api`)
- Group related features in `/features` directory
- Configure Axios instance in `/api/client.js` with interceptors

### API Endpoint Definition

```js
// Good: api/endpoints/user-api.js
import { apiClient } from '../client';

export const userApi = {
  getUser: (userId) => apiClient.get(`/users/${userId}`),
  
  getUsers: (params) => apiClient.get('/users', { params }),
  
  createUser: (userData) => apiClient.post('/users', userData),
  
  updateUser: (userId, userData) => 
    apiClient.put(`/users/${userId}`, userData),
  
  deleteUser: (userId) => apiClient.delete(`/users/${userId}`),
};
```

### TanStack Query Hook Example

```js
// Good: features/user/hooks/use-user-query.js
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/endpoints/user-api';

export const useUserQuery = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId).then(res => res.data),
    enabled: !!userId, // Only run if userId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### TanStack Mutation Hook Example

```js
// Good: features/user/hooks/use-update-user.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/endpoints/user-api';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }) => 
      userApi.updateUser(userId, userData).then(res => res.data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch user query
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};
```

### Component with Query Example

```jsx
// Good: features/user/components/user-profile.jsx
import { useUserQuery } from '../hooks/use-user-query';
import { useUpdateUser } from '../hooks/use-update-user';

export const UserProfile = ({ userId }) => {
  const { data: user, isLoading, error } = useUserQuery(userId);
  const updateUser = useUpdateUser();

  const handleUpdate = () => {
    updateUser.mutate({
      userId,
      userData: { name: 'New Name' },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <button 
        onClick={handleUpdate}
        disabled={updateUser.isPending}
      >
        Update Profile
      </button>
    </div>
  );
};
```

## Backend Structure

```
backend/
├── app/
│   ├── __init__.py     # Flask app factory
│   ├── models/         # Database models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── post.py
│   ├── routes/         # API route blueprints
│   │   ├── __init__.py
│   │   ├── user_routes.py
│   │   └── auth_routes.py
│   ├── services/       # Business logic
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   └── auth_service.py
│   ├── utils/          # Helper functions
│   │   ├── __init__.py
│   │   ├── validators.py
│   │   └── decorators.py
│   └── config.py       # Configuration classes
├── tests/              # Unit and integration tests
│   ├── test_user_routes.py
│   └── test_auth_service.py
├── migrations/         # Database migrations
├── .env.example
├── requirements.txt
└── run.py              # Application entry point
```

### Backend Best Practices

- All Python files use snake_case
- Use Flask Blueprints for organizing routes
- Keep route handlers thin - move logic to services
- One model per file in `/models`
- Use environment variables for configuration
- Include docstrings for all functions and classes
- Follow PEP 8 style guide
- Use virtual environments (venv)
- Type hints are encouraged for function signatures
- Use `__init__.py` files to make directories packages

### Route Example

```python
# Good: routes/user_routes.py
from flask import Blueprint, jsonify, request
from app.services.user_service import UserService

user_bp = Blueprint('users', __name__, url_prefix='/api/users')

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Retrieve a user by ID."""
    user = UserService.get_user_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict()), 200
```

### Service Example

```python
# Good: services/user_service.py
from app.models.user import User
from app import db

class UserService:
    """Service layer for user-related operations."""
    
    @staticmethod
    def get_user_by_id(user_id: int) -> User:
        """
        Retrieve a user by their ID.
        
        Args:
            user_id: The unique identifier of the user
            
        Returns:
            User object or None if not found
        """
        return User.query.get(user_id)
    
    @staticmethod
    def create_user(name: str, email: str) -> User:
        """Create a new user."""
        user = User(name=name, email=email)
        db.session.add(user)
        db.session.commit()
        return user
```

## Git Workflow

- **Branch naming**: `feature/user-authentication`, `bugfix/login-error`, `hotfix/security-patch`
- **Commits**: Use conventional commits format
  - `feat: add user login endpoint`
  - `fix: resolve CORS issue on API`
  - `docs: update README with setup instructions`
  - `refactor: simplify user service logic`
- **Pull Requests**: Require at least one review before merging
- Keep commits atomic and focused on a single change

## Code Quality

### Linting and Formatting

**Frontend:**
- ESLint for code linting
- Prettier for code formatting
- Run `npm run lint` before committing

**Backend:**
- Flake8 or Pylint for linting
- Black for code formatting
- Run linting before committing
- Maximum line length: 88 characters (Black default)

### Testing

- **Frontend**: Use Vitest + React Testing Library
  - Test files: `component-name.test.jsx`
  - Mock API calls with MSW (Mock Service Worker)
  - Test React Query hooks with a test QueryClient wrapper
- **Backend**: Use pytest
  - Test files: `test_feature_name.py`
- Run tests with `npm test` (frontend) or `pytest` (backend)

## Environment Variables

- Never commit `.env` files
- Always provide `.env.example` with dummy values
- **Frontend**: Prefix with `VITE_` (e.g., `VITE_API_URL`) - WILL BE PUBLIC!
- **Backend**: Use standard names (e.g., `DATABASE_URL`, `SECRET_KEY`)

## Documentation

- Document API endpoints with proper HTTP methods and responses
- Keep CODING-GUIDELINES.md up to date

## File Organization Summary

| Type | Frontend | Backend |
|------|----------|---------|
| Components | `user-profile.jsx` | N/A |
| Hooks | `use-auth.js` | N/A |
| Services | `api-client.js` | `user_service.py` |
| Routes | `user-dashboard.jsx` | `user_routes.py` |
| Utils | `format-date.js` | `validators.py` |
| Models | N/A | `user.py` |
| Tests | `user-profile.test.jsx` | `test_user_service.py` |

## Quick Reference

**Frontend Naming:**
- Good `user-profile.jsx`, `use-user-query.js`, `user-api.js`
- Bad `UserProfile.jsx`, `useUserQuery.js`, `userApi.js`

**Backend Naming:**
- Good `user_service.py`, `auth_routes.py`, `validators.py`
- Bad `userService.py`, `authRoutes.py`, `Validators.py`

**Key Frontend Patterns:**
- Use TanStack Query (`useQuery`, `useMutation`) for all server state
- Use TanStack Router for file-based routing
- Define API calls in `/api/endpoints` with Axios
- Wrap API calls in custom hooks (`use-*-query.js`, `use-*-mutation.js`)
