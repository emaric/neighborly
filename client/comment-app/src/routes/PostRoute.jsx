import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentListComponent from "../components/CommentListComponent";

function PostRoute({ user }) {
  const { postId } = useParams();

  return (
    <Container>
      <CommentListComponent parentId={postId} user={user} />
    </Container>
  );
}

export default PostRoute;
