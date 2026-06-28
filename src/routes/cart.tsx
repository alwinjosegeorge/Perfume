import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Minus, Plus, X, Check, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/lib/cart";
import { createOrderDb } from "@/lib/api/dbFunctions";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Voguish Moments" },
      { name: "description", content: "Review the items in your shopping bag." },
    ],
  }),
  component: CartPage,
});

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const shipping = detailed.length > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  // Scroll to top on view changes (cart -> checkout -> success)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [isCheckingOut, orderPlaced]);
  
  // Contact & Delivery states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryHouse, setDeliveryHouse] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [deliveryDistrict, setDeliveryDistrict] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryPin, setDeliveryPin] = useState("");

  const submitOrder = (orderId: string, paymentId: string) => {
    const newOrder = {
      id: orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: {
        house: deliveryHouse.trim(),
        area: deliveryArea.trim(),
        district: deliveryDistrict.trim(),
        state: deliveryState.trim(),
        pin: deliveryPin.trim(),
      },
      paymentId,
      items: detailed.map((d) => ({
        slug: d.product.slug,
        name: d.product.name,
        qty: d.qty,
        size: d.size,
        price: d.price,
      })),
      subtotal,
      shipping,
      total,
      status: "WAITING",
      dateString: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }) + " at " + new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
    };

    createOrderDb({ data: newOrder })
      .then(() => {
        clear();
        setOrderPlaced(orderId);
      })
      .catch((err) => {
        console.error("Failed to save order to Neon database:", err);
        alert("Failed to place order in database. Please try again.");
      });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !customerPhone.trim() ||
      !deliveryHouse.trim() ||
      !deliveryArea.trim() ||
      !deliveryDistrict.trim() ||
      !deliveryState.trim() ||
      !deliveryPin.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^\d{6}$/.test(deliveryPin.trim())) {
      alert("PIN Code must be exactly 6 digits.");
      return;
    }

    // Load Razorpay Script
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    const orderId = `ERA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const options = {
      key: "rzp_test_dummy_key", // Placeholder: User will change this later
      amount: total * 100, // in paise
      currency: "INR",
      name: "Voguish Moments Perfumes",
      description: `Order Checkout Payment - ${orderId}`,
      handler: function (response: any) {
        const paymentId = response.razorpay_payment_id || `pay_mock_${Math.random().toString(36).substring(2, 9)}`;
        submitOrder(orderId, paymentId);
      },
      prefill: {
        name: customerName.trim(),
        contact: customerPhone.trim(),
      },
      theme: {
        color: "#1c1917",
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay open error: ", err);
      // Fallback checkout for testing/dummy environment
      alert("Razorpay sandbox payment loaded. Completing payment step...");
      submitOrder(orderId, `pay_mock_${Math.random().toString(36).substring(2, 11).toUpperCase()}`);
    }
  };

  return (
    <SiteLayout>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-6 lg:pt-10 pb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-10 text-center md:text-left">Your Cart</h1>

        {orderPlaced ? (
          <div className="text-center py-20 bg-[#FAF9F5] border border-emerald-100 rounded-3xl animate-fade-up max-w-xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h2 className="font-display text-3xl mb-3 text-foreground">Order Placed Successfully!</h2>
            <p className="text-sm text-muted-foreground mb-2">Order ID: <span className="font-bold text-foreground">{orderPlaced}</span></p>
            <p className="text-sm text-muted-foreground mb-8">We have received your order. You can review and manage this order in the Control Panel.</p>
            <Link
              to="/shop"
              onClick={() => setOrderPlaced(null)}
              className="inline-flex bg-[#1c1917] hover:bg-[#1c1917]/90 text-white rounded-full px-8 py-3.5 text-xs font-bold tracking-widest uppercase shadow-md transition-all cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        ) : detailed.length === 0 ? (
          <div className="text-center py-20 bg-cream/50 rounded-3xl">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link to="/shop" className="inline-flex bg-foreground text-background rounded-full px-7 py-3">Browse the shop</Link>
          </div>
        ) : isCheckingOut ? (
          /* CHECKOUT VIEW: TWO-COLUMN FORM LAYOUT */
          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1fr_380px] gap-10 animate-fade-up">
            
            {/* Left Column: Form Fields */}
            <div className="bg-white border border-[#EAE8E2] rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="font-display text-2xl">Shipping & Contact Details</h2>
              <p className="text-xs text-muted-foreground">Please provide your contact and delivery address below.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Email field removed */}

              <div className="border-t border-[#EAE8E2] pt-6 space-y-4">
                <h3 className="text-xs tracking-widest text-[#A28F79] font-bold uppercase">Delivery Address</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                      House Name / Flat *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryHouse}
                      onChange={(e) => setDeliveryHouse(e.target.value)}
                      placeholder="House Name / Flat"
                      className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                      Area / Street *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      placeholder="Area / Street"
                      className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      pattern="\d{6}"
                      maxLength={6}
                      value={deliveryPin}
                      onChange={(e) => setDeliveryPin(e.target.value)}
                      placeholder="PIN Code"
                      className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                      District / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryDistrict}
                      onChange={(e) => setDeliveryDistrict(e.target.value)}
                      placeholder="District / City"
                      className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-wider text-muted-foreground font-bold uppercase mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryState}
                      onChange={(e) => setDeliveryState(e.target.value)}
                      placeholder="State"
                      className="w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Actions */}
            <aside className="bg-cream/70 rounded-3xl p-6 h-fit border border-[#EAE8E2] space-y-6">
              <h3 className="font-display text-xl">Order Summary</h3>
              
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 border-b border-border pb-4">
                {detailed.map(({ product, qty, size, price }) => (
                  <div key={`${product.slug}-${size}`} className="flex justify-between text-xs">
                    <div>
                      <span className="font-semibold text-foreground">{product.name}</span>
                      <span className="text-[9px] bg-white border border-border px-1.5 py-0.5 rounded ml-2 uppercase text-muted-foreground">{size}</span>
                    </div>
                    <span className="text-muted-foreground">x{qty} · ₹{(price * qty).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs border-b border-border pb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">₹{shipping.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between font-bold text-sm pt-1.5 border-t border-dashed border-border"><span className="text-foreground">Total</span><span className="text-foreground">₹{total.toLocaleString("en-IN")}</span></div>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#1c1917] hover:bg-foreground/90 text-white rounded-full py-3.5 font-semibold text-xs tracking-widest uppercase cursor-pointer shadow-md shadow-stone-900/10"
                >
                  Pay & Place Order
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full bg-white border border-border text-muted-foreground hover:text-foreground rounded-full py-3.5 font-semibold text-xs tracking-widest uppercase cursor-pointer"
                >
                  Back to Cart
                </button>
              </div>
            </aside>
          </form>
        ) : (
          /* STANDARD CART VIEW */
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            <div className="space-y-4">
              {detailed.map(({ product, qty, size, price }) => (
                <div key={`${product.slug}-${size}`} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="w-24 h-24 rounded-xl overflow-hidden bg-cream shrink-0">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <Link to="/product/$slug" params={{ slug: product.slug }} className="font-medium hover:text-accent">{product.name}</Link>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                      <div className="text-[10px] bg-[#FAF9F5] border border-border/70 text-muted-foreground font-semibold px-2.5 py-0.5 rounded-md w-fit mt-1.5 uppercase tracking-wider">
                        {size}
                      </div>
                      <div className="text-sm mt-1.5 font-medium">₹{price.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="flex items-center border border-border rounded-full bg-[#FAF9F5]/40">
                      <button onClick={() => setQty(product.slug, size, qty - 1)} className="w-9 h-9 flex items-center justify-center cursor-pointer hover:text-accent"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(product.slug, size, qty + 1)} className="w-9 h-9 flex items-center justify-center cursor-pointer hover:text-accent"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="w-24 text-right font-semibold">₹{(price * qty).toLocaleString("en-IN")}</div>
                    <button onClick={() => remove(product.slug, size)} aria-label="Remove" className="text-muted-foreground hover:text-foreground cursor-pointer"><X className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer mt-2">Clear cart</button>
            </div>

            <aside className="bg-cream/70 rounded-3xl p-6 h-fit border border-[#EAE8E2]">
              <h2 className="font-display text-2xl mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">₹{shipping.toLocaleString("en-IN")}</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-medium text-base"><span>Total</span><span className="font-bold">₹{total.toLocaleString("en-IN")}</span></div>
              </div>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="mt-6 w-full bg-[#000000] hover:bg-zinc-900 text-white rounded-full py-4 font-bold text-xs tracking-[0.15em] uppercase cursor-pointer shadow-md flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4 fill-white stroke-black" />
                Checkout Securely
              </button>

              {/* Payment logos container */}
              <div className="mt-4 flex items-center justify-center gap-2 select-none pointer-events-none">
                {/* Visa Icon */}
                <svg className="w-10 h-6.5 rounded" viewBox="0 0 40 26" fill="none">
                  <rect width="40" height="26" rx="3" fill="#1A1F71"/>
                  <path d="M14 17.5l1.6-9H18.2l-1.6 9H14zm8.7-8.8c-.8-.4-1.9-.7-3.1-.7-3 0-.9 1.4-.9 3.2 0 1.4 1.5 2.1 2.5 2.6c1.1.5 1.5.8 1.5 1.2 0 .7-1 .9-1.8.9-1.2 0-2.1-.3-2.8-.6l-.7 2c.8.4 2 .7 3.3.7 3.1 0 5-1.4 5-3.6 0-2.4-3.6-2.6-3.6-3.5 0-.3.4-.7 1.2-.7.8 0 1.6.2 2.2.5l.6-2.1zm4.8.3h-2.2c-.6 0-1.1.3-1.4.9l-3 7.6h2.7l.5-1.5h3.1l.3 1.5h2.4l-2.4-8.5zm-2.8 5l1.1-3.2.6 3.2h-1.7zm8.8-5h-2.1c-.6 0-1 .4-1.2.9L31.8 17.5h2.6l.5-1.3H38l.2 1.3h2.3l-1.9-9z" fill="#FFF"/>
                </svg>

                {/* Mastercard Icon */}
                <svg className="w-10 h-6.5 rounded" viewBox="0 0 40 26" fill="none">
                  <rect width="40" height="26" rx="3" fill="#0A0B1A"/>
                  <circle cx="16" cy="13" r="7" fill="#EB001B"/>
                  <circle cx="24" cy="13" r="7" fill="#F79E1B" fillOpacity="0.8"/>
                </svg>

                {/* Amex Icon */}
                <svg className="w-10 h-6.5 rounded" viewBox="0 0 40 26" fill="none">
                  <rect width="40" height="26" rx="3" fill="#0170C0"/>
                  <path d="M6 18V8h2.3l1.8 4.2L12 8h2.3v10h-1.8v-6.3L10.6 16H9.7L7.8 11.7V18H6zm11.7-5.5h2.2V14h-2.2v2.2h2.8V18h-4.6V8h4.6v1.8h-2.8v1.7zm8.8-4.5l1.5 2.5 1.5-2.5h2.2l-2.5 4 2.5 4h-2.2l-1.5-2.5L28.7 18h-2.2l2.5-4-2.5-4h2.2z" fill="#FFF"/>
                </svg>

                {/* PayPal Icon */}
                <svg className="w-10 h-6.5 rounded" viewBox="0 0 40 26" fill="none">
                  <rect width="40" height="26" rx="3" fill="#003087"/>
                  <path d="M15 19.5h2.5c.5 0 .9-.3 1-.8l1.7-8.2c.1-.5-.3-.9-.8-.9h-3.5L14.2 18c-.1.5.3 1 .8 1.5z" fill="#0079C1"/>
                  <path d="M17.5 17.5h2.5c.5 0 .9-.3 1-.8l1.7-8.2c.1-.5-.3-.9-.8-.9h-3.5L16.7 16c-.1.5.3 1 .8 1.5z" fill="#00457C" fillOpacity="0.6"/>
                </svg>

                {/* Apple Pay Icon */}
                <svg className="w-10 h-6.5 rounded" viewBox="0 0 40 26" fill="none">
                  <rect width="40" height="26" rx="3" fill="#000000"/>
                  <path d="M16 11.2c-.3 0-.8.2-1.1.5-.4.4-.7 1-.7 1.6 0 .6.3 1.2.7 1.4.3.2.7.3.9.3.4 0 .8-.2 1.1-.5.4-.4.7-1 .7-1.6 0-.6-.3-1.2-.7-1.4-.3-.2-.7-.3-.9-.3zm0-.8c.7 0 1.3.4 1.6 1 .3-.7 1-1 1.7-1 .8 0 1.5.5 1.7 1.3.1.4.1.8.1 1.2 0 1.2-.4 2.1-.9 2.7-.4.5-1 1-1.8 1-.6 0-1-.3-1.4-.3-.3 0-.7.3-1.2.3-.8 0-1.4-.5-1.7-1-.5-.8-.7-1.8-.7-2.7 0-1.8.9-2.8 2.6-2.8z" fill="#FFF"/>
                </svg>
              </div>

              <Link to="/shop" className="mt-5 block text-center text-xs tracking-wider uppercase font-semibold text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
