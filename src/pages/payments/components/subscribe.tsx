import { Button } from "@/components/ui/button";
import { PaymentServices } from "@/services/payment.services";
import { useState } from "react";
interface SubscribeButtonProps {
  amount: number;
  frequency: number;
}
export function SubscribeButton({ amount, frequency }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const hanldleSubscribe = async () => {
    try {
      setLoading(true);
      const email = "test_user_906562990@testuser.com";
      const suscription = await PaymentServices.subscribe({
        email,
        amount,
        frequency,
      });

      location.replace(suscription.init_point!);
    } catch (error) {
      console.error("Error creating payment redirection", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={hanldleSubscribe}
      isLoading={loading}
      className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110"
    >
      Ir a Pagar
    </Button>
  );
}
