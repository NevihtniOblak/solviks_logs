export const Routes = {
    HOME: { route: "/", name: "Home" },
    LOGIN: { route: "/login", name: "Login" },
    PROJECTS: { route: "/projects", name: "Projects" },
    USERS: { route: "/users", name: "Users" },
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];

export const ApiRoutes = {
    //auth
    login: () => `/auth/login` as const,
    register: () => `/auth/register` as const,
    logout: () => `/auth/logout` as const,
    //user
    getAllUsers: () => `/user` as const,
    getUserById: (id: string) => `/user/${id}` as const,
    deleteUserById: (id: string) => `/user/${id}` as const,
    //project
    getAllProjects: () => `/project` as const,
    getProjectById: (id: string) => `/project/${id}` as const,
    createProject: () => `/project` as const,
    deleteProject: (id: string) => `/project/${id}` as const,
    //log
    getLogById: (id: string) => `/log/${id}` as const,
    getLogByProjectId: (projectId: string) => `/log/project/${projectId}` as const,
    postLog: () => `/log` as const,
    getAllLogs: () => `/log` as const,
} as const;
