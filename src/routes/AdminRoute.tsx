import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {logout} from "@store/userActions";
import {paths} from "@routes/paths";

export const AdminRoute = () => {
    const navigate = useNavigate();
    const userState = useSelector((state: any) => state.user);
    const logoutAction = logout();

    useEffect(() => {
        const token = userState?.userInfo?.token;
        if (!token || userState?.userInfo?.admin !== true) { // Use strict equality
            logoutAction;
            navigate(paths.index);
        }
    }, [userState, logoutAction, navigate]);

    return <Outlet />;
}
