import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "src/app/routes/routes.tsx";
import "src/ui/styles/index.scss";

const router = createBrowserRouter(routes);

export const App = () => {
    return <RouterProvider router={router} />;
};
