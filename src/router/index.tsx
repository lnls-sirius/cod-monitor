import {
  Routes,
  Route
} from "react-router-dom";

import OrbitDrift from "../pages/orbitDrift";

export default function RouterNavigator() {
  return (
    <Routes>
        <Route  path="/" element={
            <OrbitDrift />
        }/>
        <Route  path="/bpmDrift" element={
            <OrbitDrift />
        }/>
        <Route  path="/orbitCorrection" element={
            <OrbitDrift />
        }/>
        <Route  path="/orbitDrift" element={
            <OrbitDrift />
        }/>
    </Routes>
  );
}
