import { Card, Container, Badge } from "react-bootstrap";

function PostComponent({ post }) {
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
          <small>Posted on {new Date(post.createdAt).toLocaleString()}</small>
          <Badge bg="secondary">{post.comment_count} comments</Badge>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default PostComponent;
