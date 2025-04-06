import PostListComponent from "./components/PostListComponent";
import CreatePostComponent from "./components/CreatePostComponent";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Resident App</h2>
      <CreatePostComponent />
      <PostListComponent />
    </div>
  );
}

export default App;
