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

const LogoutComponent = lazy(() => import("authApp/LogoutComponent"));
const PostListComponent = lazy(() => import("residentApp/PostListComponent"));
const CreatePostComponent = lazy(() =>
  import("residentApp/CreatePostComponent")
);
const EventListComponent = lazy(() => import("eventApp/EventListComponent"));

const Layout = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
  </>
);

function App() {
  const { refetch } = useContext(AuthContext);

  return (
    <Router>
      <Container fluid className="p-0">
        <Routes>
          <Route path="/test" element={<TestAllComponents />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<Loader />}>
                    <PostListComponent />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
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
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<Loader />}>
                    <EventListComponent />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          ></Route>
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
