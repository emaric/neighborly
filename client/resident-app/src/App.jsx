import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostListComponent from "./components/PostListComponent";
import PostRoute from "./routes/PostRoute";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Resident App</h2>
      <Router>
        <Routes>
          <Route path="/" element={<PostListComponent />} />
          <Route path="/post/:postId" element={<PostRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
