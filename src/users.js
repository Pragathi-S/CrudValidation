import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import "bootstrap/dist/js/bootstrap.min.js";
import { Table, Button, Form} from "react-bootstrap";

const API_URL = "https://jsonplaceholder.typicode.com/users";


class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      name: "",
      email: "",
      phone: ""
    };
  }

  componentDidMount = () => this.getUsers();

  getUsers = async () => {
    // API Call to server and get all users
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ users: data });
      console.log(this.state.users);
    } catch (err) {
      console.error(err);
    }
  };

  createUser = async () => {
    // API Call to server and add new user
    try {
      const { name, email, phone } = this.state;
      const { data } = await axios.post(API_URL, {
        name,
        email,
        phone,
      });
      const users = [...this.state.users];
      users.push(data);
      this.setState({ users, name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
    }
  };

  updateUser = async () => {
    // API Call to server and update an existing user
    try {
      const { id, name, email, phone, users } = this.state;
      const { data } = await axios.put(`${API_URL}/${id}`, {
        name,
        email,
        phone,
      });
      const index = users.findIndex((user) => user.id === id);
      users[index] = data;

      this.setState({ users, id: "", name: "", email: "", phone: "" });
    } catch (err) {
      console.log(err);
    }
  };

  deleteUser = async (userID) => {
    // API Call to server and delete user
    try {
      await axios.delete(`${API_URL}/${userID}`);

      let users = [...this.state.users];
      users = users.filter(({ id }) => id !== userID);

      this.setState({ users });
    } catch (err) {
      console.error(err);
    }
  };

  selectUser = (user) => this.setState({ ...user });

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
    if (this.state.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  };

  render() {
    return (
      <div className='m-3 pl-5 pr-5' >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label column sm="2"> Name  &nbsp;</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              minlength="3"
              className="mx-auto"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label column sm="2"> Email  &nbsp;</Form.Label>
            <Form.Control
              type="email"
              size="sm"
              className="mx-auto"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label column sm="2"> Phone  &nbsp;</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              className="mx-auto"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <br></br>
          <br></br>
        </Form>
        <Table hover size="sm">
          <thead>
            <tr>
              <th width="1%" className="text-center">Id</th>
              <th width="30%" className="text-center">Name</th>
              <th width="30%" className="text-center">Email</th>
              <th width="30%" className="text-center">Phone</th>
              <th width="1%" className="text-center" colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.phone}</td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.selectUser(user)}><BsPencil /></Button>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.deleteUser(user.id)}><BsFillTrashFill /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
};



export default Users;
