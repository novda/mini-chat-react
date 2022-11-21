import React from "react";
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
    <div className="Message">
        <strong>{messageData.userFrom}</strong>: {messageData.text}
    </div>
  );
};

export default Message;
