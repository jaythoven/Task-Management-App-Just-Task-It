import { Button, Space, Modal, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined, DeleteFilled, ExclamationCircleFilled,  CheckOutlined, UserOutlined, UsergroupDeleteOutlined  } from '@ant-design/icons';
import { Popconfirm, Popover, Avatar } from 'antd';
import SubtaskCard from './SubtaskCard';

function TaskCard({ task, user, handleDeleteTask, handleComplete }) {
  
    // line 8: state for popconfirm of delete function
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [subtaskName, setSubtaskName] = useState('')
    const [errors, setErrors] = useState([]);
    const [form] = Form.useForm();
    const [subtasksToDisplay, setSubtasksToDisplay] = useState(task.subtasks)
    const [subtaskDisplay, setSubtaskDisplay] = useState([])
    const showModal = () => {
        setIsModalVisible(true);
      };
    
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
    const handleCancel = () => {
        setIsModalVisible(false);
      };
      
    function handleDelete(id) {
          fetch(`/api/subtasks/${id}`,{
              method:"DELETE"
          })
          .then(r=>{
            if (r.ok) {
                let newList = subtasksToDisplay.filter((subtask)=>{
                    return (subtask.id!==id)
                })
                setSubtasksToDisplay(newList)
            }
          })
      }

    const success = () => {
        message.success('New Sub-Task Created!');
      };
      console.log(subtasksToDisplay)
      function handleSubmit() {
        fetch("/api/subtasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: subtaskName,
                completed: completed,
                user_id: user.id,
                task_id: task.id
            }),
        }).then(r=>{
                if (r.ok) {
                    r.json().then((new_subtask=>{
                        setSubtasksToDisplay([...subtasksToDisplay, new_subtask])
                        success()
                        setIsModalVisible(false)
                    }))
                } else {
                    r.json().then((err)=>setErrors([...errors, err.errors]))
                }
            })
        form.resetFields()
      }
    // delete function starts here: 
    const showPopconfirm = () => {
        setVisible(true);   
    };

    const handleOkToDelete = () => {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
        handleDeleteTask(task.id);
    };

    const handleCancelDelete = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const { confirm } = Modal
    function showConfirm() {
        confirm({
            title: "Done?",
            icon: <ExclamationCircleFilled />,
            content: "This task will be moved to \"Completed Tasks\" and can no longer be edited.",
            okText: "Yes",
            okType: "primary",
            onOk(){
                handleComplete(task.id)
            }
        })
    }
    const participants = (
        <Space direction="vertical">
            {task.users.map((user)=>{
                return (<Space key={user.id}><Avatar icon={<UserOutlined />} />{user.username}</Space>)
            })}
        </Space>
    )

// fetch just for subtasks

    useEffect(() => {
        fetch('/api/subtasks')
        .then((r)=>r.json())
        .then(setSubtaskDisplay)
    }, []);

    function onUpdateSubtask(updatedSubtask) {
        const updatedSubtasks = subtaskDisplay.map((subtask) =>
          subtask.id === updatedSubtask.id ? updatedSubtask : subtask
        );
        setSubtaskDisplay(updatedSubtasks);
      }
    
    const {completed} = subtaskDisplay

    function handleSubtaskComplete(id){
        fetch(`/api/subtasks/${id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !completed,
            })
        }).then((r)=>r.json())
        .then(onUpdateSubtask);
    } 

    return (
        <div id="taskcard">
            <Space>
                <Button onClick={showModal} shape="round">
                    <PlusOutlined />
                    Add Sub-Task
                </Button>
                <Modal title="Create A Sub-Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form
                        className="currenttasksform"
                        name="newsubtask"
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input sub-task name!',
                            },
                            ]}
                        >
                            <Input name="name" onChange={(e)=>{
                                setSubtaskName(e.target.value)
                            }} />
                        </Form.Item>
                        {/* <Form.Item
                            label="Cost"
                            name="cost"
                            rules={[
                            {
                                required: true,
                                message: 'Please input item cost!',
                            },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} step="0.0001" name="cost" onChange={(value)=>setItemValue(value)} />
                        </Form.Item> */}
                        <Form.Item
                            wrapperCol={{
                            offset: 100,
                            span: 16,
                            }}
                        >
                            <Button htmlType="submit" shape="round">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Button onClick={showConfirm} shape="round">
                        <CheckOutlined />
                    Completed Task
                </Button>
                <Popover placement="bottomLeft" content={participants} trigger="click">
                    <Button shape="round">
                        <UsergroupDeleteOutlined />
                        Participants
                    </Button>
                </Popover>
                <Popconfirm
                    title="Once you delete, everythings is gone. No turning back. You sure?"
                    visible={visible}
                    onConfirm={handleOkToDelete}
                    onCancel={handleCancelDelete}
                    okText="Yes"
                    >
                    <Button onClick={showPopconfirm} danger shape="round">
                        <DeleteFilled  />
                        Delete
                    </Button>
                </Popconfirm>
                {/* You owe:  ${ownAmount} */}
            </Space>
            <div id="subtaskcard">
                {subtasksToDisplay.length>0? 
                <Space direction="vertical">
                    {subtasksToDisplay.map((subtask)=>{
                        return (<SubtaskCard key={subtask.id} subtask={subtask} handleDelete={handleDelete} handleSubtaskComplete={handleSubtaskComplete} />)
                    })}
                </Space>:
                <h2>Add a sub-task if needed!</h2>}
            </div>
        </div>
    )
}

export default TaskCard;
