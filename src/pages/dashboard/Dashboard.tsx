
import { ExpenseMetrics } from "@/components/dashboard/ExpenseMetrics";
import { FinancialCharts } from "@/components/dashboard/FinancialCharts";
import { ExpenseCategories } from "@/components/dashboard/ExpenseCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header / Title */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Financial Overview</h2>
                <p className="text-muted-foreground">Track your clinic's expenses, income, and net balance.</p>
            </div>

            {/* Top Metrics Cards */}
            <ExpenseMetrics />

            {/* Charts Section */}
            <FinancialCharts />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Expense Categories List */}
                <ExpenseCategories />

                {/* Quick Transaction History (Mock) */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-slate-900">Recent Transactions</CardTitle>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { desc: "Dental Chair Maintenance", cat: "Equipment", date: "Today, 2:00 PM", amount: "-₹1,200", type: "expense" },
                                { desc: "Root Canal Payment (Patient #102)", cat: "Income", date: "Today, 11:30 AM", amount: "+₹5,500", type: "income" },
                                { desc: "Monthly Electricity Bill", cat: "Utilities", date: "Yesterday", amount: "-₹3,400", type: "expense" },
                                { desc: "Consultation Fees", cat: "Income", date: "Yesterday", amount: "+₹800", type: "income" },
                                { desc: "Whitening Kit Restock", cat: "Supplies", date: "Oct 24", amount: "-₹4,500", type: "expense" },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {t.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 rotate-180" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{t.desc}</p>
                                            <p className="text-sm text-slate-500">{t.cat} • {t.date}</p>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                                        {t.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
