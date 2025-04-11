import { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import Loader from "../components/UI/Loader";

const CreateHelpRequestComponent = lazy(() => import("residentApp/CreateHelpRequestComponent"));
const CreateEmergencyAlertComponent = lazy(() => import("residentApp/CreateEmergencyAlertComponent"));

function HelpAndEmergencyPage() {
  return (
    <Container className="mt-5">
      <h2>Request Help or Send Emergency Alert</h2>
      <Suspense fallback={<Loader />}>
        <CreateHelpRequestComponent />
        <hr />
        <CreateEmergencyAlertComponent />
      </Suspense>
    </Container>
  );
}

export default HelpAndEmergencyPage;

