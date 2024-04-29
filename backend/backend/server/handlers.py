from fastapi.responses import JSONResponse
from . import app

# Simulate a database (in real scenarios, you'd use a real database)
data = {
    "users": [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ]
}

# Define an endpoint to get a user by ID
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = next((user for user in data["users"] if user["id"] == user_id), None)
    if user:
        return user
    else:
        return JSONResponse(status_code=404, content={"message": "User not found"})
