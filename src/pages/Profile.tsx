import { User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const Profile = () => {
    const { profile, user, isLoading, roles } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-slate-500">Loading profile...</div>
            </div>
        );
    }

    const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
    const displayEmail = profile?.email || user?.email || 'No email';
    const userRole = roles.includes('admin') ? 'Administrator' : roles.includes('dentist') ? 'Dentist' : 'Patient';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                        {displayName[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 capitalize">{displayName}</h2>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                            {userRole}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-500">Full Name</label>
                        <p className="text-lg font-medium text-slate-900 capitalize">{displayName}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-500">Email Address</label>
                        <p className="text-lg font-medium text-slate-900">{displayEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
