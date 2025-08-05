import { FromatedDate } from "@/lib/format-date";
import { formatCurrency } from "@/lib/utils/format-currency";

export function CreatePaymentForm() {
  const membership_price = formatCurrency(20000); // Cambia esto por el valor real de membership_price

  return (
    <div className="flex flex-col  items-center   gap-2  h-full  ">
      {" "}
      <section className=" p-4 w-full space-y-4 rounded-md ">
        <div className="text-center">
          <p className="text-3xl"> {membership_price}</p>
        </div>
        <div className="text-sm flex flex-col gap-4">
          <div className="text-gray-500 flex justify-between font-light ">
            <p>Servicio</p>
            <span className="font-medium">Reserve Pro System - PRO</span>
          </div>
          <div className="text-gray-500 flex justify-between font-light ">
            <p>Fecha</p>
            <span className="font-medium">
              <FromatedDate date={new Date().toISOString()} />
            </span>
          </div>
          <hr />
          <div className="text-gray-500 flex justify-between font-light ">
            <p>Descuento</p>
            <span className="font-medium">-</span>
          </div>
          <div className="text-gray-500 flex justify-between font-light ">
            <p>Subtotal</p>
            <span className="font-medium tabular-nums">{membership_price}</span>
          </div>
          <hr />

          <div className="text-gray-500 flex justify-between font-light ">
            <p>Total</p>
            <span className="font-medium text-green-500">
              {membership_price}
            </span>
          </div>

          <hr />
        </div>
      </section>
    </div>
  );
}
