import { useEffect } from "react";

export const BasicSubscription: React.FC = () => {
  useEffect(() => {
    // Extendemos la interfaz de Window para incluir $MPC_loaded
    const w = window as typeof window & {
      $MPC_loaded?: boolean;
    };

    if (!w.$MPC_loaded) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${document.location.protocol}//secure.mlstatic.com/mptools/render.js`;

      document.body.appendChild(script);
      w.$MPC_loaded = true;
    }
  }, []);

  return (
    <>
      <a
        href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808496006df20196218b46ea13d1"
        className="blue-button"
      >
        Basic
      </a>

      <style>{`
         .blue-button {
           background-color: #3483FA;
           color: white;
           padding: 10px 24px;
           text-decoration: none;
           border-radius: 5px;
           display: inline-block;
           font-size: 16px;
           transition: background-color 0.3s;
           font-family: Arial, sans-serif;
         }
         .blue-button:hover {
           background-color: #2a68c8;
         }
       `}</style>
    </>
  );
};
export const PlatiniumSubscrition: React.FC = () => {
  useEffect(() => {
    // Extendemos la interfaz de Window para incluir $MPC_loaded
    const w = window as typeof window & {
      $MPC_loaded?: boolean;
    };

    if (!w.$MPC_loaded) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${document.location.protocol}//secure.mlstatic.com/mptools/render.js`;

      document.body.appendChild(script);
      w.$MPC_loaded = true;
    }
  }, []);

  return (
    <>
      <a
        href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808496006df201962190758113d3"
        className="blue-button"
      >
        Medio
      </a>

      <style>{`
         .blue-button {
           background-color: #3483FA;
           color: white;
           padding: 10px 24px;
           text-decoration: none;
           border-radius: 5px;
           display: inline-block;
           font-size: 16px;
           transition: background-color 0.3s;
           font-family: Arial, sans-serif;
         }
         .blue-button:hover {
           background-color: #2a68c8;
         }
       `}</style>
    </>
  );
};
