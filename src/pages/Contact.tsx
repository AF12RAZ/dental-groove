
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactDetails } from "@/components/shared/ContactDetails";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center text-primary">Contact Us</h1>
                <p className="text-center text-muted-foreground mb-12">
                    Get in touch with us effectively.
                </p>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Column: Contact Form */}
                    <div className="space-y-6">
                        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50">
                            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                            <div className="space-y-4">
                                <Input placeholder="Your Name" />
                                <Input type="email" placeholder="Your Email" />
                                <Textarea placeholder="Your Message" className="min-h-[150px]" />
                                <Button className="w-full">Send Message</Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Details */}
                    <div>
                        <ContactDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
