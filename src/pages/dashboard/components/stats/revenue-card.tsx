import { Card } from "@/components/ui/card";
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

  const Config: Record<ICardType, ICardBody> = {
    appointments: {
      feedback: "+20.1% from last month",
      Icon: () => <Book className="text-gray-400" />,
      title: "Total de Turnos",
      value: `${appointments.length}`,
    },
    customers: {
      feedback: "+20.1% from last month",
      Icon: () => <SquareUser className="text-gray-400" />,
      title: "Total Clientes",
      value: `${customers.length}`,
    },
    sales: {
      feedback: "+20.1% from last month",
      Icon: () => <DollarSign className="text-gray-400" />,
      title: "Ingresos",
      value: `$ 45000`,
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
