import React, { Component } from "react";
// import Card from "./card";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavLink, Container, Nav } from "react-bootstrap";
// import "./style.css";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./home";
import Posts from "./posts";
import Users from "./users";
import About from "./about";

class App extends Component {
  render() {
    console.log("App Component Loaded");
    return (
      <BrowserRouter>

        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/home">CRUD using React-Bootstrap</Navbar.Brand>
            <Nav className="justify-content-end">
              <NavLink exact href="/home">Home</NavLink>
              <NavLink exact href="/posts">Posts</NavLink>
              <NavLink exact href="/users">Users</NavLink>
              <NavLink exact href="/about">About</NavLink>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact activeClass="active" path="/" component={Home} />
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
          <Route exact path="/posts" >
            <Posts />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/about" component={About} />
          <Route path="*">
            <p>404 Page !</p>
          </Route>
        </Switch>
        
      </BrowserRouter>
    );
  }
}

export default App;
