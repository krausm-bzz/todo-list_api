const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const todos = [
    {"id": 1, "title": "Einkaufsliste", "description": "Milch, Brot, Eier kaufen", "dueDate": "2024-04-20", "completed": false},
    {"id": 2, "title": "Geburtstagsparty planen", "description": "Geschenk besorgen, Gästeliste überprüfen", "dueDate": "2024-05-10", "completed": false},
    {"id": 3, "title": "Sport machen", "description": "Joggen im Park", "dueDate": "2024-04-22", "completed": true},
    {"id": 4, "title": "Buch lesen", "description": "Neues Buch \"Der Hobbit\" lesen", "dueDate": "2024-04-25", "completed": false},
    {"id": 5, "title": "Reise planen", "description": "Urlaub nach Bali buchen", "dueDate": "2024-06-01", "completed": false},
    {"id": 6, "title": "Arzttermin", "description": "Kontrolluntersuchung beim Hausarzt", "dueDate": "2024-05-15", "completed": true},
    {"id": 7, "title": "Projekt abschließen", "description": "Letzte Änderungen am Projektbericht vornehmen", "dueDate": "2024-04-30", "completed": false},
    {"id": 8, "title": "Geburtstagsgeschenk kaufen", "description": "Geschenk für Freund besorgen", "dueDate": "2024-05-05", "completed": false},
    {"id": 9, "title": "Wohnung aufräumen", "description": "Küche und Wohnzimmer aufräumen", "dueDate": "2024-04-28", "completed": true},
    {"id": 10, "title": "Sprachkurs beginnen", "description": "Spanischkurs an der Volkshochschule anmelden", "dueDate": "2024-05-20", "completed": false}
]


app.get('/todos', (req, res) => {
    if (todos) {
        res.status(200).send(todos)
    } else {
        res.status(404).send("Keine ToDo's vorhanden")
    }
});

app.post('/todos', (req, res) => {
    const { title, description, dueDate } = req.body
    if (title) {
        const id = (todos.length + 1).toString()
        let completed = false
        const newTodo = { id, title, description , dueDate, completed}
        todos.push(newTodo)
        res.json(newTodo)
    } else {
        res.status(422).send("Titel erfordelich")
    }
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    const todo = todos.find(todo => todo.id === id)
    if (!id) {
        res.status(404).json({ error: 'Todo nicht gefunden' })
    } else {
        res.json(todo)
    }
})


app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo nicht gefunden' });
    }
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});