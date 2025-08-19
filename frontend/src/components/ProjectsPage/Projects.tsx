import ProjectCard from "../ProjectCard/ProjectCard";
import classes from "./Projects.module.scss";
import type { Project } from "../../models/ProjectModel";

const hardcodedProjects: Project[] = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" },
    { id: "3", name: "Project C" },
];

export default function Projects() {
    const handleAddProject = () => {
        console.log("Add new project clicked");
    };

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <h1>Projects</h1>
                <div className={classes.grid}>
                    <div className={classes.addCard} onClick={handleAddProject}>
                        <span>+</span>
                    </div>

                    {hardcodedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onClick={() => console.log(project.id)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
