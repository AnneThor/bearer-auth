# bearer-auth
Node/Express/MongoDB/BCrypt App that signs up and signs in users!

## Author: Anne Thorsteinson

**[Tests](https://github.com/AnneThor/authentication/actions)**

**[Front End](https://bearer-auth-at.herokuapp.com/)**

## Setup

```.env``` requirements:

- ```PORT``` - port number
- ```SECRET``` - used to create jwt

## Running the App

- ```npm start```
- Endpoints:
* ```POST``` requests to ```/sign-in``` will compare the plain text password with the bcrypt hash stored in the Users database and return the status of loggedIn ```true``` or ```false```
* ```POST``` requests to ```/sign-up``` will has the password and send to the user database to store (if the user with this username does not already exist)
* ```GET``` requests to ```/users``` will return a list of usernames that are currently signed up to validated users, invalid users will get an error message
* ```GET``` requests to ```/secret``` will give validated users access to the secret area, invalid users will be locked out

## Tests

- Unit Tests: ```npm run test``` (tests for server, routes, and user model currently implemented)
- Lint Tests: ```npm run lint```


## UML Diagram

![UML diagram of basic express server project](./Lab07.png)
