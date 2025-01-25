import { Route, Routes } from "react-router";
import "./App.css";
import { AuthPage } from "./pages/auth/page/auth-page";
import MainPage from "./pages/main/pages/main-page";
import ProtectedRoute from "./components/routes/route-protecter";
import { ConfrimationPage } from "./pages/confirmation-email/page/confirmation-email-page";

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
        <Route path="/confirmation" element={<ConfrimationPage />} />
      </Routes>
    </main>
  );
}

export default App;
