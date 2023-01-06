# Backend Documentation

This is the documentation for the backend of the roommate matching application. This will include the details about the project such as routes, models, etc.

## Routes
___

### User Routes

#### **Recommend Users**

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

JSON array of USERBIO objects

___

### Action Routes

#### **Get Users in Waiting Room**

Route that gets the email addresses of all the users that are in a given user's waiting room

| URL          | Method |
|--------------|--------|
| `/waitroom/getUsers` | `GET`  |

***Required Params***:

URL Params:

| Key   | Type | Description |
|-------|------|--------     |
| email | `string` | Email of the user whose waiting room we are getting|

***Returns:***

JSON array of email addresses. Each email is an email of a user in the given user's waiting room

#### **Add to Waiting Room**

Route that adds a target user to a given base user's waiting room

| URL          | Method |
|--------------|--------|
| `/waitroom/addUser` | `POST`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| baseEmail | `string` | Email of the base user|
| targetEmail | `string` | Email of the target user|

#### **Remove from Waiting Room**

Route that removes a target user to a given base user's waiting room

| URL          | Method |
|--------------|--------|
| `/waitroom/removeUser` | `DELETE`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| baseEmail | `string` | Email of the base user|
| targetEmail | `string` | Email of the target user|