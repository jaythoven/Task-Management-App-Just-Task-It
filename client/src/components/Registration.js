import { Button, Modal, Form, Input, Alert } from 'antd';
import { useState } from 'react';

function Registration({ onLogin }) {
    const [isRsvpVisible, setRsvpVisible] = useState(false)
    const [rsvpInfo, setRsvpInfo] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function showRsvp() {
        setRsvpVisible(true)
    }
    function handleClose() {
        setRsvpVisible(false)
    }
    function handleSubmit() {
        // e.preventDefault()
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rsvpInfo),
          }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => onLogin(user));
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
          });
    }
    function handleInputChange(e) {
        setRsvpInfo({
            ...rsvpInfo, [e.target.name]:e.target.value
        })
    }
    return (
        <>
            <Button onClick={showRsvp} size="large" shape="round">Create New Account</Button>
            <Modal 
                title="User Registration" 
                visible={isRsvpVisible}
                onCancel={handleClose}
                onOk={handleClose}
                footer={null}
            >
                {errors&&errors.length>0?
                <div>
                    <Alert message={
                        errors.map((err)=>{
                            return(
                                <li>{err}</li>
                            )
                        })
                    } type="error" />
                    <p></p>
                </div>:null}
                <Form
                    name="registration"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                        ]}
                    >
                        <Input name="first_name" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                        ]}
                    >
                        <Input name="last_name" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input name="username" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input name="email" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password name="password" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password Confirmation"
                        name="passwordconfirm"
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ]}
                    >
                        <Input.Password name="password_confirmation" onChange={handleInputChange}  />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 10,
                        span: 16,
                        }}
                    >
                        <Button htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Registration;
