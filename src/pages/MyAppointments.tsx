import { Calendar } from "lucide-react";

const MyAppointments = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">My Appointments</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                <p className="text-slate-600">You have no upcoming appointments.</p>
            </div>
        </div>
    );
};

export default MyAppointments;
