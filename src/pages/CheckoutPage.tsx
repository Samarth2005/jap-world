import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "stripe" | "razorpay";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validate()) return;
    setLoading(true);

    // Simulate payment processing — replace with real Stripe/Razorpay integration
    await new Promise((r) => setTimeout(r, 1800));

    // TODO: Integrate Stripe session creation or Razorpay modal here
    // For Stripe: call your edge function to create a checkout session, then redirect
    // For Razorpay: open Razorpay checkout modal with order details

    clearCart();
    setLoading(false);
    navigate("/success");
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-6 pt-24 pb-16 max-w-2xl text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Link to="/products" className="text-foreground text-sm hover:underline">
              Browse Products →
            </Link>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 pb-16 max-w-3xl">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={quint}
            className="text-3xl font-bold mb-10"
          >
            Checkout
          </motion.h1>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...quint, delay: 0.1 }}
              className="md:col-span-3 space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State, ZIP"
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Payment Method
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  <label
                    htmlFor="stripe"
                    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                      paymentMethod === "stripe"
                        ? "border-foreground bg-muted/40"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <RadioGroupItem value="stripe" id="stripe" />
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Stripe</p>
                      <p className="text-xs text-muted-foreground">Card payment</p>
                    </div>
                  </label>
                  <label
                    htmlFor="razorpay"
                    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                      paymentMethod === "razorpay"
                        ? "border-foreground bg-muted/40"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Razorpay</p>
                      <p className="text-xs text-muted-foreground">UPI / Card / Wallet</p>
                    </div>
                  </label>
                </RadioGroup>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...quint, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 sticky top-28">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                      </div>
                      <p className="text-sm font-mono">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-mono text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                    </>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
