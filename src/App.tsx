import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';

export type filterValuesType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "Js", isDone: false},
        {id: 3, title: "Reactt", isDone: true},
        {id: 4, title: "Redux", isDone: true},
    ])

    let [filter, setFilter] = useState<filterValuesType>("all")

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }


    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title=" Hello"
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
