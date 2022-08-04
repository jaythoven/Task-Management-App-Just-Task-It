import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import DebounceSelect from './DebounceSelect';

function NewTask({ curr_user, setTasks, tasks, setCount, count }) {
    const [value, setValue] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([]);
    
    async function fetchUserList(value) {
        return fetch("/api/users")
            .then(r=>r.json())
            .then((data)=>
                data.map((user)=>({
                    label: `${user.id} ${user.username}`,
                    value: user.username
                }))
            )
    }
    
    function handleInputChange(e) {
        setTaskName(e.target.value)
    }
    // console.log(curr_user.id)
    
    function handleSubmit() {
        fetch("/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: taskName,
                completed: false
            }),
        }).then((r)=>{
            if (r.ok) {
                r.json().then(newtask=>{
                    // console.log(newtask, "should return the task")
                    // console.log(tasks, 'previous tasks')
                    setTasks([...tasks, newtask])

                    setCount(count+1)
                    handleSubmit2(newtask.id)
                    success()
                })
            } else{
                r.json().then((err)=>setErrors([...errors, err.errors]))
            }
        })

    }
    
    const success = () => {
        message.success('Created successfully!');
    };

    function handleSubmit2(task_id) {
        const users = value.map(v=>{return(v.label.split(' ')[0])})
        if (users.indexOf(curr_user.id.toString())===-1) {
            users.push(curr_user.id.toString())
        }
        users.map((user)=>{
            fetch("/api/usertasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: parseInt(user),
                    task_id: task_id
                }),
            }).then((r)=>{
                if (r.ok) {
                    r.json().then((data=>{console.log(data)}))
                } else{
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
        })
        form.resetFields()
    }

    return (
        <div id="newtask">
            <Form
            form={form}
            layout="vertical"
            wrapperCol={{span: 13,}}
            onFinish={handleSubmit}
            >
                <Form.Item
                    label="Give this task a name:"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input a name!',
                    },
                    ]}
                >
                    <Input onChange={handleInputChange} size="large" />
                </Form.Item>
                <Form.Item
                    label="Anyone else involved?:"
                    name="participants"
                    // rules={[
                    // {
                    //     required: true,
                    //     message: 'Please select participants!',
                    // },
                    // ]}
                >
                    <DebounceSelect
                        mode="multiple"
                        value={value}
                        placeholder="Select users"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Form.Item>
                <br></br>
                <Button htmlType="submit" size="large" style={{float: 'center'}} shape="round">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewTask;
