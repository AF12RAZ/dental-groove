import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react";

export function ExpenseMetrics() {
    const metrics = [
        {
            title: "Today's Expenses",
            value: "₹2,450",
            change: "+12% from yesterday",
            icon: TrendingDown,
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
        {
            title: "Weekly Expenses",
            value: "₹18,320",
            change: "-5% from last week",
            icon: CreditCard,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Monthly Expenses",
            value: "₹1,42,000",
            change: "+2.5% from last month",
            icon: Wallet,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            title: "Total Income",
            value: "₹3,85,000",
            change: "+15% from last month",
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            title: "Net Balance",
            value: "₹2,43,000",
            change: "Healthy Status",
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {metrics.map((metric, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between space-x-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{metric.value}</h3>
                                {metric.change && (
                                    <p className="text-xs text-slate-400">{metric.change}</p>
                                )}
                            </div>
                            <div className={`p-3 rounded-xl ${metric.bg}`}>
                                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
