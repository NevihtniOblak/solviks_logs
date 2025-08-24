import { AnimatePresence } from "framer-motion";
import { useDeleteProjectMutation } from "../../../../api/projects/hooks";
import { useNavigate } from "react-router-dom";
import classes from "./DeleteProjectModal.module.scss";

interface DeleteProjectModalProps {
    closeModal: () => void;
    projectId: string;
}

export default function DeleteProjectModal({ closeModal, projectId }: DeleteProjectModalProps) {
    const navigate = useNavigate();

    const handleDelete = () => {
        projectDeleteMutation.mutate(projectId);
    };

    const onDeleteProject = () => {
        navigate("/");
        closeModal();
    };

    const projectDeleteMutation = useDeleteProjectMutation({ callback: onDeleteProject });

    return (
        <AnimatePresence>
            <div className={classes.container}>
                <div className={classes.innerModal}>
                    <p className={classes.text}>Are you sure you want to delete this project and all its logs?</p>
                    <div className={classes.buttonWrapper}>
                        <button className={classes.button} onClick={handleDelete}>
                            Yes
                        </button>
                        <button className={classes.button} onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}
