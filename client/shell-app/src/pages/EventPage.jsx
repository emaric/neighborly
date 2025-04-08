import { Suspense } from "react";
import { lazy } from "react";
import { Container } from "react-bootstrap";
import Loader from "../components/UI/Loader";

const Event = lazy(() => import("eventApp/EventRoute"));

function EventPage() {
  return (
    <Container>
      <Suspense fallback={<Loader />}>
        <Event />
      </Suspense>
    </Container>
  );
}

export default EventPage;
