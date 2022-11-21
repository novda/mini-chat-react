import React, { useState, useEffect, createContext } from "react";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import MessagesPage from "./pages/MessagesPage";

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
      {user?.auth ? (
        <MessagesPage updateUser={updateUser} />
      ) : (
        <AuthForm updateUser={updateUser} />
      )}
    </div>
  );
}

export default App;
