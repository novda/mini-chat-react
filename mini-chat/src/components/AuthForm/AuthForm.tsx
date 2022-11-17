import React, { FormEvent, useState } from "react";
import "./AuthForm.scss";

type Props = {
  setIsAuth: (value: string) => void;
};

const AuthForm: React.FC<Props> = ({ setIsAuth }) => {
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsAuth("true");
  }

  return (
    // Selfmade auth form :)
    <div className="AuthForm">
      <form className="AuthForm-form" onSubmit={(e) => onSubmit(e)}>
      username
        <input
          className="AuthForm-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className="AuthForm-form-submit" type="submit" value="Go Chat!" />
      </form>
    </div>
  );
};

export default AuthForm;
