import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import AuthScreen from "./screens/AuthScreen";
import ChatScreen from "./screens/ChatScreen";
import KickScreen from "./screens/KickScreen";
import SensorChart from "./screens/SensorDataChart";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        {/* <Container>
          <h1>Hello Donskytech!</h1>
        </Container> */}
        <Routes>
          {/* <Route exact path="/" element={<HomeScreen />}></Route> */}
          <Route exact path="/" element={<SensorChart />}></Route>
          {/* <Route exact path="/" element={<AuthScreen />}></Route>
          <Route exact path="/chat/:name" element={<ChatScreen />}></Route>
          <Route path="/kicked" element={<KickScreen />} />
          <Route path="/about" element={<AboutUsScreen />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
