import { Container } from "react-bootstrap";
import { Suspense, lazy, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";

const EmergencyAlert = lazy(() => import("residentApp/EmergencyAlertRoute"));
const Comments = lazy(() => import("commentApp/EmergencyAlertRoute"));
const CreateCommentComponent = lazy(() =>
  import("commentApp/CreateCommentComponent")
);

function EmergencyAlertPage() {
  const { user } = useContext(AuthContext);
  const { emergencyAlertId } = useParams();
  const [updateKey, setUpdateKey] = useState(0);

  const updateComments = () => {
    setUpdateKey((prev) => prev + 1);
  };

  return (
    <Container className="mt-5">
      <h2>Emergency Alert</h2>
      <Suspense fallback={<Loader />}>
        <EmergencyAlert />
        <Container>
          <CreateCommentComponent
            parentId={emergencyAlertId}
            onSuccess={updateComments}
          />
        </Container>
        <Comments key={updateKey} user={user} />
      </Suspense>
    </Container>
  );
}

export default EmergencyAlertPage;
