import { Space } from 'antd';
import ParticlesBg from 'particles-bg'
import Login from './Login';
import Registration from './Registration';

function Landing({ onLogin }) {

    return (
        <>
            <div id="landing">
                <img src="https://media2.giphy.com/media/JsiCJW3cVvKmLzYhWu/giphy.gif?cid=790b761189d444fd33b7773553a327fc2420d7c568f4ebbc&rid=giphy.gif&ct=s" alt="running-man" />
                <h1>
                Just Task It
                </h1>
                <div className="landing-subtitle">
                    <p>Because remembering to get things done is only half the battle</p>
                </div>
                <br></br>
                <br></br>
                <Space direction="vertical">
                    <Login onLogin={onLogin} />
                    <br></br>
                    <Registration onLogin={onLogin} />
                </Space>
            </div>
            <ParticlesBg type="square" bg={true} />
        </>
    )
}

export default Landing;
