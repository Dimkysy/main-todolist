import React from 'react';
import './App.css';
import Todolist from './Todolist';

let tasks1 = [
    {id:1, title:"HTML&CSS", isDone:true},
    {id:2, title: "JS", isDone: false},
    {id:3, title: "React", isDone: false},
]



function App() {
    return (
        <div className="App">
           <Todolist title ="Bear" tasks = {tasks1} />
        </div>
    );
}

export default App;
