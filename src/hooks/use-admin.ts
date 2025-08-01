import { useState, useEffect } from "react";

// Simple admin state management - can be replaced with proper authentication later
export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminHeaderVisible, setAdminHeaderVisible] = useState(true);
    const [adminHeaderCollapsed, setAdminHeaderCollapsed] = useState(false);

    useEffect(() => {
        // Check if user is admin - this could be from localStorage, API, etc.
        // For now, we'll check localStorage for a simple flag
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

    return {
        isAdmin,
        adminHeaderVisible,
        adminHeaderCollapsed,
        toggleAdminMode,
        toggleAdminHeader,
        toggleAdminHeaderCollapse,
    };
};