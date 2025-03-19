import { useState } from "react";
import { Container, Button, Nav } from "react-bootstrap";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import LogoutComponent from "./components/LogoutComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <Container className="text-center mt-4">
      <h2>Auth App</h2>
      <p>Click a button to show the corresponding component</p>
      <Nav className="justify-content-center mb-3">
        <Nav.Item>
          <Button
            variant="outline-primary"
            onClick={() =>
              activeComponent === "login"
                ? setActiveComponent()
                : setActiveComponent("login")
            }
            className="m-2"
          >
            Login
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="outline-success"
            onClick={() =>
              activeComponent === "signup"
                ? setActiveComponent()
                : setActiveComponent("signup")
            }
            className="m-2"
          >
            Sign Up
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="outline-danger"
            onClick={() =>
              activeComponent === "logout"
                ? setActiveComponent()
                : setActiveComponent("logout")
            }
            className="m-2"
          >
            Logout
          </Button>
        </Nav.Item>
      </Nav>
      <div>
        {activeComponent === "login" && <LoginComponent />}
        {activeComponent === "signup" && <SignUpComponent />}
        {activeComponent === "logout" && <LogoutComponent />}
      </div>
    </Container>
  );
}

export default App;
