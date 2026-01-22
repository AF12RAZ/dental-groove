import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const expenses = [
    { category: "Rent (Clinic Space)", spent: 30000, budget: 30000, percent: 100 },
    { category: "Staff Salaries", spent: 80000, budget: 80000, percent: 100 },
    { category: "Medical Equipment", spent: 25000, budget: 50000, percent: 50 },
    { category: "Dental Supplies", spent: 15000, budget: 20000, percent: 75 },
    { category: "Marketing & Ads", spent: 10000, budget: 15000, percent: 66 },
    { category: "Utilities (Electric/Water)", spent: 8500, budget: 10000, percent: 85 },
];

export function ExpenseCategories() {
    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Monthly Expense categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {expenses.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-700">{item.category}</span>
                                <span className="text-slate-500">
                                    ₹{item.spent.toLocaleString()} <span className="text-slate-300">/ ₹{item.budget.toLocaleString()}</span>
                                </span>
                            </div>
                            <Progress value={item.percent} className="h-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
