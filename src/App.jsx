import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Details from "./components/Details";
import NotFound from "./components/NotFound";
import "./App.css";

// Nav sta fuori da Routes: resta visibile su tutte le pagine.
function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Home raggiungibile sia dalla radice sia da /home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/* :nome è un parametro dinamico, letto in Details con useParams */}
        <Route path="/details/:nome" element={<Details />} />
        {/* "*" intercetta tutto ciò che non ha combaciato: va tenuta per ultima */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
