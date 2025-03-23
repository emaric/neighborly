import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import UserDetailsComponent from "./components/UserDetailsComponent";
import "./App.css";
const AuthApp = lazy(() => import("authApp/TestAllComponents"));
const BusinessApp = lazy(() => import("businessApp/TestAllComponents"));
const CommentApp = lazy(() => import("commentApp/TestAllComponents"));
const EventApp = lazy(() => import("eventApp/TestAllComponents"));
const ResidentApp = lazy(() => import("residentApp/TestAllComponents"));
const AIApp = lazy(() => import("aiApp/TestAllComponents"));

function App() {
  return (
    <>
      <h1>Creddit</h1>
      <AuthProvider>
        <UserDetailsComponent />
      </AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthApp />
        <BusinessApp />
        <EventApp />
        <ResidentApp />
        <CommentApp />
        <AIApp />
      </Suspense>
    </>
  );
}

export default App;
