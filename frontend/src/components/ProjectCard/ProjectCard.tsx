import type { Project } from "../../models/ProjectModel";
import classes from "./ProjectCard.module.scss";

type ProjectCardProps = {
    project: Project;
    onClick?: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <div className={classes.card} onClick={onClick}>
            <div className={classes.iconWrapper}>
                <img src="/images/projectIcon.png" alt={project.name} className={classes.icon} />
            </div>
            <div className={classes.name}>{project.name}</div>
        </div>
    );
}
