import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import type { User } from "./models/UserModel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthWrapper } from "./components/AuthWrapper";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import "./App.css";

function App() {
    const [user, setUser] = useState<User | null>(localStorage.user ? JSON.parse(localStorage.user) : null);

    const updateUserData = (userInfo: User | null) => {
        if (userInfo) {
            localStorage.setItem("user", JSON.stringify(userInfo));
        } else {
            localStorage.removeItem("user");
        }
        setUser(userInfo);
    };

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={{ user, setUserContext: updateUserData }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <AuthWrapper>
                                    <Home />
                                </AuthWrapper>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
