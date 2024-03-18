class Issues {
    constructor() {
        this.issues = [
            { id: 1, title: "A", description: "A is the first letter of alphabets" },
            { id: 2, title: "Indonesia", description: "It is a country that located in sout Asia" }
        ];
    }

    get() {
        return this.issues; // Just simply return the data
    }

    add(data) {
        this.issues.push(data); // Add a new data or element in the issues array that later will become the JSON objects
    }

    update(id, data) {
        // Update the issue data based on its id. Use ternary operator to only update the belonging data
        this.issues = this.issues.map(issue => (issue.id === id ? { ...issue, ...data } : issue));
    }

    delete(id) {
        // Delete the issue based on its id using filter function,
        // it will creating a new array without the id that passed in this method
        const deleted = this.issues.find(issue => issue.id === id); // Assign first the data that will be deleted
        this.issues = this.issues.filter(issue => issue.id !== id);
        return deleted; // Return the deleted data
    }
}

module.exports = Issues;
