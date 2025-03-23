import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentListComponent from "../components/CommentListComponent";

function PostRoute() {
  const { postId } = useParams();

  return (
    <Container>
      <CommentListComponent parentId={postId} />
    </Container>
  );
}

export default PostRoute;
