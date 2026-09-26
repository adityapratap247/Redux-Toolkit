import { useState } from "react"
export default function AddForm(){
    const [task,setTask] = useState("");
    
    const submitHandler = (evt) =>{
        evt.preventDefault();
        console.log(task);
    }
    
    return(
        <>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setTask(e.target.value)}></input>
                <button>Add Task</button>
            </form>
        </>
    )
}