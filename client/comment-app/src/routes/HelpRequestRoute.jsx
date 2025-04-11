import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentListComponent from "../components/CommentListComponent"; 

function HelpRequestRoute({ user }) {
  const { helpRequestId } = useParams();  
  
    return (
      <Container>
        <CommentListComponent parentId={helpRequestId} user={user} />
      </Container>
    );
  }

export default HelpRequestRoute;
