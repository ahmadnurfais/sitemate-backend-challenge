class Client {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.issueList = document.getElementById('issue-list');
        this.addForm = document.getElementById('add-data');
        this.addForm.addEventListener('submit', this.add.bind(this));
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch(this.baseUrl);
        const issues = await response.json();
        this.renderIssues(issues);
    }

    async add(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        await this.addIssue(title, description);
        form.reset();
    }

    async addIssue(title, description) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        await this.fetchData();
    }

    async updateIssue(id) {
        const title = prompt("Enter new title:");
        const description = prompt("Enter new description:");
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        await this.fetchData();
    }

    async deleteIssue(id) {
        const confirmDelete = confirm("Are you sure you want to delete this issue?");
        if (confirmDelete) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE'
            });
            await this.fetchData();
        }
    }

    renderIssues(issues) {
        this.issueList.innerHTML = issues.map(issue => `
        <li>
            ${issue.title}: ${issue.description}
            <button onclick="manager.updateIssue(${issue.id})">Update</button>
            <button onclick="manager.deleteIssue(${issue.id})">Delete</button>
        </li>
        `).join('');
    }
}

const manager = new Client('http://localhost:3000/issues');
