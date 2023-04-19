     sequenceDiagram
        participant b as Browser
        participant s as Server
        b->>+s: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
        
        note right of s: the server asks the browser<br/>to make a new GET request<br/> to a new address: /notes
        s-->>-b: status code 302: /notes (redirect)
        
        b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
        s-->>+b: HTML-code
        note left of b: the HTML-code contains a link<br/> to a CSS file in the path: /exampleapp/main.css<br/> that should be fetched

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        s-->>+b: main.css
        note left of b: the HTML-code contains a link<br/> to a JavaScript file in the path: /exampleapp/<br/>main.js that should be fetched

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        s-->>+b: main.js
        note left of b: browser immediately starts <br/>executing the JS code, which requests <br/>a JSON file from the server

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
        s-->>b: data.json

        note over b: once JSON file is fetched,<br/> JS's event handler is triggered, <br/>causing a DOM-API manipulation.

        note over b: The final html code is rendered on the display. 
 
 
 ```mermaid
    sequenceDiagram
        participant b as Browser
        participant s as Server
        b->>+s: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
        
        note right of s: the server asks the browser<br/>to make a new GET request<br/> to a new address: /notes
        s-->>-b: status code 302: /notes (redirect)
        
        b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
        s-->>+b: HTML-code
        note left of b: the HTML-code contains a link<br/> to a CSS file in the path: /exampleapp/main.css<br/> that should be fetched

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        s-->>+b: main.css
        note left of b: the HTML-code contains a link<br/> to a JavaScript file in the path: /exampleapp/<br/>main.js that should be fetched

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        s-->>+b: main.js
        note left of b: browser immediately starts <br/>executing the JS code, which requests <br/>a JSON file from the server

        b->>-s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
        s-->>b: data.json

        note over b: once JSON file is fetched,<br/> JS's event handler is triggered, <br/>causing a DOM-API manipulation.

        note over b: The final html code is rendered on the display. 
```