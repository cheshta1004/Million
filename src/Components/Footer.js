import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <Card>
      <Card.Body style={{backgroundColor:"#EBEBD3" ,fontFamily:"serif"}}>
        <Card.Title>Let's thrive and advance together.</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="outline-dark">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Footer;

// 