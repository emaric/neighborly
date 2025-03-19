import { useContext } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import Loader from "./UI/Loader";
import AuthContext from "../contexts/AuthContext";

function UserDetailsComponent() {
  const { user, error, loading, refetch } = useContext(AuthContext);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">User Details</h1>
      {loading && <Loader />}
      {error && <Alert variant="danger">Error: {error.message}</Alert>}
      {user ? (
        <Alert variant="success">
          Logged in as: <strong>{user.username}</strong> (<em>{user.role}</em>)
        </Alert>
      ) : (
        !loading && <Alert variant="warning">No user details found.</Alert>
      )}
      <Button variant="primary" onClick={() => refetch()}>
        Refresh
      </Button>
    </Container>
  );
}

export default UserDetailsComponent;
