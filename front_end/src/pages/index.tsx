import {
  Routes,
  Route
} from "react-router-dom";

import BpmDrift from "./bpmDrift";
import OrbitDrift from "./orbitDrift";

export default function RouterNavigator() {
  // Manage the routing of the pages
  return (
    <Routes>
        <Route  path="/" element={
            <OrbitDrift />
        }/>
        <Route  path="/bpmDrift" element={
            <BpmDrift />
        }/>
        <Route  path="/orbitCorrection" element={
            <BpmDrift />
        }/>
        <Route  path="/orbitDrift" element={
            <OrbitDrift />
        }/>
    </Routes>
  );
}
