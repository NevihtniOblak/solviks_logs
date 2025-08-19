import { motion } from "framer-motion";
import { Routes } from "../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.scss";

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const sections = [
        { key: "projects" as const, path: Routes.PROJECTS.route },
        { key: "users" as const, path: Routes.USERS.route },
    ];

    const currentPath = location.pathname === "/" ? Routes.PROJECTS.route : location.pathname;
    const activeIndex = sections.findIndex((s) => currentPath.startsWith(s.path));
    return (
        <div className={`${classes.container} ${className}`}>
            <div className={classes.top}></div>

            <div className={classes.buttons}>
                <motion.div
                    className={classes.highlight}
                    initial={false}
                    animate={{ top: activeIndex * 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button className={classes.iconButton} onClick={() => navigate(Routes.PROJECTS.route)}>
                    <img src="/images/projectIcon.png" alt="Projects" className={classes.icon} />
                </button>

                <button className={classes.iconButton} onClick={() => navigate(Routes.USERS.route)}>
                    <img src="/images/usersIcon.png" alt="Users" className={classes.icon} />
                </button>
            </div>
        </div>
    );
}
