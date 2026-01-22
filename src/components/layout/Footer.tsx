import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-xl font-bold text-primary-foreground">G</span>
              </div>
              <span className="text-xl font-semibold">Golden Groove</span>
            </div>
            <p className="text-sm text-background/70">
              Providing exceptional dental care with a gentle touch. Your smile is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-background/70 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-sm text-background/70 hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/book" className="text-sm text-background/70 hover:text-primary transition-colors">
                Book Appointment
              </Link>
              <Link to="/contact" className="text-sm text-background/70 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>
                  Golden heights, phase -2,<br />
                  Jana chaitanya colony, road no 21,<br />
                  Attapur, Hyderabad-500048
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 70326 88395</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>info@goldengroove.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon - Sat</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Holiday</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Dental Groove. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-background/40">
            Dr. Insha Farheen, BDS
          </p>
        </div>
      </div>
    </footer>
  );
}
