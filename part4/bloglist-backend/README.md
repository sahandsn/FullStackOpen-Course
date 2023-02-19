# summary

This part focused on three aspects of the backend: project structure, testing, and user administration.

## project structure

following DRY and increasing readablity of the code, the backend file was **refactored** to decrease the complexity of individual files and apply single responsibility principle. As the application grows, following thses principals will make the development and debugging much more convinient.

refactoring the API route handler was possible with **router object** of the express. one advantage of refacoring port litener and route handler was testing at the API level without making calls via HTTP over the network. the order of middleware call was important. 

*painful mistakes:* using cors instead of cors() in middleware. in vscode REST client, when sending obj through POST, the last property should not have comma.

## testing

**Jest**, a testing library for JS was used. direcory names should not contain space. file names should end with test.js, not just js. refacoring the functions needed for testing to another file and only keep the tests and their descriptions in the .test.js files. **expect/matchers** were the primary tool for checking the results. eslint configuration must be adjusted to allow globals-test, expect. mongoose states that jest is not recommended for Node testing and suggestst two ways to decrease some errors: setting global teardown and increasing the default timeout. it is wise to run only the test being constructed instead of all the tests.

in order to preserve our data in the db when testing, we should either use a mock db libraty or defferentiate between modes of application, e.g. testing, development, and deployment. the later was used, eventhough not the optimal solution, with the help of **cross-env** library to read express environment variables in windows and **NODE_ENV** which is an express environment variable. also, jest must run tests serially instead of the default parallel so that db interference don't occur while testing.

in order to write API-level integration tests, **supertest** package was used, which creates a new **supertest obj** capable of making HTTP requests to the backend.

tests should not be dependent on the state of the db. two jest middlewares were important in creating **setup and teardown** functions: beforeEach and afterAll. they helped us prepare test db before each test with fresh data and close db connection after tests are finished.

asynchronous code can be written using the synchronous style with **async/await**. use either async/await or then method for the same code, not both. await have to return a promise. error handling is done with **try/catch**. if the catch only calls next(exception), we can get ride of the try/catch syntax by adding the **express-async-error** library.  note that forEach function of JS is not optimized for working with promises. instead use **Promise.all**, if speed is needed since it runs the promises in parallel, or **for/of block**, if the order of execution of promises must be kept since it runs tests serially.

*painful mistake:* make sure that the error you are getting happens on other devices as well, might be hardware related not software.

## user administration

relational db use foreign key to reference resourses on seperate tables. document db **did not** support join queries for agregating data from multiple tabs until mongoDB introduced $lookup, which works by making multiple queries. unlike relational db, references are stored in **both** documents schemas with model names in document db.

in schema-less db like mongoDB, radical design decisions are made for data organization in the beginning. referencing accross collections **does not** have one best practice. you can reference id from collection A in collection B, or vice versa. alternitavely, you can nest the entire collection A in collection B or vice versa. choosing the right db structure is important.

user's password should not be stored as plain text. hash/compare are used with **bcrypt** package. a salt can be used for hashing which is a number. it increases the security at the cost of computation power by repeating the hashing process 2-to-the-power-of--the-given-salt times 

uniqueness of the username cannot be checked with mongoose validators, so **mongoose-unique-validator** library is used.

**populate()** is a mongoose method that allows to to aggeragate data and perform join queries by making multiple requests. important to note that it is **not transactional** , meaning that the state of the db might change in between the neccessary requests to complete the method, unlike foreign key of ralational db.

**token-based-authentication** is a stateless way of **recognizing users**, meaning that no info about the user needs ro be stored. a **token** is the user's credentioals are signed digitally and encripted into a string with cryptographic means, making it impossible to falsify. it can be accomplished with the help of **jswonwebtoken** library though sign/verify methods. thses two methods require a string, secrete, to perform their tasks. limiting the user's actions to the data they own can be achieved by sending the token through **authentication header** with Bearer scheme from browser to server and cheking if the user has access to that action or data by verifying the user's identity encoded in the token. a header can be accessed with req.get method. when testing, header can be used with set method. 

two ways can be used to revoke the access rights of a token: limit the validity period or use server-side sessions. 
**validity period** balances security with UX -the need for re-signingin. with JWT-token, a token includes information about the user and transfered through authentication header. 
**server-side session** balances security with backend complexity -each api req to the db needs token validation- and performance -db access is considerably slower. this decrerased db performance can be improved with using a key-value db. in server-side session, token is a random string with no information about the user and transfered through cookies; for each api req, server fetches relavent information about the identity of the user from db.

username, password, and token must be transfered over HTTPS protocol. either use node HTTPS server in the app or use a PssS that routes all trafic between browser and its server over HTTPS protocol.

 



