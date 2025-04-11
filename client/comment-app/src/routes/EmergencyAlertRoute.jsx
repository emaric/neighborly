import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentListComponent from "../components/CommentListComponent"; 

function EmergencyAlertRoute({ user }) {
  const {emergencyAlertId} = useParams();  
  
    return (
      <Container>
        <CommentListComponent parentId={emergencyAlertId} user={user} />
      </Container>
    );
  }

export default EmergencyAlertRoute;