# Project structural

## Client (ReactJS)
```
📦client
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜ErrorMessage.jsx (Error message component)
 ┃ ┃ ┣ 📜ProfileModal.jsx (Profile modal component)
 ┃ ┃ ┗ 📜UserTable.jsx (Github user table component)
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜phoneCode.js (List international dial code)
 ┃ ┃ ┗ 📜regex.js (Regex validate)
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📜showMessage.js (Function show toast)
 ┃ ┃ ┗ 📜validate.js (Validate function)
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Home.jsx (Home page)
 ┃ ┃ ┗ 📜Login.jsx (Login page)
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜axios.service.js (Config Axios service)
 ┃ ┣ 📜App.js
 ┃ ┣ 📜Router.js (List Route)
 ┗  📜.env (Environment variable)
```
## Server (ExpressJS)
```
📦server
 ┣ 📂src
 ┃ ┣ 📂configs
 ┃ ┃ ┗ 📜firebase.config.js (Firebase service account config)
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜regex.js (Regex validate)
 ┃ ┣ 📂controllers (Get request & send response)
 ┃ ┃ ┣ 📜create.controller.js
 ┃ ┃ ┣ 📜githubUser.controller.js
 ┃ ┃ ┗ 📜user.controller.js
 ┃ ┣ 📂routes (Config API route)
 ┃ ┃ ┣ 📜create.route.js
 ┃ ┃ ┣ 📜githubUser.route.js
 ┃ ┃ ┗ 📜user.route.js
 ┃ ┣ 📂services (CRUD data from Firestore & Github API)
 ┃ ┃ ┣ 📜create.service.js
 ┃ ┃ ┣ 📜fireStore.service.js
 ┃ ┃ ┣ 📜githubUser.service.js
 ┃ ┃ ┣ 📜sendMessage.service.js
 ┃ ┃ ┗ 📜user.service.js
 ┃ ┗ 📂utils (Some common function)
 ┃ ┃ ┗ 📜common.util.js
 ┣ 📜.env (Environment variable)
 ┣ 📜index.js
 ┣ 📜postmanAPI.json (postman API Document)
```
# Environment variable
## Client (ReactJS)
```js
// You can setting for production API endpoint.
// Path: .env
REACT_APP_API_ENDPOINT="{Your endpoint}"
```
## Server (ExpresJS)
#### 1. Firebase config:
***
```js
// Assign your account service
// Path: src/configs/firebase.config.js
const fireBaseConfig = {...}
```
#### 2. Twilio config:
***
```js
// Setting your twilio config
// Path: .env
TWILIO_ACCOUNT_SID = "{Your account sid}"
TWILIO_AUTH_TOKEN = "{Your auth token}"
TWILIO_PHONE_NUMBER = "{Your phone number}"
```


# How to run this project?
## Client (ReactJS)
#### 1. Go to client folder:
***
```cmd
cd ./client
```
#### 2. Install packages:
***
```cmd
npm install
```
or
```cmd
yarn
```
#### 3. Start project:
***
```cmd
npm run start
```
or
```cmd
yarn start
```
#### Note: you can config the local API endpoint in folder `\src\services\axios.service.js` (default is http://localhost:8080)

## Server (ExpresJS)
#### 1. Go to server folder:
***
```cmd
cd ./server
```
#### 2. Install packages:
***
```cmd
npm install
```
or
```cmd
yarn
```
#### 3. Start project:
***
```cmd
npm run start
```
or
```cmd
yarn start
```
#### Note: server running at http://localhost:8080 by default.

# API Document
You can add the file `postmanAPI.json` into Postman to see and sample query all API in ExpressJS server. 
# Deployment
Website: https://skipli-challenge.vercel.app (Vercel)

API Endpoint: https://skipli-challenge-server.onrender.com (Render)

#### Note: I currently use a free deploy service therefore sometime the server maybe not working well.
