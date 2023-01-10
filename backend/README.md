# Backend Documentation

This is the documentation for the backend of the roommate matching application. This will include the details about the project such as routes, models, etc.

## Models

Documentation for database models and design

### Action

Collection that keeps track of all the actions on the app. Includes which users have been accepted, put in waiting room, and rejected by other users.

| Field Name  | Data Type | Description               | Other Information |
|-------------|-----------|---------------------------|-------------------|
| baseUserEmail | `String` | Email of the user making the action | Foreign Key from USER collection |
| targetUserEmail | `String` | Email of the target user of the action | Foreign Key from USER collection |
| actionType | `Number` | Type of action, 0 for accept, 1 for wait room, 2 for reject | |

baseUserEmail is not unique, each target user is stored in a separate document/record.

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

#### **Get Accepted Users**

Route that gets the email addresses of all the users that have been accepted by a given user

| URL          | Method |
|--------------|--------|
| `/actions/getAccepted` | `GET`  |

***Required Params***:

URL Params:

| Key   | Type | Description |
|-------|------|--------     |
| email | `string` | Email of the base user whose accepted user list we are getting|

***Returns:***

JSON array of email addresses. Each email is an email of a user that was accepted by the base user

#### **Accept User**

Route that allows the base user to accept the target user

| URL          | Method |
|--------------|--------|
| `/actions/acceptUser` | `POST`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| baseEmail | `string` | Email of the base user|
| targetEmail | `string` | Email of the target user|

#### **Get Rejected Users**

Route that gets the email addresses of all the users that have been rejected by a given user

| URL          | Method |
|--------------|--------|
| `/actions/getRejected` | `GET`  |

***Required Params***:

URL Params:

| Key   | Type | Description |
|-------|------|--------     |
| email | `string` | Email of the base user whose rejected user list we are getting|

***Returns:***

JSON array of email addresses. Each email is an email of a user that was rejected by the base user

#### **Reject User**

Route that allows the base user to reject the target user

| URL          | Method |
|--------------|--------|
| `/actions/rejectUser` | `POST`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| baseEmail | `string` | Email of the base user|
| targetEmail | `string` | Email of the target user|

#### **Get Users in Waiting Room**

Route that gets the email addresses of all the users that are in a given user's waiting room

| URL          | Method |
|--------------|--------|
| `/actions/getWaitUsers` | `GET`  |

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
| `/actions/addUserWait` | `POST`  |

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
| `/actions/removeUserWait` | `DELETE`  |

***Required Params***:

Body:

| Key   | Type | Description |
|-------|------|--------     |
| baseEmail | `string` | Email of the base user|
| targetEmail | `string` | Email of the target user|