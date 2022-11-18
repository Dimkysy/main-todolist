import React from "react";
import {filterValuesType} from "./App";

type TaskType = {
    id:number
    title:string
    isDone:boolean
}
type PropsType = {
    title:string
    tasks: Array <TaskType>
    removeTasks:(id:number) => void
    changeFilter:(value:filterValuesType) => void
}


function Todolist(props:PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTasks(t.id)}>x</button>

                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={()=> props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={()=> props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}


export default Todolist