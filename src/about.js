import { Image, Card } from 'react-bootstrap'

function About(props) {
  console.log(props);
  return (
    <>
      <div className="m-5 pt-5">
        <Card className="text-center" border="secondary">
          <Card.Header><Image width={100} height={100} src="https://wce.education/wp-content/uploads/2020/09/wce-avatar.png" roundedCircle /></Card.Header>
          <Card.Body>
            <Card.Title>Pragathi S</Card.Title>
            <Card.Text className="text-muted">
              Student (Full Stack Development) at GUVI Geek Networks, IITM Research Park.
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <blockquote className="blockquote mb-0">
              <h6>
                Never stop fighting until you arrive at your destined place - that is, the unique you. 
                Have an aim in life, continuously acquire knowledge, work hard, and have perseverance to realise the great life.
              </h6>
              <footer className="blockquote-footer"><h6>Dr. A.P.J Abdul Kalam</h6></footer>
            </blockquote>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default About;
