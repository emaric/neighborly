import { useState } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import Loader from "./UI/Loader";

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

function LogoutComponent({ onComplete }) {
  const [logout, { loading }] = useMutation(LOGOUT);
  const [messages, setMessages] = useState([]);

  const handleLogout = async () => {
    setMessages([]);

    try {
      const { data } = await logout();

      if (data.logout) {
        setMessages([{ variant: "success", text: "Logout successful!" }]);
        if (onComplete) {
          onComplete();
        }
      } else {
        setMessages([{ variant: "danger", text: "Logout failed!" }]);
      }
    } catch (error) {
      setMessages((m) => [...m, { variant: "danger", text: error.message }]);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Logout</h1>
      {loading && <Loader />}
      {messages.map(
        (msg, index) =>
          msg.text && (
            <Alert key={index} variant={msg.variant}>
              {msg.text}
            </Alert>
          )
      )}
      <Button variant="danger" onClick={handleLogout} disabled={loading}>
        Logout
      </Button>
    </Container>
  );
}

export default LogoutComponent;
