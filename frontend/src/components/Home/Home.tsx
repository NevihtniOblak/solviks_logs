import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { useLogoutQuery } from "../../api/auth/hooks";
import classes from "./Home.module.scss";

export default function Home() {
    const [activeSection, setActiveSection] = useState<"projects" | "users">("projects");

    const { refetch: logoutUser } = useLogoutQuery();

    const userCtxt = useContext(UserContext);
    if (!userCtxt.user) {
        return <Navigate to="/login" replace />;
    } else {
        console.log(userCtxt.user);
    }

    const handleLogout = () => {
        userCtxt.setUserContext(null);
        logoutUser();
        return <Navigate to="/login" replace />;
    };

    return (
        <div className={classes.homeContainer}>
            {/*
            <Sidebar active={activeSection} onSelect={setActiveSection} className={classes.sidebar} />
            <UserBar user={userCtxt.user} onLogout={handleLogout} className={classes.userBar} />
            */}

            <div className={classes.mainContent}>
                <div className={classes.pageContent}>
                    {activeSection === "projects" ? <h1>Projects Section</h1> : <h1>Users Section</h1>}
                </div>
            </div>
        </div>
    );
}
