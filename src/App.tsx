import { Route, Routes } from "react-router";
import "./App.css";
import { AuthPage } from "./pages/auth/page/auth-page";
import MainPage from "./pages/main/pages/main-page";
import ProtectedRoute from "./components/routes/route-protecter";
import { ConfrimationPage } from "./pages/confirmation-email/page/confirmation-email-page";
import { AccountDefinitionPage } from "./pages/account-definition/page/account-definition-page";
import { CreateBusinessPage } from "./pages/create-business/page/create-business-page";
import { CreateProfessionalPage } from "./pages/create-professional/page/create-professional-page";
import { PoolPage } from "./pages/pool/page/pool-page";
import { MasterRouteProtector } from "./components/routes/master-route";
import { AdminPage } from "./pages/admin/pages/admin-page";

function App() {
  return (
    <main className="w-screen h-screen ">
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

        <Route
          path="/pool"
          element={
            <ProtectedRoute>
              {" "}
              <PoolPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <MasterRouteProtector>
              {" "}
              <AdminPage />{" "}
            </MasterRouteProtector>
          }
        />
        <Route path="/account-definition" element={<AccountDefinitionPage />} />
        <Route path="/create-business" element={<CreateBusinessPage />} />
        <Route
          path="/create-professional"
          element={<CreateProfessionalPage />}
        />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route path="/confirmation" element={<ConfrimationPage />} />
        <Route
          path="/reset-password"
          element={<AuthPage type="reset-password" />}
        />
      </Routes>
    </main>
  );
}

export default App;
