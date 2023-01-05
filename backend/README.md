# Backend Documentation

This is the documentation for the backend of the roommate matching application. This will include the details about the project such as routes, models, etc.

## Routes

### **Recommend Users**

Route that, given a user email, returns recommendation of (10) other users to match with

| URL          | Method |
|--------------|--------|
| `/recommend` | `GET`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| email | `string` | Email of the user that we are recommending for|

***Returns:***

JSON array of user objects