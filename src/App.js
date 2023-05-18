import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import React, { useEffect, useState } from "react";
import TaskPage from "./containers/TaskPage";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [user, setUser] = useState();

  useEffect(() => {
    // console.log("app apge user!", user.id);
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="App">
      {/* {!!user ? "redirecting" : "nullski"} */}
      {loggedIn ? (
        <React.Fragment>
          {/* <div> Logout</div> */}
          <br />
          <TaskPage user={user} />
        </React.Fragment>
      ) : currentForm == "login" ? (
        <Login setUser={setUser} onFormSwitch={toggleForm} />
      ) : (
        <Register setUser={setUser} onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
