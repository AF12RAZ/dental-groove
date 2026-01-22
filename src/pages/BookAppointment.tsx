import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { AppointmentSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/security";

interface Service {
    id: string;
    name: string;
}

const BookAppointment = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase.from('services').select('id, name');
            if (error) {
                console.error('Error fetching services:', error);
                toast.error("Failed to load services");
            } else {
                setServices(data || []);
            }
        };
        fetchServices();
    }, []);

    const handleBooking = async () => {
        if (!user) {
            toast.error("Please sign in to book an appointment");
            navigate("/login");
            return;
        }

        // 1. Zod Validation
        const validationResult = AppointmentSchema.safeParse({
            serviceId: selectedServiceId,
            date: date,
        });

        if (!validationResult.success) {
            toast.error(validationResult.error.errors[0].message);
            return;
        }

        // 2. Client-Side Rate Limiting
        if (!checkRateLimit('book_appointment', 'submit')) {
            toast.error("You are doing that too much. Please try again in a minute.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('appointments').insert({
                patient_id: user.id,
                service_id: selectedServiceId,
                scheduled_date: format(date!, 'yyyy-MM-dd'), // Asserted because validation passed
                scheduled_time: format(date!, 'HH:mm:ss'),
                status: 'pending'
            });

            if (error) throw error;

            toast.success("Appointment request sent successfully! We will confirm shortly.");
            setSelectedServiceId("");
        } catch (error: any) {
            console.error('Booking error:', error);
            toast.error(error.message || "Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Book an Appointment</h1>
                <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
                    <p className="text-muted-foreground text-center">
                        Select a service and date to schedule your visit.
                    </p>

                    <div className="w-full space-y-4">
                        <div className="space-y-2">
                            <Label>Select Service</Label>
                            <Select onValueChange={setSelectedServiceId} value={selectedServiceId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a treatment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.length === 0 ? (
                                        <SelectItem value="loading" disabled>Loading services...</SelectItem>
                                    ) : (
                                        services.map((service) => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 flex flex-col items-center">
                            <Label>Select Date</Label>
                            <div className="border rounded-md p-4 bg-card">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow-sm"
                                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                                />
                            </div>
                        </div>
                    </div>

                    <Button size="lg" className="w-full" onClick={handleBooking} disabled={loading}>
                        {loading ? "Booking..." : "Book Appointment"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
