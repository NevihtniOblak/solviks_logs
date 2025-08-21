import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./context/UserContext";
import type { User } from "./types/User";
import { registerLogoutHandler } from "./api/axios";
import Login from "./components/Login/Login";
import Projects from "./components/ProjectsPage/Projects";
import ProjectLogs from "./components/ProjectLogsPage/ProjectLogs";
import Users from "./components/UsersPage/Users";
import LayoutWrapper from "./components/wrappers/LayoutWrapper/LayoutWrapper";

const queryClient = new QueryClient();

function AppWrapper() {
    const [user, setUser] = useState<User | null>(localStorage.user ? JSON.parse(localStorage.user) : null);

    const updateUserData = (userInfo: User | null) => {
        if (userInfo) localStorage.setItem("user", JSON.stringify(userInfo));
        else localStorage.removeItem("user");
        setUser(userInfo);
    };

    useEffect(() => {
        registerLogoutHandler(() => {
            updateUserData(null);
            window.location.href = "/login";
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUserContext: updateUserData }}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<LayoutWrapper />}>
                    <Route path="/" element={<Projects />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectLogs />} />
                    <Route path="/users" element={<Users />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppWrapper />
            </BrowserRouter>
        </QueryClientProvider>
    );
}
