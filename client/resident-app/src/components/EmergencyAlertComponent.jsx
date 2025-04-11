import { Card, Container, Badge, Spinner } from "react-bootstrap";

function EmergencyAlertComponent({ emergencyAlert, loadingCommentCount }) {
  if (!emergencyAlert) {
    return (
      <Container className="text-center mt-5">
        <p>Loading emergency alert...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>Emergency Alert</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By <strong>{emergencyAlert.user?.username || "Unknown"}</strong>
          </Card.Subtitle>
          <Card.Text className="mt-3">{emergencyAlert.message}</Card.Text>
          <Card.Text className="text-muted">
            Location: {emergencyAlert.location || "Not specified"} <br />
            Urgency Level: {emergencyAlert.urgencyLevel || "N/A"}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
          <small>
            Alert issued on{" "}
            {new Date(Number(emergencyAlert.createdAt)).toLocaleString()}
          </small>
          <Badge bg="secondary">
            {loadingCommentCount ? (
              <Spinner
                as="span"
                animation="border"
                style={{ width: "0.8rem", height: "0.8rem" }}
                role="status"
                aria-hidden="true"
                className="me-1"
              />
            ) : (
              emergencyAlert.comment_count
            )}{" "}
            comments
          </Badge>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default EmergencyAlertComponent;
