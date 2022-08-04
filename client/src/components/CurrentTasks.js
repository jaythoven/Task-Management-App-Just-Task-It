import { useEffect, useState } from "react"
import { Collapse, message } from 'antd';
import TaskCard from "./TaskCard";

function CurrentTasks({ user, count, setCount }) {
    const { Panel } = Collapse;
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        fetch('/api/tasks').then(r=>r.json()).then(data=>{
            let incomplete_tasks = data.filter(task=>{
                return task.completed!==true
            })
            setTasks(incomplete_tasks)
        })
    },[])

    const handleDeleteTask = (id) => {
        fetch(`/api/tasks/${id}`, {
            method: "DELETE",
        })
        .then(setTasks(tasks.filter(task => task.id !== id)))
        setCount(count-1)
    };

    const success = () => {
        message.success('Successful!');
      };

    function handleComplete(id) {
        fetch(`/api/tasks/${id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })
        }).then(r=>{
            if (r.ok) {
                let newTasks = tasks.filter(task=>{
                    return task.id!==id
                })
                setTasks(newTasks)
                setCount(count - 1)
                success()
            }
        })
    }

    return(
        <div id="currenttasks">
            <Collapse>
                {tasks.map(task=>{
                    return (
                    <Panel header={task.name} key={task.id}>
                        <TaskCard user={user} task={task} handleDeleteTask={handleDeleteTask} handleComplete={handleComplete}/>
                    </Panel>)
                })}
            </Collapse>
        </div>
    )
}

export default CurrentTasks;
