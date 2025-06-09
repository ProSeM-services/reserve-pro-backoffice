import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useAppSelector } from "@/store/hooks";
import { Book, DollarSign, SquareUser } from "lucide-react";
type ICardType = "sales" | "customers" | "appointments";
interface ICardBody {
  title: string;
  value: string;
  feedback: string;
  Icon: () => JSX.Element;
}
interface RevenueCardProps {
  type: ICardType;
}

export function RevenueCard({ type }: RevenueCardProps) {
  const { appointments } = useAppSelector((s) => s.appointments);
  const { customers } = useAppSelector((s) => s.customers);
  const { services } = useAppSelector((s) => s.service);

  const confirmedAppointmentsRevenue = (): number => {
    const confirmedAppointmnets = appointments.filter((a) => a.confirmed);

    let total = 0;

    confirmedAppointmnets.forEach((app) => {
      if (app.price) {
        total = total + app.price;
        return;
      }

      const service = services.find((s) => s.id === app.ServiceId);

      if (!service) return;

      total = total + service.price;
      return;
    });

    return total;
  };
  const Config: Record<ICardType, ICardBody> = {
    appointments: {
      feedback: "+20.1% from last month",
      Icon: () => (
        <div className="text-orange-500 bg-orange-200 p-2 rounded-xl">
          <Book className="size-5" />
        </div>
      ),
      title: "Total de Turnos",
      value: `${appointments.length}`,
    },
    customers: {
      feedback: "+20.1% from last month",
      Icon: () => (
        <div className="text-blue-500 bg-blue-200 p-2 rounded-xl">
          <SquareUser className="size-5" />
        </div>
      ),
      title: "Total Clientes",
      value: `${customers.length}`,
    },
    sales: {
      feedback: "+20.1% from last month",
      Icon: () => (
        <div className="text-green-500 bg-green-100 p-2 rounded-xl">
          <DollarSign className="size-5" />
        </div>
      ),
      title: "Ingresos",
      value: `${formatCurrency(confirmedAppointmentsRevenue())}`,
    },
  };

  const { Icon, feedback, title, value } = Config[type];
  return (
    <Card className="p-4 px-6 flex-grow">
      <section className="flex justify-between items-center">
        <p className="font-medium text-lg"> {title}</p>
        <Icon />
      </section>
      <br />
      <p className="text-2xl font-bold">{value}</p>

      <span className="text-gray-400 text-xs">{feedback}</span>
    </Card>
  );
}
