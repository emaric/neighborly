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

          {/* <Nav.Link as={Link} to="/help-emergency">
            Help / Emergency
          </Nav.Link> */}

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
