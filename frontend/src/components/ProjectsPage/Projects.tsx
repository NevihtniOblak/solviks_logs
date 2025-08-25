import type { Project } from "../../types/Project";
import { useNavigate } from "react-router";
import { useProjectsQuery } from "../../api/projects/hooks";
import { useState } from "react";
import AddProjectModal from "../modals/content/AddProjectModal/AddProjectModal";
import ProjectCard from "../ProjectCard/ProjectCard";
import classes from "./Projects.module.scss";
import Modal from "../modals/Modal/Modal";

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
                <h1 className={classes.title}>Projects</h1>
                <div className={classes.grid}>
                    <div className={classes.addCard} onClick={handleAddProject}>
                        <span>+</span>
                    </div>

                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onClick={() => {
                                navigate(`/projects/${project._id}`);
                            }}
                        />
                    ))}
                </div>
            </div>

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <AddProjectModal closeModal={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
}
