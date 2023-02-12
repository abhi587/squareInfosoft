## postman collection is provided in the attachment.
1. please copy the access token from the create user api's responce
2. please paste that access token in header(x-api-key) of next api (get details by token)


The aim of this exercise is to create RESTful APIs. Create Node.js project and host the project on any
server/platform which allows hosting the project for a trial period.
  - Anyone from the MySQL or MongoDB database can be used for this coding test.
  - All Response data will be in JSON format.
Create 5 APIs
    1. Create user
    a. Description: This API will create a user in the database and will return the JWT access
    token
    a. Request:
    i. Method type: POST
    ii. Request body: email, password, name, dob
    b. Response:
    i. Access token of the created user
2. Get user
    a. Description: This API will return a user object from database based access token passed
    in the header, this API is accessible only if access token is passed in header
    b. Request:
    i. Request type: GET
    ii. Header: Pass access token
    c. Response:
    i. User object
3. Get user by id
    a. Description: This API will return a user object from database based on user_id passed in
    API url, this API is accessible only if access token is passed in header
    b. Request
    i. Request type: GET
    ii. Query parameter: user_id
    iii. Header: Pass access token
    c. Response:
    i. User object
4. Get all user
    a. Description: This API will return all user from database based access token passed in
    header, this API is accessible only if access token is passed in header
    b. Request
    i. Request type: GET
    ii. Header: Pass access token
    c. Response:
    i. List of user
5. Delete a user by id
    a. Description: This API will delete user object from database based on user_id passed in
    API url, this API is accessible only if access token is passed in header
    b. Request
    i. Request type: DELETE
    SQUARE INFOSOFT
    www.squareinfosoft.com
    ii. Query parameter: user_id
    iii. Header: Pass access token
    c. Response:
    i. Success message
—-------------—-------------—-------------—-------------—-------------

