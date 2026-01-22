import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: '🦷',
    title: 'Root canal treatment',
    description: 'Expert endodontic therapy to save infected teeth.',
    price: '',
  },
  {
    icon: '🦷',
    title: 'Gums treatment (periodontics)',
    description: 'Specialized care for healthy gums.',
    price: '',
  },
  {
    icon: '✨',
    title: 'Braces (orthodontics)',
    description: 'Teeth alignment and straightening solutions.',
    price: '',
  },
  {
    icon: '🦷',
    title: 'Dentures',
    description: 'Comfortable and natural-looking artificial teeth.',
    price: '',
  },
  {
    icon: '🔧',
    title: 'Implants',
    description: 'Permanent solution for missing teeth.',
    price: '',
  },
  {
    icon: '✨',
    title: 'Teeth Cleaning',
    description: 'Professional cleaning for oral hygiene.',
    price: '',
  },
  {
    icon: '🦷',
    title: 'Extractions (oral surgery)',
    description: 'Safe and painless tooth removal.',
    price: '',
  },
  {
    icon: '💎',
    title: 'Teeth whitening',
    description: 'Brighten your smile with professional treatment.',
    price: '',
  },
  {
    icon: '👶',
    title: 'Child dental treatment',
    description: 'Gentle dental care for children (pedodontics).',
    price: '',
  },
  {
    icon: '😁',
    title: 'Smile Design',
    description: 'Customized cosmetic makeovers for your smile.',
    price: '',
  },
  {
    icon: '👑',
    title: 'Crown & Bridges',
    description: 'Restorative solutions for damaged or missing teeth.',
    price: '',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Our Services</span>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From routine checkups to specialized treatments, we provide a full range of dental services
            to keep your smile healthy and beautiful.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl transition-transform group-hover:scale-110">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {service.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
