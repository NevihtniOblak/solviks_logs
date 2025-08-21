import type { Project } from "../../types/Project";
import { useNavigate } from "react-router";
import { useProjectsQuery } from "../../api/projects/hooks";
import { useState } from "react";
import AddProjectModal from "../AddProjectModal/AddProjectModal";
import ProjectCard from "../ProjectCard/ProjectCard";

import classes from "./Projects.module.scss";

export default function Projects() {
    const [showModal, setShowModal] = useState(false);

    const handleAddProject = () => {
        setShowModal(true);
    };

    const { data } = useProjectsQuery();
    const projects: Project[] = data ?? [];

    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <h1>Projects</h1>
                <div className={classes.grid}>
                    <div className={classes.addCard} onClick={handleAddProject}>
                        <span>+</span>
                    </div>

                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onClick={() => navigate(`/projects/${project._id}`)}
                        />
                    ))}
                </div>
            </div>

            {showModal && <AddProjectModal closeModal={() => setShowModal(false)} />}
        </div>
    );
}
