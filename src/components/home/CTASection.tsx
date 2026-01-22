import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready for Your Best Smile?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Book your appointment today and take the first step towards a healthier, 
            more confident smile. We look forward to caring for you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="min-w-[200px]"
              asChild
            >
              <Link to="/book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Online
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="tel:+919876543210">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
