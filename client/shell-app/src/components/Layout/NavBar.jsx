import { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <Navbar className="p-2 bg-dark-subtle" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Creddit
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <NavDropdown title="News / Discussions" align="end">
            <NavDropdown.Item as={NavLink} to="/posts">
              View Posts
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/posts/new">
              Create Post
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>

          {!!user ? (
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
