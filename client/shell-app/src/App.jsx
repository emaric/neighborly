import { lazy } from "react";
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
      <AuthApp />
      <BusinessApp />
      <CommentApp />
      <EventApp />
      <ResidentApp />
      <AIApp />
    </>
  );
}

export default App;
