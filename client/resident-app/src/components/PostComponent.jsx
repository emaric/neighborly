import { Card, Container, Placeholder } from "react-bootstrap";
import UsernameComponent from "./UsernameComponent";
import CommentCountComponent from "./CommentCountComponent";

function PostComponent({ post }) {
  if (!post) {
    return (
      <Container>
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="wave">
              <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={10} /> <Placeholder xs={8} /> <Placeholder xs={6} />
            </Placeholder>
          </Card.Body>
          <Card.Footer className="text-muted d-flex justify-content-between align-items-center">

            <Placeholder as="span" animation="wave">
              <Placeholder xs={7} />
            </Placeholder>

            <Placeholder as="span" animation="wave">
              <Placeholder xs={7} />
            </Placeholder>

          </Card.Footer>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <UsernameComponent userId={post.userId} />
          </Card.Subtitle>
          <Card.Text className="mt-3">{post.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
          <small>
            Posted on {new Date(Number(post.createdAt)).toLocaleString()}
          </small>
          <CommentCountComponent parentId={post.id} />
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default PostComponent;
