
import './App.css';
import Header from "./components/Header"
import ChatForm from "./components/ChatForm"
import ChatOutput from "./components/ChatOutput"

function App() {
  return (
    <div className="App">
      <Header/>
      <ChatForm/>
      <ChatOutput/>
    </div>
  );
}

export default App;
