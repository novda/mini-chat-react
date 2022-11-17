import React, { FormEvent, useEffect, useState } from "react";
import Message from "../../components/Message";
import { Container, Navbar, Row, Col, Form, Button } from "react-bootstrap";

import "./MessagesPage.scss";

// type Props = {

// }

const MessagesPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:4000/messages");
      const data = await res.json();
      setData(data);
    };

    getData();
  }, []);

  async function addMessage(userFrom: string, text: string) {
    await fetch("http://localhost:4000/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ userFrom, text }),
    });
  }

  function sendMessage(e: FormEvent) {
    e.preventDefault();
    console.log(message);
  }

  return (
    <div className="MessagePage">
      <Navbar className="MessagePage-navbar">
        <Container>
          <Navbar.Brand href="/chat">Mini chat</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="/chat">Exit</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="MessagePage-body">
        <Row className="MessagePage-body-nav shadow-sm">
          <Col xs>#messages</Col>
        </Row>
        <Row className="MessagePage-body-data">
          {data.map((message) => (
            <Message key={message.id} messageData={message} />
          ))}
        </Row>
        <Row className="MessagePage-body-form">
          <Col md >
            <Form onSubmit={sendMessage}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Type text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs lg="1">
            <Button variant="light" >Send</Button>
          </Col>
        </Row>
      </Container>
      {/* <Message /> */}
    </div>
  );
};

export default MessagesPage;
