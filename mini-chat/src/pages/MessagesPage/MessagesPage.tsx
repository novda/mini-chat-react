import React, { EffectCallback, useEffect, useState } from "react";
import Message from "../../components/Message";
import { Container, Navbar, Row, Col, Form } from "react-bootstrap";

import "./MessagesPage.scss";

// type Props = {

// }

const MessagesPage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:4000/messages");
      const data = await res.json();
      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="Messages">
      <Navbar className="Messages-navbar">
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
      <Container className="Messages-body">
        <Row className="Messages-body-nav shadow-sm">
          <Col xs>#messages</Col>
        </Row>
        <Row className="Messages-body-data">
          {data.map((message) => (
            <Message key={message.id} messageData={message} />
          ))}
        </Row>
        <Row className="Messages-body-form">
          <Col>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" placeholder="Type text" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* <Message /> */}
    </div>
  );
};

export default MessagesPage;
