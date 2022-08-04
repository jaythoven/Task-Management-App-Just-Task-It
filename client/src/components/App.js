import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  
  // useEffect(() => {
  //   // auto-login
  //   fetch("/api/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // auto-login
    handleCheckLogin()
  }, [])

  const handleCheckLogin = () => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user)
        )
      } else {
        r.json().then((err) => console.log(err))
      }
    })
  };

  if (!user) return (
    <div className="App">
      <Landing onLogin={setUser} />
    </div>
  )
  return (
    <div className="App">
      <Dashboard setUser={setUser} user={user} handleCheckLogin={handleCheckLogin} />
    </div>
  )
}

export default App;
