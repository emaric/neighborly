import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRoute from "./routes/PostRoute";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Comment App</h2>
      <Router>
        <Routes>
          <Route path="/posts/:postId" element={<PostRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
