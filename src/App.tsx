import { Route, Routes } from "react-router";
import "./App.css";
import { AuthPage } from "./pages/auth/page/auth-page";
import MainPage from "./pages/main/pages/main-page";
import ProtectedRoute from "./components/routes/route-protecter";

function App() {
  return (
    <main className="w-screen ">
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {" "}
              <MainPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
      </Routes>
    </main>
  );
}

export default App;
