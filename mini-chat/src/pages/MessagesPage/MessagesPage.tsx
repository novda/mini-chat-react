import React, { FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import Message from "../../components/Message";
import { Container, Navbar, Row, Col, Form, Button } from "react-bootstrap";
import { MessageActions } from "../../redux/actions";
import store from "../../redux/store";

import "./MessagesPage.scss";

type Message = {
  id: number;
  userFrom: string;
  text: string;
};

type Props = {
  updateUser: (data: { auth: boolean; username?: string | null }) => void;
  fetchMessages: () => any;
};

const dataUrl = "http://localhost:4000";

const MessagesPage: React.FC<Props> = ({ updateUser, fetchMessages }) => {
  const [data, setData] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(user?.username);
  }, []);

  store.subscribe(() => {
    setData(store.getState().messages.messages);
    console.log(store.getState().messages.messages)
  });


  useEffect(() => {
    fetchMessages();
  }, []);

  async function addMessage() {
    await fetch(`${dataUrl}/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ userFrom: username, text: message }),
    });
    fetchMessages();
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    if(message !== ""){
        setMessage("");
        addMessage();
    }
    return
  }

  function exit() {
    updateUser({ auth: false, username: "" });
  }

  return (
    <div className="MessagePage">
      <Navbar className="MessagePage-navbar">
        <Container>
          <Navbar.Brand href="/">Mini chat</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
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
      {/* <Message /> */}
    </div>
  );
};

export default connect(
  ({ messages }) => messages,
  MessageActions
)(MessagesPage);
