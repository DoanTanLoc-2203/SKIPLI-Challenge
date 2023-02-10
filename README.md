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