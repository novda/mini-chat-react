import React from "react";
import { Card } from "react-bootstrap";
import cn from "classnames";
import "./Message.scss";

type Props = {
  messageData: {
    id: number;
    userFrom: string;
    text: string;
  };
};

const Message: React.FC<Props> = ({ messageData }) => {
  return (
    <div className="Messagee">
        <strong>{messageData.userFrom}</strong>: {messageData.text}
    </div>
  );
};

export default Message;
