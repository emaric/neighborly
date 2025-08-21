import { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/Layout/NavBar";
import TestAllComponents from "./pages/TestAllComponents";
import HomePage from "./pages/HomePage";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./contexts/AuthContext";
import LoginComponent from "./components/LoginComponent";
import PostPage from "./pages/PostPage";
import Loader from "./components/UI/Loader";
import EventPage from "./pages/EventPage";

import HelpRequestPage from "./pages/HelpRequestPage";
import EmergencyAlertPage from "./pages/EmergencyAlertPage";
import EmergencyAlertListComponent from "../../resident-app/src/components/EmergencyAlertListComponent";
import HelpRequestListComponent from "../../resident-app/src/components/HelpRequestListComponent";


const LogoutComponent = lazy(() => import("authApp/LogoutComponent"));
const SignUpComponent = lazy(() => import("authApp/SignUpComponent"));
const PostListComponent = lazy(() => import("residentApp/PostListComponent"));
const CreatePostComponent = lazy(() =>
  import("residentApp/CreatePostComponent")
);
const EventListComponent = lazy(() => import("eventApp/EventListComponent"));
const CreateHelpRequestComponent = lazy(() => import("residentApp/CreateHelpRequestComponent"));
const CreateEmergencyAlertComponent = lazy(() => import("residentApp/CreateEmergencyAlertComponent"));


const Layout = ({ children }) => (
  <>
    <NavBar />
    <main className="mt-4">{children}</main>
  </>
);

const PostListRoute = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <PostListComponent />
      </Suspense>
    </Layout>
  );
};

function App() {
  const { refetch } = useContext(AuthContext);

  return (
    <Router>
      <Container fluid className="p-0">
        <Routes>
          <Route path="/test" element={<TestAllComponents />} />
          <Route path="/" element={<PostListRoute />} />
          <Route path="/posts" element={<PostListRoute />} />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<Loader />}>
                    <Container>
                      <h2>Create Post</h2>
                      <CreatePostComponent />
                    </Container>
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <Suspense fallback={<Loader />}>
                  <EventListComponent />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-requests"
            element={
              <ProtectedRoute>
                <Layout>
                  <HelpRequestListComponent/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-requests/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <Container className="mt-5">
                    <h2>Create Help Request</h2>
                    <Suspense fallback={<Loader />}>
                      <CreateHelpRequestComponent />
                    </Suspense>
                  </Container>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-requests/:helpRequestId"
            element={
              <ProtectedRoute>
                <Layout>
                  <HelpRequestPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency-alerts"
            element={
              <ProtectedRoute>
                <Layout>
                  <EmergencyAlertListComponent/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency-alerts/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <Container className="mt-5">
                    <h2>Create Emergency Alert</h2>
                    <Suspense fallback={<Loader />}>
                      <CreateEmergencyAlertComponent />
                    </Suspense>
                  </Container>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency-alerts/:emergencyAlertId"
            element={
              <ProtectedRoute>
                <Layout>
                  <EmergencyAlertPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <Layout>
                <Suspense fallback={<Loader />}>
                  <LogoutComponent onComplete={refetch} />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginComponent />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUpComponent />
              </Layout>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <ProtectedRoute>
                <Layout>
                  <PostPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
