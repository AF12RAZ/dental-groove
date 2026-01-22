import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactDetails() {
    return (
        <div className="glass-card p-10 h-full relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <h3 className="text-3xl font-bold mb-8 text-primary relative z-10">Visit Golden Groove</h3>
            <div className="space-y-8 relative z-10">

                {/* Address */}
                <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground/90">Our Location</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            Golden heights, phase -2,<br />
                            Jana chaitanya colony, road no 21,<br />
                            Attapur, Hyderabad-500048
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground/90">Call Us</h4>
                        <p className="text-muted-foreground text-lg">+91 70326 88395</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground/90">Email Us</h4>
                        <p className="text-muted-foreground">info@goldengroove.com</p>
                    </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/10">
                        <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="w-full">
                        <h4 className="text-lg font-semibold mb-2 text-foreground/90">Working Hours</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex justify-between border-b border-border/50 pb-2">
                                <span>Mon - Sat</span>
                                <span className="font-medium text-foreground">10:00 AM - 9:00 PM</span>
                            </li>
                            <li className="flex justify-between pt-1">
                                <span>Sunday</span>
                                <span className="text-primary font-medium">Holiday</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
