import React, { createContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [Task, setTask] = useState({ Task: '', color: '' });
    const updateTask = (newTask) => {
        setTask(newTask);
    };

    return (
        <UserContext.Provider value={{ Task, updateTask }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
