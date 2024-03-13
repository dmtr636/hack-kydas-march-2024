import { observer } from "mobx-react-lite";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "src/app/stores/AppStore.ts";

export const AppRoot = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        onMount();
    }, []);

    const onMount = async () => {
        const isAuthenticated = await store.user.authenticate();
        if (!isAuthenticated) {
            navigate("/auth/login");
        } else if (location.pathname.startsWith("/auth")) {
            navigate("/");
        }
    };

    return <Outlet />;
});
