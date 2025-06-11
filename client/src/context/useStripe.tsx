import { createCheckoutSession } from "@/lib/apiRoutes";
import { loadStripe } from "@stripe/stripe-js";
import { createContext, useContext } from "react";

interface StripeContextProps {
  redirectToCheckout: (courseIds: string[]) => Promise<void>;
}

export const StripeContext = createContext<StripeContextProps | undefined>(
  undefined
);

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const redirectToCheckout = async (coursesIds: string[]) => {
    try {
      const response = await createCheckoutSession(coursesIds);

      window.location.href = response.data.url;
    } catch (e) {
      console.log(e || "Failed to redirect to checkout");
    }
  };

  return (
    <StripeContext.Provider value={{ redirectToCheckout }}>
      {children}
    </StripeContext.Provider>
  );
};

const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error(
      "useStripe muss innerhalb eines StripeProvider verwendet werden"
    );
  }
  return context;
};

export default useStripe;
