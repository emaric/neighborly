import { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Neighborly</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
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

          {user?.role === "Resident" && (
            <>
              <NavDropdown title="Help Requests" align="end">
                <NavDropdown.Item as={NavLink} to="/help-requests">
                  View Help Requests
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/help-requests/new">
                  Create Help Request
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Emergency Alerts" align="end">
                <NavDropdown.Item as={NavLink} to="/emergency-alerts">
                  View Emergency Alerts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/emergency-alerts/new">
                  Create Emergency Alert
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          </Nav>
          <>
            {!!user ? (
              <Button variant="outline-danger" href="/logout">Logout</Button>
            ) : (
              <div className="d-flex">
                <Button variant="outline-success me-2" href="/login">Login</Button>
                <Button variant="outline-primary" href="/signup">Join</Button>
              </div>
            )}
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
