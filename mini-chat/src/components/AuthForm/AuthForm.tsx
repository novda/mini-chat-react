import React, { FormEvent, useState } from "react";

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
    <form onSubmit={(e) => onSubmit(e)}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AuthForm;
