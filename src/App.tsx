import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from "./AddItemForm";

export type filterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id:string
    title:string
    filter:filterValuesType
}

type TaskType = {
    id:string
    title:string
    isDone:boolean
}

type TaskStateType = {
    [key:string]:Array<TaskType>
}

function App() {

    function removeTasks(id: string, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: filterValuesType, todolistId:string) {
       let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title:string, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let task = {id:v1(), title:title, isDone:false}
        let newTaks = [task, ...tasks]
        tasksObj[todolistId] = newTaks
        setTasks({...tasksObj})
    }

    function chageTasksTitle(id:string, newTitle:string, totdolistId:string) {

        let todolistTasks = tasksObj[totdolistId]
        let task = todolistTasks.find(t => t.id === id)

        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeTodolistTitle(id:string, newTitle:string) {
        const todolist = todolists.find(tl => tl.id === id)

        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function addTodolist(title:string) {
        let todolist:TodolistType = {
            id:v1(),
            title:title,
            filter:"all",
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]:[]
        })
    }


    function changeTasksStatus(id:string, isDone:boolean, todolistId:string) {
        let tasks = tasksObj[todolistId]

        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }
    function removeTodolist(todolistId:string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)

        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id:todolistId1, title:"Wha to learn", filter:"all"},
        {id:todolistId2, title:"Bear no bear", filter:"all"},
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Js", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ],
    })

    return (
        <div className="App">
            <AddItemForm addTask={addTodolist} />

            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === false)
                    }

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === true)
                    }

                    return(
                        <Todolist
                                  key ={tl.id}
                                  id = {tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodolist}
                                  removeTasks={removeTasks}
                                  changeFilter={changeFilter}
                                  addTask = {addTask}
                                  changeTasksStatus ={changeTasksStatus}
                                  filter = {tl.filter}
                                  removeTodolist = {removeTodolist}
                                  chageTasksTitle = {chageTasksTitle}
                                  changeTodolistTitle ={changeTodolistTitle}
                        />
                    )
                })
            }
        </div>
    );
}


export default App;
