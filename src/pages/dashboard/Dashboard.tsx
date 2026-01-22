
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Clock, Activity, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', visits: 40 },
    { name: 'Tue', visits: 30 },
    { name: 'Wed', visits: 45 },
    { name: 'Thu', visits: 50 },
    { name: 'Fri', visits: 65 },
    { name: 'Sat', visits: 40 },
    { name: 'Sun', visits: 0 },
];

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Patients", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
                    { title: "Appointments", value: "32", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
                    { title: "Pending Requests", value: "5", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
                    { title: "Total Earnings", value: "₹42.5k", icon: Activity, color: "text-green-600", bg: "bg-green-100" },
                ].map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between space-x-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900">Weekly Appointments</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                        cursor={{ stroke: '#3B82F6', strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Appointments List */}
                <Card className="col-span-3 border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-slate-900">Upcoming Appointments</CardTitle>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: "John Doe", treatment: "Root Canal", time: "09:00 AM", img: "https://i.pravatar.cc/150?u=1" },
                                { name: "Sarah Smith", treatment: "Teeth Cleaning", time: "10:30 AM", img: "https://i.pravatar.cc/150?u=2" },
                                { name: "Mike Johnson", treatment: "Braces Checkup", time: "11:45 AM", img: "https://i.pravatar.cc/150?u=3" },
                                { name: "Emma Wilson", treatment: "Implants", time: "02:15 PM", img: "https://i.pravatar.cc/150?u=4" },
                            ].map((apt, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>{apt.name[0]}</AvatarFallback>
                                            <img src={apt.img} alt={apt.name} className="object-cover" />
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-slate-900">{apt.name}</p>
                                            <p className="text-sm text-slate-500">{apt.treatment}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-slate-900">{apt.time}</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Appointments Table */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3">Patient</th>
                                    <th className="px-6 py-3">Service</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { patient: "Alice Brown", service: "Whitening", date: "Oct 24, 2024", status: "Approved" },
                                    { patient: "Robert Fox", service: "Extraction", date: "Oct 24, 2024", status: "Pending" },
                                    { patient: "Jane Cooper", service: "Checkup", date: "Oct 23, 2024", status: "Completed" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{row.patient}</td>
                                        <td className="px-6 py-4 text-slate-600">{row.service}</td>
                                        <td className="px-6 py-4 text-slate-600">{row.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                    row.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                                Details <ArrowUpRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
