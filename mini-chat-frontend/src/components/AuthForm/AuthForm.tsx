import React, { FormEvent, useState } from "react";
import cn from "classnames";
import "./AuthForm.scss";


type Props = {
  updateUser: (data: { auth: boolean; username?: string | null }) => void;
};

const AuthForm: React.FC<Props> = ({ updateUser }) => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState("true");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (name !== "") {
      setIsValid("true");
      updateUser({ auth: true, username: name });
    }
    setIsValid("false");
  }

  return (
    // Small selfmade auth form :)
    <div className="AuthForm">
      <form className="AuthForm-form" onSubmit={(e) => onSubmit(e)}>
        <div
          className={cn("AuthForm-form-title", {
            _noValid: isValid === "false",
          })}
        >
          {isValid === "false" ? "please, enter username" : "username"}
        </div>
        <input
          className={cn("AuthForm-form-input", {
            _noValid: isValid === "false",
          })}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
        />
        <input
          className="AuthForm-form-submit"
          type="submit"
          value="Start chat!"
        />
      </form>
    </div>
  );
};

export default AuthForm;
