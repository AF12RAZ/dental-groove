import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CTASection } from '@/components/home/CTASection';
import { ContactDetails } from '@/components/shared/ContactDetails';

const Index = () => {
  return (
    <div>
      <HeroSection />

      {/* Replaced ServicesSection with Reach Us section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactDetails />
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Index;
