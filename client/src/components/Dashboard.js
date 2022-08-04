import React, {useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Routes, Route, Link } from "react-router-dom";
import CurrentTasks from './CurrentTasks';
import NewTask from './NewTask';
import CompletedTasks from './CompletedTasks';
import Profile from './Profile';
import Clock from 'react-live-clock';
import MovingText from 'react-moving-text';

const { Header, Content, Sider } = Layout;

function Dashboard({ setUser, user, handleCheckLogin }) {
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(tasks.length)
    
    function handleLogoutClick() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        })}

    useEffect(()=>{
        fetch('/api/tasks').then(r=>r.json()).then(data=>{

            // console.log(data)
            
            // setTasks(data)
            let incomplete_tasks = data.filter(task=>{
                return task.completed!==true
            })
            setTasks(incomplete_tasks)
            setCount(incomplete_tasks.length)
        })


        // let incomplete_tasks = tasks.filter(task=>{
        //     return task.completed!==true
        // })
    
        // setTasks(incomplete_tasks)
    },[])
    
    
    // console.log(tasks.length)
    
    return (
        <Layout className="box">
            <Header className='header'>
                <div className="header-title">
                <MovingText id="movingheader" type="typewriter"
                    dataText={[
                        'Just',
                        'Task',
                        'It',
                    ]} />
                    {/* <h1>Just Task It, {user.username}!</h1> */}
                </div>
            </Header>
            <Layout>
                <Sider width={800} id="sidebar">
                    <Menu mode="inline">
                        <h1><Menu.Item key={0} disabled icon="">Hey, {user.username}!</Menu.Item></h1>
                        <p>It's <Clock format={'dddd, MMMM DD, YYYY'} ticking={true} timezone={'US/Eastern'}/></p>
                        <p>The time is <Clock format={'h:mm:ss A'} ticking={true} timezone={'US/Eastern'}/></p>
                        <br></br>
                        <p></p>
                        <Button key={1} id="sidebar-btn">
                            <Link to="/new">
                                New Task
                            </Link>
                        </Button>
                        <p></p>
                        <Button key={2} id="sidebar-btn">
                            <Link to="/">
                                Unfinished Tasks
                            </Link>
                        </Button>
                        <p></p>
                        <Button key={3} id="sidebar-btn">
                            <Link to="/completed">
                                Completed Tasks
                            </Link>
                        </Button>
                        <p></p>
                        <Button key={4} id="sidebar-btn">
                            <Link to="/profile">
                                My Profile
                            </Link>
                        </Button>
                        <p></p>
                        <Button key={5} onClick={handleLogoutClick} size="large" shape="round" id="logout-btn" danger>Logout</Button>
                    </Menu>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                    <h2>
                    <MovingText
                        type="bounce"
                        duration="2000ms"
                        delay="index * 400ms"
                        direction="normal"
                        timing="ease"
                        iteration="infinite"
                        fillMode="none">
                        {count}
                    </MovingText>task(s) to complete</h2>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="footer">
                    <p>Just Task It™</p>
                    </div>
                </Sider>
            <Layout>
                <Content id='content'>
                    <Routes>
                        <Route path="/new" element={<NewTask curr_user={user} setTasks={setTasks} tasks={tasks} count={count} setCount={setCount}/>}></Route>
                        <Route path="/" element={<CurrentTasks user={user} count={count} setCount={setCount}/>}></Route>
                        <Route path="/completed" element={<CompletedTasks user={user} />}></Route>
                        <Route path="/profile" element={<Profile user={user} setUser={setUser} handleCheckLogin={handleCheckLogin} handleLogoutClick={handleLogoutClick} />}></Route>
                    </Routes>
                </Content>
            </Layout>
            </Layout>
        </Layout>
    )
}

export default Dashboard;
