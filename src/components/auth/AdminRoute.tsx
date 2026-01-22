import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export function AdminRoute() {
    const { user, isLoading, isAdmin } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Not logged in -> Redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin -> Redirect to home (or unauthorized page)
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Authorized -> Render children routes
    return <Outlet />;
}
