
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut, profile } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Calendar, label: "Appointments", path: "/dashboard/appointments" },
        { icon: Users, label: "Patients", path: "/dashboard/patients" },
        { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    ];

    // Sapphire & Ice Blue Theme Colors
    const dashboardColors = {
        bg: "#FFFFFF",
        sidebar: "#FFFFFF",
        activeItem: "#D6E6F3", // Ice Blue
        activeText: "#0F52BA", // Sapphire
        text: "#000926", // Deep Navy
        textDark: "#000926",
        border: "#A6C5D7", // Powder Blue
    };

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans" style={{ backgroundColor: dashboardColors.bg }}>
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 250, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 shadow-sm lg:relative"
                    >
                        <div className="h-16 flex items-center px-6 border-b border-slate-200">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                                    <span className="text-lg font-bold text-white">G</span>
                                </div>
                                <span className="text-lg font-bold text-slate-900">Golden Groove</span>
                            </div>
                            <button className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <nav className="p-4 space-y-1">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="absolute bottom-4 left-0 right-0 px-4">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={handleSignOut}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </Button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-slate-100">
                                <Menu className="h-5 w-5 text-slate-600" />
                            </button>
                        )}
                        <div className="relative hidden md:block w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search patients..."
                                className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-slate-900">{profile?.full_name || "Admin User"}</p>
                                <p className="text-xs text-slate-500">Administrator</p>
                            </div>
                            <Avatar className="h-9 w-9 border border-slate-200">
                                <AvatarImage src={profile?.avatar_url} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                    {profile?.full_name ? profile.full_name[0] : "A"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
