import React from "react";
import type { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button className={classes.button} {...props}>
            {children}
        </button>
    );
};
