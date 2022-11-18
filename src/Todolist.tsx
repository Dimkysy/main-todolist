import React, {ChangeEvent, useState} from "react";
import {filterValuesType} from "./App";

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
    addTaks: (title: string, todolistId:string) => void
    changeTasksStatus:(id:string, isDone:boolean, todolistId:string)=> void
    removeTodolist:(todolistId:string)=> void
    filter:string
    id:string
}


function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTasks = () => {
        if(title.trim() !== "") {
            props.addTaks(title, props.id)
            setTitle("")
        } else {
            setError("Title is requred")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    // @ts-ignore
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTasks()
        }
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onComplitedHandler = () => props.changeFilter("completed", props.id)


    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>х</button>

            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTasks}>+</button>
                {error && <div className="error-message">{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTasks(t.id, props.id)
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done": ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
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