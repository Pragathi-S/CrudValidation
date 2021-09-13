import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import "bootstrap/dist/js/bootstrap.min.js";
import { Table, Button, Form, Modal} from "react-bootstrap";

const API_URL = "https://jsonplaceholder.typicode.com/posts";


class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: "",
      openModal: false,
      show: false,
      user: [],
      comments: [],
      submitted: false,
      valid: false
    };
  }

  handleShow = () => {
    this.setState({
      show:true
    })
  }

  handleClose= () =>{
    this.setState({
      show:false
    })
  }

  handleShow2 = () => {
    this.setState({
      openModal:true
    })
  }

  handleClose2 = () =>{
    this.setState({
      openModal:false
    })
  }

  componentDidMount = () => this.getPosts();

  getPosts = async () => {
    // API Call to server and get all posts
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ posts: data });
      console.log(this.state.posts)
    } catch (err) {
      console.error(err);
    }
  };
  getUser = async (id) => {
    // API Call to server and get user info
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({ user: data });
      console.log(this.state.user);
    } catch (err) {
      console.error(err);
    }
  };
  getComments = async (postId) => {
    // API Call to server and get all comments
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      this.setState({ comments: data });
      console.log(this.state.comments);
    } catch (err) {
      console.error(err);
    }
  };

  createPost = async () => {
    // API Call to server and add new post
    try {
      const { userId, title, body } = this.state;
      const { data } = await axios.post(API_URL, {
        userId,
        title,
        body,
      });
      const posts = [...this.state.posts];
      posts.push(data);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };

  updatePost = async () => {
    // API Call to server and update an existing post
    try {
      const { id, userId, title, body, posts } = this.state;
      const { data } = await axios.put(`${API_URL}/${id}`, {
        userId,
        title,
        body,
      });
      const index = posts.findIndex((post) => post.id === id);
      posts[index] = data;

      this.setState({ posts, id: "", userId: "", title: "", body: "" });
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (postId) => {
    // API Call to server and delete post
    try {
      await axios.delete(`${API_URL}/${postId}`);

      let posts = [...this.state.posts];
      posts = posts.filter(({ id }) => id !== postId);

      this.setState({ posts });
    } catch (err) {
      console.error(err);
    }
  };

  selectPost = (post) => this.setState({ ...post });

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  //   if(this.state.userId && this.state.title && this.state.body) {
  //     this.setState({valid: true});
  // }
  // this.setState({submitted: true});
  };

  render() {
    const{show} = this.state
    const{openModal} = this.state
    return (
      <div className='m-3 pl-5 pr-5' >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label column sm="2"> UserID  &nbsp;</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              className="mx-auto"
              minlength="1"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
              required
            />
            {/* {this.state.submitted && !this.state.userId && <span id='userId-error'>Enter a User Id !</span>} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label column sm="2"> Title  &nbsp;</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              className="mx-auto"
              minlength="12"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
            {/* {this.state.submitted && this.state.title && <span id='title-error'>Enter a title !</span>} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBody">
            <Form.Label column sm="2"> Body  &nbsp;</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              className="mx-auto"
              minlength="20"
              as="textarea" rows={3}
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              required
            />
            {/* {this.state.submitted && this.state.body && <span id='body-error'>Enter a body !</span>} */}
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
              <th width="1%" className="text-center">UserId</th>
              <th width="10%" className="text-center">Title</th>
              <th width="30%" className="text-center">Body</th>
              <th width="1%" className="text-center" colSpan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td className="text-center">{post.id}</td>
                  <td className="text-center">{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => { this.handleShow(); this.getUser(post.userId); }}><BsFillPersonFill /></Button>
                    <Modal fade={false} animation={false} show={show}  onHide={this.handleClose} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Table hover size="sm">
                          <thead>
                            <tr>
                              <th width="25%" className="text-center">Name</th>
                              <th className="text-center">Email</th>
                              <th width="25%" className="text-center">Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{this.state.user.name}</td>
                              <td className="text-center">{this.state.user.email}</td>
                              <td>{this.state.user.phone}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Modal.Body>
                    </Modal>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => { this.handleShow2(); this.getComments(post.id); }}><BsFillChatSquareDotsFill /></Button>
                    <Modal fade={false} animation={false} show={openModal} onHide={this.handleClose2} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Table hover size="sm">
                          <thead>
                            <tr>
                              <th width="20%" className="text-center">Email</th>
                              <th width="30%" className="text-center">Title</th>
                              <th  className="text-center">Body</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.comments.map((data) => {
                              return (
                                <tr key={data.id}>
                                  <td className="text-center">{data.email}</td>
                                  <td className="text-center">{data.name}</td>
                                  <td>{data.body}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Modal.Body>
                    </Modal>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.selectPost(post)}><BsPencil /></Button>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.deletePost(post.id)}><BsFillTrashFill /></Button>
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



export default Posts;
