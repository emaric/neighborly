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

const LogoutComponent = lazy(() => import("authApp/LogoutComponent"));
const PostListComponent = lazy(() => import("residentApp/PostListComponent"));

const Layout = ({ children }) => (
  <ProtectedRoute>
    <NavBar />
    <main>{children}</main>
  </ProtectedRoute>
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
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/posts"
            element={
              <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                  <PostListComponent />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/logout"
            element={
              <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                  <LogoutComponent onComplete={refetch} />
                </Suspense>
              </Layout>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/posts/:postId"
            element={
              <Layout>
                <PostPage />
              </Layout>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
