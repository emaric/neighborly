import { Card, Container, Badge, Spinner } from "react-bootstrap";

function HelpRequestComponent({ helpRequest, loadingCommentCount }) {
  if (!helpRequest) {
    return (
      <Container className="text-center mt-5">
        <p>Loading help request...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>{helpRequest.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By <strong>{helpRequest.user.username}</strong>
          </Card.Subtitle>
          <Card.Text className="mt-3">{helpRequest.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
          <small>
            Requested on {new Date(Number(helpRequest.createdAt)).toLocaleString()}
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
              helpRequest.comment_count
            )}{" "}
            comments
          </Badge>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default HelpRequestComponent;
