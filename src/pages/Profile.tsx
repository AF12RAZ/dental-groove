import { User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const Profile = () => {
    const { profile } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-500">Full Name</label>
                        <p className="text-lg font-medium text-slate-900">{profile?.full_name || 'Loading...'}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-500">Email Address</label>
                        <p className="text-lg font-medium text-slate-900">{profile?.email || 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
