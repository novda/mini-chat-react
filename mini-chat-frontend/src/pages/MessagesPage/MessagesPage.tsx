import React, { FormEvent, useEffect, useRef, useState } from "react";
import Message from "../../components/Message";
import { Container, Navbar, Row, Col, Form, Button } from "react-bootstrap";
import socket from "../../utils/socket/socket";

import "./MessagesPage.scss";

type Message = {
  id: number;
  userFrom: string;
  text: string;
};

type Props = {
  updateUser: (data: { auth: boolean; username?: string | null }) => void;
};

// const dataUrl = "http://localhost:8000";
const dataUrl = "https://125c-188-186-140-107.ngrok.io"

const MessagesPage: React.FC<Props> = ({ updateUser }) => {
  const [data, setData] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(user?.username);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${dataUrl}/messages/`);
      const data = await res.json();
      setData(data);
    };

    getData();
  }, []);

  const messagesEndRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(scrollToBottom, [data]);

  socket.on("message", (data) => {
    const dataToJson = JSON.parse(data);
    setData(dataToJson);
  });

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    if (message !== "") {
      socket.emit(
        "new_message",
        { userFrom: username, text: message }
      );
    }
    setMessage("");
  }

  function exit() {
    updateUser({ auth: false, username: "" });
  }

  function cleanMessages() {
    fetch(`${dataUrl}/all_messages`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  }

  return (
    <div className="MessagePage">
      <Navbar className="MessagePage-navbar">
        <Container>
          <Navbar.Brand href="/">Mini chat</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div className="MessagePage-navbar-clean" onClick={cleanMessages}>
                Clean
              </div>
            </Navbar.Text>
            <Navbar.Text>
              <div className="MessagePage-navbar-exit" onClick={exit}>
                Exit
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="MessagePage-body">
        <Row className="MessagePage-body-nav shadow-sm">
          <Col xs>#messages</Col>
        </Row>
        <div className="MessagePage-body-data">
          {data.map((message) => (
            <Message key={message.id} messageData={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <Row className="MessagePage-body-form">
          <Col md>
            <Form onSubmit={sendMessage}>
              <Form.Group
                className="mb-3 MessagePage-body-form-group"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Type text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={sendMessage}>
                  Send
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagesPage;
