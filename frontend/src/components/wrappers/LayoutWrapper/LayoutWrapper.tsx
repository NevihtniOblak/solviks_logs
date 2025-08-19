import Sidebar from "../../Sidebar/Sidebar";
import Userbar from "../../Userbar/UserBar";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import classes from "./LayoutWrapper.module.scss";

export default function LayoutWrapper() {
    const userCtx = useContext(UserContext);

    if (!userCtx.user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={classes.container}>
            <Sidebar className={classes.sidebar} />
            <Userbar user={userCtx.user} className={classes.userBar} />
            <div className={classes.pageContent}>
                <Outlet />
            </div>
        </div>
    );
}
