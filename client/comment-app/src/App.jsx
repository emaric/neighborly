import PostRoute from "./routes/PostRoute";
import "./App.css";
import CreateCommentComponent from "./components/CreateCommentComponent";

function App() {
  return (
    <div>
      <h2>Comment App</h2>
      <PostRoute />
      <CreateCommentComponent />
    </div>
  );
}

export default App;
