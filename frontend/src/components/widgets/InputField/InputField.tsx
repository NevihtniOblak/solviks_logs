import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import classes from "./InputField.module.scss";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
    return <input ref={ref} className={classes.input} {...props} />;
});
