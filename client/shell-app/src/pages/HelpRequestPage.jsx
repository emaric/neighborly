import { Container } from "react-bootstrap";
import { Suspense, lazy, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";

const HelpRequest = lazy(() => import("residentApp/HelpRequestRoute"));
const Comments = lazy(() => import("commentApp/HelpRequestRoute"));
const CreateCommentComponent = lazy(() =>
  import("commentApp/CreateCommentComponent")
);

function HelpRequestPage() {
  const { user } = useContext(AuthContext);
  const { helpRequestId } = useParams();
  const [updateKey, setUpdateKey] = useState(0);

  const updateComments = () => {
    setUpdateKey((prev) => prev + 1);
  };

  return (
    <Container className="mt-5">
      <h2>Help Request</h2>
      <Suspense fallback={<Loader />}>
        <HelpRequest/>
        <Container>
          <CreateCommentComponent
            parentId={helpRequestId}
            onSuccess={updateComments}
          />
        </Container>
        <Comments key={updateKey} user={user} />
      </Suspense>
    </Container>
  );
}

export default HelpRequestPage;
