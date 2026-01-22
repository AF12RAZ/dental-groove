import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Shield, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/30 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Trusted Dental Care
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight animate-fade-in text-slate-900">
              Transform Your Smile at <span className="text-primary">Golden Groove</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Experience exceptional dental care at Golden Groove.
              We combine expertise with compassion to give you the confident smile you deserve.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="btn-hero" asChild>
                <Link to="/book">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-outline" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <Heart className="h-4 w-4 text-success" />
                </div>
                <span>Gentle Care</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>Safe & Hygienic</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <span>Timely Service</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="absolute inset-4 rounded-2xl bg-card shadow-card flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-5xl">🦷</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">Dr. Insha Farheen</h3>
                  <p className="text-muted-foreground">BDS - Dental Surgeon</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Dedicated to providing personalized dental care with modern techniques and a gentle approach.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-1/4 glass-card p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">4.9 Rating</p>
                  <p className="text-xs text-muted-foreground">Patient Reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
