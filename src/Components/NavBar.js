import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "C:/Users/chesh/OneDrive/Desktop/Million/src/index.css";
import Logo from "C:/Users/chesh/OneDrive/Desktop/Million/src/images/Logo.png"

function NavBar() {
  return (
 <>
    <Navbar expand="lg" className="navbar-color">
      <Container fluid>
        <Navbar.Brand href="#"> <img src={Logo} alt="Logo" style={{ width: "100px", height: "auto" }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" style={{fontWeight:"bolder"}}>Home</Nav.Link>
            <Nav.Link href="/Stats" style={{fontWeight:"bolder"}}>Progress</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Button variant="outline-dark">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* <div style={{height:"40px" ,color:"#f9f9f9"}}></div> */}

  </>
  );
}

export default NavBar;

