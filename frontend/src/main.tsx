import ReactDOM from "react-dom/client";
import { App } from "src/app/components/App.tsx";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
