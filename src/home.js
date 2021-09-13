import React from "react";
import { Figure, Container, Row, Col } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <>
        <Container className="m-5 pt-5">
          <Row>
            <Col className="mt-2">
            <Figure>
            <Figure.Image
              width={580}
              height={580}
              alt="171x180"
              src="https://www.heynic.com/wp-content/uploads/2020/04/splash-dribbble-2048x1503.jpg"
            />
          </Figure>
            </Col>
            <Col className="m-5 pt-5 ">
            <h1 style={{ color: "#0F52BA" }}>CRUD</h1>
            <p style={{ color: "#0F52BA" }}>CRUD is an acronym that comes from the world of computer programming and refers to the four functions that are considered necessary to implement a persistent storage application: create, read, update and delete. The term was likely first popularized by James Martin in his 1983 book Managing the Data-base environment.</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
