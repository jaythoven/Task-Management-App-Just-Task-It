import { Button, Modal, Form, Input, Alert } from 'antd';
import { useState } from 'react';

function Login({ onLogin }) {
    const [isLoginVisible, setLoginVisible] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    function showLogin() {
        setLoginVisible(true)
    }
    function handleClose() {
        setLoginVisible(false)
    }
    function handleSubmit() {
        fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
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
        setLoginInfo({
            ...loginInfo, [e.target.name]:e.target.value
        })
    }
    return (
        <>
        <br></br>
            <Button onClick={showLogin} size="large" shape="round">Sign In</Button>
            <Modal 
                title="User Login" 
                visible={isLoginVisible}
                onCancel={handleClose}
                onOk={handleClose}
                footer={null}
            >
                {errors.length>0?
                <div>
                    {errors.map((err,index)=>{
                        return (<Alert key={index} message={err} type="error" />)
                    })}
                    <p></p>
                </div>:null}
                <Form
                    name="login"
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

export default Login;
