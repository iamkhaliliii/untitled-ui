import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Admin Context
interface AdminContextType {
    isAdmin: boolean;
    adminHeaderVisible: boolean;
    adminHeaderCollapsed: boolean;
    toggleAdminMode: () => void;
    toggleAdminHeader: () => void;
    toggleAdminHeaderCollapse: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin Provider Component
export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminHeaderVisible, setAdminHeaderVisible] = useState(true);
    const [adminHeaderCollapsed, setAdminHeaderCollapsed] = useState(false);

    useEffect(() => {
        const adminFlag = localStorage.getItem('isAdmin');
        setIsAdmin(adminFlag === 'true');
    }, []);

    const toggleAdminMode = () => {
        const newAdminState = !isAdmin;
        setIsAdmin(newAdminState);
        localStorage.setItem('isAdmin', newAdminState.toString());
    };

    const toggleAdminHeader = () => {
        setAdminHeaderVisible(!adminHeaderVisible);
    };

    const toggleAdminHeaderCollapse = () => {
        setAdminHeaderCollapsed(!adminHeaderCollapsed);
    };

    const value = {
        isAdmin,
        adminHeaderVisible,
        adminHeaderCollapsed,
        toggleAdminMode,
        toggleAdminHeader,
        toggleAdminHeaderCollapse,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

// Hook to use admin context
export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};