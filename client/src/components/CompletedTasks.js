import { useEffect, useState } from "react"
import { Button, message, Space } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
// import CompletedTabCard from "./CompletedTabCard";

function CompletedTasks({ user }) {
    // const { Panel } = Collapse;
    const [tasks, setTasks] = useState([])
    const [tasksToDisplay, setTasksToDisplay] = useState(false)

    useEffect(()=>{
        fetch("/api/tasks")
        .then(r=>r.json())
        .then(data=>{
            let complete_tasks = data.filter(task=>{
                return task.completed===true
            })
            console.log(complete_tasks)
            setTasks(complete_tasks)
        })
        // console.log(tasks)
    },[])
   console.log(tasks)
    
   function handleDeleteCompletedTask (id) {
    fetch(`/api/tasks/${id}`, {
        method: "DELETE",
    })
    // .then(setTasks(tasks.filter(task => task.id === id)))
    
    // .then(r=>{
    //     if (r.ok) {
    //         let newList = tasksToDisplay.filter((task)=>{
    //             return (task.id!==id)
    //         })
    //         setTasksToDisplay(newList)
    //     }
    //   })

    // setTasks(tasks)
    setTasks(tasks.filter((task) => task.id !== id))
    console.log(id)
    setTasksToDisplay(!tasksToDisplay)
}
console.log(tasks)
    console.log(tasksToDisplay)
    
    return(
        <div>
            <div className="completedinstruction">
                <p>Click on a task to remove it from your history:</p>
                {/* <p>A history of your completed/previous tasks:</p> */}
            </div>
            <br></br>
                <>
                <Space direction="vertical">
                {tasks.map(task=>{
                    return (
                    <Button id="completed-btn" key={task.id} user={user} size="large" shape="round" danger onClick={() => handleDeleteCompletedTask(task.id)}>
                        <DeleteOutlined/>
                        {task.name}
                    </Button>
                    )
                })}
                </Space>
                </>
        </div>
    )
}

export default CompletedTasks;
