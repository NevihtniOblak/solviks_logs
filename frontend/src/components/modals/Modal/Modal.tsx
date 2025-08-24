import { motion, AnimatePresence } from "framer-motion";
import classes from "./Modal.module.scss";
import type { ReactNode } from "react";

interface ModalProps {
    closeModal: () => void;
    children: ReactNode;
    width?: string;
    height?: string;
}

export default function Modal({ closeModal, children, width, height }: ModalProps) {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <AnimatePresence>
            <motion.div
                className={classes.blur}
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className={classes.modal}
                    onClick={stopPropagation}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ width, height }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
