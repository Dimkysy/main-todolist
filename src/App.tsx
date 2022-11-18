import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';

export type filterValuesType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Jss", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: true},
    ])

    let [filter, setFilter] = useState<filterValuesType>("all")

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }


    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    function addTaks(title:string) {
        let task = {id:v1(), title:title, isDone:false}
        let newTaks = [task, ...tasks]
        setTasks(newTaks)
    }

    function changeTasksStatus(id:string, isDone:boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist title=" Hello"
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTaks = {addTaks}
                      changeTasksStatus ={changeTasksStatus}
                      filter = {filter}
            />
        </div>
    );
}

export default App;
