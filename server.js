const express = require('express'); // I uses express library to handle the requestuest between server and client
const bodyParser = require('body-parser'); // I uses body-parser to parse the content of requestuest into JSON
const Issues = require('./issues'); // Import the Issues class that I already created before

// This is the class that will handle the server
// Since I uses a simple Node.js to run the server
// So that, in this class, I also include the code that will start the server
class Server {
    constructor(port) {
        this.app = express(); // Initiate the express
        this.port = port; // Just to make it easier in changing the port of the server
        this.issues = new Issues(); // Created a new object of Issues class. This will trigger the constructor of the Issues class that define the issues array
        this.setup(); // Call the setup method
        this.routing(); // Call the routing method
    }

    start() {
        this.app.listen(this.port, () => {
            console.log("Succesfully started the server");
        });
    }

    // Define the middleware to parse the body of http requestuest to JSON
    // Also define the header of the server
    setup() {
        this.app.use(bodyParser.json());
        this.app.use((request, response, next) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    // Handle the routing of the server to trigger the API operation
    routing() {
        this.app.get('/issues', (request, response) => {
            response.json(this.issues.get()); // Get the issue data
        });

        this.app.post('/issues', (request, response) => {
            const data = request.body;
            this.issues.add(data); // Add a new issue data
            console.log("Issue added:", data);
            response.json({ message: 'Successfully added new issue', issue: data });
        });

        this.app.put('/issues/:id', (request, response) => {
            const id = parseInt(request.params.id);
            const data = request.body;
            this.issues.update(id, data); // Update the issue data based on its id
            console.log("Issue updated:", data);
            response.json({ message: `Successfully updated the issue with id ${id}`, issue: data });
        });

        this.app.delete('/issues/:id', (request, response) => {
            const id = parseInt(request.params.id);
            const data = this.issues.delete(id); // Delete the issue data based on its id
            console.log("Issue deleted:", data);
            response.json({ message: `Successfully deleted the issue with id ${id}`, issue: data });
        });
    }
}

const server = new Server(3000);
server.start();
