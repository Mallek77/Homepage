import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import AccessDirect from "./pages/AccessDirect";
import NouvelleMission from "./pages/NouvelleMission";
import PlanningEnCours from "./pages/PlanningEnCours";
import CalendrierPlanning from "./pages/CalendrierPlanning";
import Rapports from "./pages/Rapports";

function App() {
  const action = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/dashboard" element={<AccessDirect />} />
      <Route path="/missions" element={<NouvelleMission />} />
      <Route path="/planning-en-cours" element={<PlanningEnCours />} />
      <Route path="/planning" element={<CalendrierPlanning />} />
      <Route path="/rapports" element={<Rapports />} />
    </Routes>
  );
}

export default App;
