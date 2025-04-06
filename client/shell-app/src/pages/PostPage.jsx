import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loader from "../components/UI/Loader";

const Post = lazy(() => import("residentApp/PostRoute"));
const Comments = lazy(() => import("commentApp/PostRoute"));
const GenerateSummaryComponent = lazy(() =>
  import("aiApp/GenerateSummaryComponent")
);

function PostPage() {
  const { postId } = useParams();

  return (
    <Container className="mt-5">
      <Suspense fallback={<Loader />}>
        <Post />
        <div className="mt-4 mb-4">
          <GenerateSummaryComponent postId={postId} />
        </div>
        <Comments />
      </Suspense>
    </Container>
  );
}

export default PostPage;
