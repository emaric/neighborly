import PostListComponent from "./components/PostListComponent";
import CreatePostComponent from "./components/CreatePostComponent";
import CreateHelpRequestComponent from "./components/CreateHelpReqComponent";
import CreateEmergencyAlertComponent from "./components/CreateEmergAlertComponent";
import EmergencyAlertListComponent from "./components/EmergencyAlertListComponent";
import HelpRequestListComponent from "./components/HelpRequestListComponent"; 
import "./App.css";

function App() {
  return (
    <div>
      <h2>Resident App</h2>
      <CreatePostComponent />
      <CreateHelpRequestComponent />
      <CreateEmergencyAlertComponent />
      <PostListComponent />
      <EmergencyAlertListComponent />
      <HelpRequestListComponent />
    </div>
  );
}

export default App;
