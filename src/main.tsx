import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateEnv } from "./lib/env";

// Validate environment variables before rendering
validateEnv();

createRoot(document.getElementById("root")!).render(<App />);
