# summary

This part focused on two aspects of the application: React, and testing.

## React

conditionally rendering components was reviewed with terneray and && operator. we also learned to apply CSS conditionally to switch between showing the content in short or full.

**window.localStorage** was used to as a key-value, origin-specific db to store jwt in the browser to prevent re-entering username/password on each visit of the app. 

using localStorage prompts us to be careful of **cross-site scripting (XSS)** attacks. although React's JSX sanitizes all text that it renders, the risk of attacks should be minimized because there is no best solution that comes with zero side effects.

instead of passing variables and functions as props to components, we used **props.children**, which is an array to help us access the components that are child components of other components and are placed between the opening and closing tags of the parent component. we can control the rendering of child component contingent to other factors/variables being met.

**useRef** along with forwardref and useImparativeHandle was used to preserve a value between renders but updating those values should not cause re-rendering. each element has a 'ref' attribute to hook a useRef to it. useRef should not be overused, only for things that don't impact the components rendering output. for otherthings, lift the shared state up to the closest ancestor and pass it down as a prop.

**prop-types** package was used to simplify maintaing code. it enables typechecking by defining the expected and required props of a component, but does not enforce it.

## testing

in [part4](part4\bloglist-backend), the <ins>backend</ins> was tested on 'an API level', using *integration* tests. in this part, <ins>frontend's</ins> 'componnets' are tested with *unit* tests and the <ins>app (system)</ins> 'as a whole' is tested with *end-to-end* testing.

1. Unit testing the frontend: 
- **jest** is used again. 
- the tests should be stored in the frontend's directory, either in the component directory or a seperate one. 
- debugging is possible with debugg method of screen obj.
- **user-event** library helps us simulate user interactions.

2.End-to-end (e2e) testing the app:
- **cypress** is used as a more convinient alternative to selenium. tested system should be running, because unlike jest, cypress does not start the system when tests are run. cypress runs the tests in the order that they are written. each test is started from scratch not from where previous test finished. since cypress does not have access ro db, an endponit must be created in the backend, accesss which would erase the db and to set it up for each test and ensuring same conditions each time a test is run.return values can be accessed with (.then) since they are similar to promises.
- tests can be stored anywhere. 
- using the debugger statement will not stop code execution in the middle of a test, but before any commands of the test have been executed.
- although mimicking user interactions are possible in cypress, it is recommended to test the UI only once, and in the subsequent tests bypass the UI and making http requests to the backend.
