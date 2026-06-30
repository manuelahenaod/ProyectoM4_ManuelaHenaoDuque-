import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/routes/AppRoutes";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

