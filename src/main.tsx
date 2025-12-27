import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import StoreProvider from "./components/providers/store.provider.tsx";
import { QueryProvider } from "./components/providers/query-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <QueryProvider>
        <App />
        <Toaster />
      </QueryProvider>
    </StoreProvider>
  </BrowserRouter>
);
