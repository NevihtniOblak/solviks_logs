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
                <div className={classes.formOuterContainer}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <h1 className={classes.title}>
                            Sign in with your <br /> credentials
                        </h1>

                        <input
                            type="text"
                            placeholder="Username"
                            ref={usernameRef}
                            className={classes.input}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className={classes.input}
                            required
                        />

                        <div className={classes.buttonWrapper}>
                            <button type="submit" className={classes.button}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
