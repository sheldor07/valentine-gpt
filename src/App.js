
import './App.css';
import Header from "./components/Header"
import ChatForm from "./components/ChatForm"
import ChatOutput from "./components/ChatOutput"
import Footer from "./components/Footer"
function App() {
  return (
    <div className="App">
      <Header/>
      <ChatForm/>
      <ChatOutput/>
      <Footer/>
    </div>
  );
}

export default App;
