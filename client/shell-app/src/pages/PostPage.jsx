import { Suspense, lazy, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loader from "../components/UI/Loader";
import AuthContext from "../contexts/AuthContext";

const Post = lazy(() => import("residentApp/PostRoute"));
const Comments = lazy(() => import("commentApp/PostRoute"));
const GenerateSummaryComponent = lazy(() =>
  import("aiApp/GenerateSummaryComponent")
);
const CreateCommentComponent = lazy(() =>
  import("commentApp/CreateCommentComponent")
);

function PostPage() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [updateKey, setUpdateKey] = useState(0);

  const updateComments = () => {
    setUpdateKey((prev) => prev + 1);
  };

  return (
    <Container className="mt-5">
      <Suspense fallback={<Loader />}>
        <Post />
        <GenerateSummaryComponent postId={postId} />
        <Container>
          <CreateCommentComponent
            parentId={postId}
            onSuccess={updateComments}
          />
        </Container>
        <Comments key={updateKey} user={user} />
      </Suspense>
    </Container>
  );
}

export default PostPage;
