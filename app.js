// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.listen(port, (err) => {
//     if (err) {
//         return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on ${port}`);
// });



// module.exports = app;


const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to TaskManger API')
})

app.post("/tasks", (req, res) => {
    const { title, description, completed } = req.body;

    // Validation
    if (!title || !description || typeof completed !== "boolean") {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed,

    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});


app.get("/tasks", (req, res) => {
    const { completed } = req.query;
    let result = tasks
    console.log(completed)
    if (completed !== undefined) {
        result = result.filter((t) => t.completed.toString() === completed)
    }
    console.log(result)
    res.status(200).json(result);
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;

    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({
            message: "Invalid  Id"
        })
    }
    res.status(200).json(task)
})

app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;

    // Validation
    if (!title || !description || typeof completed !== "boolean") {
        return res.status(400).json({ error: "All fields are required." });
    }

    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return res.status(404).json({
            message: 'Invalid Id'
        })
    }
    task.id = parseInt(id)
    task.title = title;
    task.description = description;
    task.completed = completed;

    res.status(200).json(task)

})

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return res.status(404).json({
            message: 'Invalid Id'
        })
    }
    const taskIndex = tasks.indexOf(task)
    tasks.splice(taskIndex, 1);
    res.status(200).json({
        message: 'task deleted Successfully'
    })

})





module.exports = app;