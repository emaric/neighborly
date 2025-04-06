import { Card, Container, Badge, Spinner } from "react-bootstrap";

function PostComponent({ post, loadingCommentCount }) {
  if (!post) {
    return (
      <Container className="text-center mt-5">
        <p>Loading post...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By <strong>{post.user.username}</strong>
          </Card.Subtitle>
          <Card.Text className="mt-3">{post.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
          <small>
            Posted on {new Date(Number(post.createdAt)).toLocaleString()}
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
              post.comment_count
            )}{" "}
            comments
          </Badge>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default PostComponent;
