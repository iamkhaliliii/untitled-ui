import { Shield01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useAdmin } from "@/hooks/use-admin";

// Simple admin toggle component for testing purposes
export const AdminToggle = () => {
    const { isAdmin, toggleAdminMode } = useAdmin();

    return (
        <div className="fixed bottom-4 right-4">
            <Button
                size="sm"
                color={isAdmin ? "primary" : "secondary"}
                iconLeading={Shield01}
                onClick={toggleAdminMode}
            >
                {isAdmin ? "Admin Mode: ON" : "Admin Mode: OFF"}
            </Button>
        </div>
    );
};