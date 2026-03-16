import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FightPage from "./pages/Fightpage";
import Glossary from "./pages/Terminology";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fight/:fightId" element={<FightPage />} />
        <Route path="/terminology" element={<Glossary />} />
      </Routes>
    </HashRouter>
  );
}
