import React, { useState, useEffect } from "react";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import MessagesPage from "./pages/MessagesPage";
import { Provider } from "react-redux";
import messages from "./utils/api";

import store from "./redux/store";

type UserData = {
  auth: boolean;
  username?: string | null;
};

function App() {
  const [user, setUser] = useState<UserData | null>({
    auth: false,
    username: null,
  });

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.keys(getUser).length !== 0) {
      setUser(getUser);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  function updateUser(data: UserData): void {
    setUser({ ...user, ...data });
    localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
  }

  return (
    <div className="App">
      <Provider store={store}>
        {user?.auth ? (
          <MessagesPage fetchMessages={messages} updateUser={updateUser} />
        ) : (
          <AuthForm updateUser={updateUser} />
        )}
      </Provider>
    </div>
  );
}

export default App;
