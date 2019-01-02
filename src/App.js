import React, { Component } from "react";
import {
  Collapse,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormText,
  Table
} from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    collapse: false,
    toggleText: "버튼을 누르면 창이 닫힙니다.",
    userInfo: { name: "", email: "" },
    userList: [
      { name: "runningWater", email: "runningWater@example.com" },
      { name: "anonymous", email: "anonymous@example.com" },
      { name: "anonymous1", email: "anonymous1@example.com" },
      { name: "anonymous2", email: "anonymous2@example.com" }
    ]
  };
  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  onEntered = () => {
    this.setState({
      toggleText: "버튼을 누르면 창이 닫힙니다."
    });
  };
  onExited = () => {
    this.setState({
      toggleText: "버튼을 누르면 창이 열립니다."
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.state.userList.push(this.state.userInfo);
    this.setState({
      userInfo: { name: "", email: "" }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const userInfo = { ...this.state.userInfo, [name]: value };
    this.setState({
      userInfo
    });
  };
  handleDelete = e => {
    const { userList } = this.state;
    const tr = e.target.parentElement.parentElement;
    const index = Number(tr.id);
    const startArr = userList.slice(0, index);
    const endArr = userList.slice(index + 1);
    this.setState({
      userList: [...startArr, ...endArr]
    });
  };
  render() {
    const { userList } = this.state;
    const { name, email } = this.state.userInfo;
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Toggle
        </Button>
        <h5>{this.state.toggleText}</h5>
        <Collapse
          isOpen={this.state.collapse}
          onEntered={this.onEntered}
          onExited={this.onExited}
        >
          <Form>
            <FormGroup>
              <Row>
                <Label for="Name" xs={2}>
                  Name
                </Label>
                <Col xs={9}>
                  <Input
                    type="text"
                    name="name"
                    id="Name"
                    placeholder="Write your name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <FormText>My name is running water</FormText>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label for="Email" xs={2}>
                  Email
                </Label>
                <Col xs={9}>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Write your Email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <FormText>My Email is runningwater@exmaple.co</FormText>
            </FormGroup>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Collapse>
        <Table dark className="table">
          <tbody>
            {userList.map((user, index) => (
              <tr id={index} key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button color="danger" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
