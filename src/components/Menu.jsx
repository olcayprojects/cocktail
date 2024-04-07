import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#/">TheCocktailDB</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#/">Home</Nav.Link>
          <Nav.Link href="#/Categories">Categories</Nav.Link>
          <Nav.Link href="#/Glases">Glases</Nav.Link>
          <Nav.Link href="#/Ingredients">Ingredients</Nav.Link>
          <Nav.Link href="#/Random">Random</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
