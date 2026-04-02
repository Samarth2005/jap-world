import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ProductSpotlight from "@/components/ProductSpotlight";
import CategoriesSection from "@/components/CategoriesSection";
import CinematicProcess from "@/components/CinematicProcess";
import NewArrivals from "@/components/NewArrivals";
import AboutSection from "@/components/AboutSection";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import SpatialProductShowcase from "@/components/ui/spatial-product-showcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <FeaturedSection />
        <ProductSpotlight />
        <SpatialProductShowcase />
        <CategoriesSection />
        <CinematicProcess />
        <NewArrivals />
        <AboutSection />
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Collectors Say</h2>
            </div>
            <StaggerTestimonials />
          </div>
        </section>
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
