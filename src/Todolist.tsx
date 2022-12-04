import React, {ChangeEvent, useState} from "react";
import {filterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistId:string) => void
    changeFilter: (value: filterValuesType, todolistId:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTasksStatus:(id:string, isDone:boolean, todolistId:string)=> void
    removeTodolist:(todolistId:string)=> void
    filter:string
    id:string
    chageTasksTitle: (id:string,newTitle:string,totdolistId:string ) => void
    changeTodolistTitle:(id:string, newTitle:string) => void
}


function Todolist(props: PropsType) {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onComplitedHandler = () => props.changeFilter("completed", props.id)

const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
}


    return (
        <div>
            <h3><EditableSpan title = {props.title} onChange={changeTodolistTitle} /></h3>
            <button onClick={removeTodolist}>х</button>
            <AddItemForm addTask ={addTask}  />
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTasks(t.id, props.id)
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.chageTasksTitle(t.id, newValue, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done": ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <EditableSpan title = {t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onClickHandler}>x</button>

                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter":""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter":""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter":""} onClick={onComplitedHandler}>Completed</button>
            </div>
        </div>
    )
}





export default Todolist