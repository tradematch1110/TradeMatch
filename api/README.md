
# Craete a server with CRUD options
* Run the following commands in the cli:
```bash

# Create a new folder and move to this path
mkdir server
cd server

# Add package.json file - to enable installation of npm packages
npm init 

# Install 2 packages to our local project
npm i express
npm i body-parser

# Create a new file named app.js
touch app.js
```

This will create a new app with npm init and required packages.

* Open the `sever` folder in `visual studio code`, and paste into `app.js` file, the following code:
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();



// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, 
//and parses it to json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let peopleArray = [];


// GET FROM THE SERVER THE PEOPLE LIST
app.get("/all",
    (request, response) => {
        response.status(200); // 200 is OK 
        response.send(peopleArray);
    }
);


// ADD A NEW PERSON TO THE LIST
app.post("/add",
    (request, response) => {

        //push - is a built-in function in js
        //that adds a new element to the end of the array
        peopleArray.push(request.body);

        response.status(201); // 201 is CREATED 
        response.send({ "message": "added successfully to the list" });
    }
);


// UPDATE A PERSON IN THE LIST - BY THE NAME THAT IS GIVEN IN THE URL
// THE DETAILS OF THE UPDATE ARE IN THE BODY
app.put("/edit/:p",
    (request, response) => {

        //Returns the value of the first element in the array 
        //where predicate is true, and undefined otherwise.
        let person = peopleArray.find(e => e.name == request.params.p);

        if (person != undefined) {
            person.age = request.body.age;
        }
        response.status(200); // 200 is OK
        response.send();
    }
);


// DELETE A PERSON FROM THE LIST - BY THE NAME THAT IS GIVEN IN THE URL
app.delete("/delete/:p",
    (request, response) => {

        //Returns the elements of an array that meet the condition 
        //specified in a callback function.
        peopleArray = peopleArray.filter(e => e.name != request.params.p);
        response.status(204); // 204 is EMTY RESPONSE 
        response.send();
    }
);


app.listen(4500, () => { console.log("Server is running in port 4500") });
```

* Add to the `scripts` section, in the `package.json` file, this lune:
```
"start":"node app.js"
```

* Run the app with the follwing command:
```
npm start
```


* Test the express server in the curl:
```
curl -X GET http://localhost:4500/all
[]


curl -X POST -H "Content-type: application/json" -d "{\"name\":\"Bob\",\"age\":\"20\"}" http://localhost:4500/add
{"message": "added successfully to the list"}


curl -X GET http://localhost:4500/all
[{"name": "Bob","age": 20}]



curl -X PUT -H "Content-type: application/json" -d "{\"age\":40}" http://localhost:4500/edit/Bob


curl -X GET http://localhost:4500/all
[{"name": "Bob","age": 40}]


curl -X DELETE http://localhost:4500/delete/Bob


curl -X GET http://localhost:4500/all
[]
```