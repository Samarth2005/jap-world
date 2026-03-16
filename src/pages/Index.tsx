import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ProductSpotlight from "@/components/ProductSpotlight";
import CategoriesSection from "@/components/CategoriesSection";
import CinematicProcess from "@/components/CinematicProcess";
import NewArrivals from "@/components/NewArrivals";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <ProductSpotlight />
      <CategoriesSection />
      <CinematicProcess />
      <NewArrivals />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
