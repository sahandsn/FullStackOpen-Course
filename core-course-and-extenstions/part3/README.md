# summary

this part was focused on buiding the backend and connect the app to a database; aka, creating a full-satck application.

## backend

the backend was a rest api that was programmed using **node.js library**. i learned the two methods of import/export of *code mpdules*: CommonJS and ES6. *REPL* was used a concole window to quickly test JS code. *Nodemon* was another tool that enabled us to work continously on the project and not worry about restarting the project every time a change was made.

three tools can help us to debugg JS code - apart from console.log() : *debugger* statement of JS, *VS code*'s debugger feature, and *chrome dev tools*.

 throughout the part i  used **node package manager** to add dependencies and devDependencies to the project. npm has a *semantic versioning* to differentiate between code releases and compatibility. *npm dependency model* proved ideal if the dependency are purely implementation details, never observable from outside of a package; otherwise the code size increaseing significantly which leads to decrease of performance. *script* object of npm allowed us to automate sequences of code execution. adding a *proxy* object works as a fallback value for port, useful when in production mode the app will not be running on the React's default port number.

 for building the server we could have used plain nodejs but instead used **express framework** . *route handling* was easily achieved with express.*route parameter* in express route handling helped us create custom url to access each api resource.

 *middlewares* are functions defined in express framework that can be used for handling requests and response objects. ordering of the middlewares is important. *json-parser* middleware transformed the JSON of the request into a JS object. *morgan* middleware was used as a HTTP request logger for nodejs. *cors* middleware allow requests from other origins, shutting down the same origin policy. *static* middleware helpes us in the production mode of deploying the app for serving static content from the backend. error hadling was made easier with next function of middlewares and creating custom express error handling middlewares, beacuse it allowed us to centaralize the error handling logic.

two tools helped us test our api independently: **postman** and **vs code REST client**.  

*http requests* like get, post, put, patch, and delete was handled easily with express. *safety* and *indempotent* were two aspect of http requests.

browsers employ a security mechanism called **same origin policy** to prevent session hijacking. it limits fetching resources of a site to the same server that the original HTML was stored on, based on the *access-control-allow-origin* header of the response object. 

the life cycle of an app has three phases: development mode, production mode, deployed. when different parts of the app, including frontend, backend, and database are being *developed* and when tested, they run on different ports. once parts are comming together and front is *optimized* for *production* and used in the back in the build directory, they run on the same port number. once production mode is completed, the whole app can be *deployed* on a remote server, such as *Railway* which is a **PaaS** (platform as a service).

**ESlint** is another tool that helps us find styling and logical error of our code. we used it through it's vs code plugin. eslint has many *rules* that we can track. however, instead of hand picking your own set of rules, choose a predefiend configuration such as *Airbnb's configuratio for ESLint*.

## database

we used a document-oriented database which has a NoSQL model, called **MongoDB**. in mongodb each *database* has at least one *collection* that stores *documents*. documents are *BSON* which gives us access to more data types than a JSON would do. we can store our database on the cloud with providers such as **MongoDB Atlas**. 

**mongoose library** helps us map documents into objects. database configuration code can have its own code module that can be export/imported using CommonJS modules or ES6 modules. backend integration with db can be tested with postman or vs code rest client. *mongoose validation* can help us filterout documents that do not meet certain requirements, create custom error messages, and add our own custom validators.

**dotenv library** helped us store variables in a .env file and used them in our code. 