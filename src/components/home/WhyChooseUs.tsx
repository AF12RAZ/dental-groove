import { motion } from 'framer-motion';
import { Shield, Heart, Clock, Award, Users, Smile } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Hygienic',
    description: 'Strict sterilization protocols and modern equipment for your safety.',
  },
  {
    icon: Heart,
    title: 'Gentle Care',
    description: 'We understand dental anxiety and provide compassionate treatment.',
  },
  {
    icon: Clock,
    title: 'Punctual Service',
    description: 'We respect your time with minimal waiting and efficient appointments.',
  },
  {
    icon: Award,
    title: 'Expert Doctor',
    description: 'Dr. Insha Farheen brings expertise and dedication to every treatment.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Welcoming environment for patients of all ages.',
  },
  {
    icon: Smile,
    title: 'Beautiful Results',
    description: 'Treatments designed for both function and aesthetics.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Why Choose Us</span>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Your Trusted Dental Partner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We go beyond just treating teeth – we build lasting relationships based on trust,
            care, and exceptional service.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
