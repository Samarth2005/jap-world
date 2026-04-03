import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";

export default function SuccessPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 pb-16 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={quint}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed</h1>
            <p className="text-muted-foreground max-w-sm">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <Link
              to="/"
              className="mt-4 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
