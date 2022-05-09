import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import Domain from "./screens/Domain/Domain";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import Names from "./screens/Names/Names";
import Final from "./screens/Final/Final";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/domain"
          component={({ history }) => (
            <Domain search={search} history={history} />
          )}
        />
        <Route path="/names" component={Names} />;
        <Route path="/final" component={Final} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
    </Router>
  );
}

export default App;
