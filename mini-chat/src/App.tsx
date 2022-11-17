import { useState, useEffect } from "react";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import MessagesPage from "./pages/MessagesPage";

function App() {
  const [isAuth, setIsAuth] = useState("false");

  useEffect(() => {
    const getAuth: string | null = localStorage.getItem("auth");
    if (getAuth) {
      setIsAuth(getAuth);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth]);

  return (
    <div className="App">
      {isAuth === "false" ? (
        <AuthForm setIsAuth={setIsAuth} />
      ) : (
        <MessagesPage />
      )}
    </div>
  );
}

export default App;
