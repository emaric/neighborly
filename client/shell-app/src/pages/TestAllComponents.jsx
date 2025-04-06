import { lazy, Suspense } from "react";
import UserDetailsComponent from "../components/UserDetailsComponent";

const AuthApp = lazy(() => import("authApp/TestAllComponents"));
const BusinessApp = lazy(() => import("businessApp/TestAllComponents"));
const CommentApp = lazy(() => import("commentApp/TestAllComponents"));
const EventApp = lazy(() => import("eventApp/TestAllComponents"));
const ResidentApp = lazy(() => import("residentApp/TestAllComponents"));
const AIApp = lazy(() => import("aiApp/TestAllComponents"));

function TestAllComponents() {
  return (
    <>
      <h1>Creddit</h1>
      <UserDetailsComponent />
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

export default TestAllComponents;
