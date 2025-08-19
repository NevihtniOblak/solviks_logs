import { useRef } from "react";
import type { FormEvent } from "react";
import { useLoginMutation } from "../../api/auth/hooks";
import classes from "./Login.module.scss";

export default function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginMutation = useLoginMutation({ usernameRef, passwordRef });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!usernameRef.current || !passwordRef.current) return;

        loginMutation.mutate({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.leftContainer}></div>

            <div className={classes.rightContainer}>
                <h1 className={classes.title}>Login</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formGroup}>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            className={classes.input}
                            ref={usernameRef}
                            required
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className={classes.input}
                            ref={passwordRef}
                            required
                        />
                    </div>

                    <button type="submit" className={classes.button}></button>
                </form>
            </div>
        </div>
    );
}
