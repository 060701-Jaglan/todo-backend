const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path to your app's entry point
const Todo = require('../models/Task'); // Adjust the path to your Todo model

describe('Todo API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-todo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase(); // Clear test database
        await mongoose.connection.close(); // Close connection
    });

    it('should retrieve all todos', async () => {
        const response = await request(app).get('/myTasks');
        expect(response.status).toBe(200);
    });

    it('should create a new todo', async () => {
        const todo = {
            name: 'Test Todo',
            description: 'A test todo item'
        };
        const response = await request(app).post('/new').send(todo);
        expect(response.status).toBe(201);
    });

    it('should update an existing todo', async () => {
        const todo = await Todo.create({ name: 'Update Todo', description: 'Before update' });
        const response = await request(app).put(`/:${todo._id}`).send({ complete: true });
        expect(response.status).toBe(200);
    });
});
