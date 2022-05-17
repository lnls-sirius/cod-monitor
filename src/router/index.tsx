import {
  Routes,
  Route
} from "react-router-dom";

import BpmDrift from "../pages/bpmDrift";

export default function RouterNavigator() {
  return (
    <Routes>
        <Route  path="/" element={
            <BpmDrift />
        }/>
        <Route  path="/bpmDrift" element={
            <BpmDrift />
        }/>
        <Route  path="/orbitCorrection" element={
            <BpmDrift />
        }/>
        <Route  path="/orbitDrift" element={
            <BpmDrift />
        }/>
    </Routes>
  );
}
