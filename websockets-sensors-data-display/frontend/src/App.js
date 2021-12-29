import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AboutUsScreen from "./screens/AboutUsScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        {/* <Container>
          <h1>Hello Donskytech!</h1>
        </Container> */}
        <Routes>
          <Route exact path="/" element={<HomeScreen />}></Route>
          <Route exact path="/about" element={<AboutUsScreen />}></Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
