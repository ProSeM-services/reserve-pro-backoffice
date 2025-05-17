import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  CreatePaymentSchema,
  ICreatePayment,
} from "@/interfaces/payment.interface";
import { FromatedDate } from "@/lib/format-date";
import { FilesServices } from "@/services/files.services";
import { PaymentServices } from "@/services/payment.services";
import { addPayment } from "@/store/feature/payments/paymentSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function CreatePaymentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const membership_price = 100; // Cambia esto por el valor real de membership_price
  const form = useForm<ICreatePayment>({
    resolver: zodResolver(CreatePaymentSchema),
    defaultValues: {
      amount: membership_price,
      date: new Date().toISOString(),
      image: "",
      notes: "",
      payment_method: "",
      start_date: new Date().toISOString(),
    },
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: ICreatePayment) => {
    try {
      setLoading(true);
      let data = values;
      if (!file) {
        toast({
          title: "Cargar comprobante!",
          description: `Para confirmar el pago ese necsario adjuntar un comporbante.  `,
          variant: "destructive",
        });
        return;
      }
      if (file) {
        const imageData = await FilesServices.upload(file);
        data = { ...values, image: imageData.fileName };
      }
      const payment = await PaymentServices.createPayment(data);
      toast({
        title: "Pago realizado!",
        description: `Se notificó a su proveedor, aguarde a ser confirmado!  `,
        variant: "default",
      });
      dispatch(addPayment(payment));

      form.reset();
      setPreview(null);
      setFile(null);
    } catch (error) {
      toast({
        title: "Error al editar un miembro!",
        variant: "destructive",
      });
      console.log("Error creating Member, ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result as string);
      fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
    } else {
      setPreview(null);
    }
  };

  const handleResetImageFile = () => {
    setPreview(null);
    setFile(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center   gap-2  h-full  "
      >
        {" "}
        <section className=" p-4 w-full space-y-4 rounded-md flex-grow">
          <div className=" flex justify-center">
            <div className="size-[500px] max-md:size-[250px]  max-md:aspect-square">
              {preview ? (
                <div className="flex flex-col  items-center  justify-between py-2 gap-1  p-2 size-full ">
                  <img
                    src={preview}
                    className="h-[90%] object-contain shadow-lg rounded-md"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleButtonClick}
                      variant={"ghost"}
                      type="button"
                      className="space-x-2"
                    >
                      <span>Modificar comprobante</span>
                      <Paperclip className="size-4 " />
                    </Button>
                    <Button
                      onClick={handleResetImageFile}
                      variant={"destructive"}
                      type="button"
                      className="space-x-2"
                    >
                      <span>Cancelar</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleButtonClick}
                  variant={"ghost"}
                  type="button"
                  className="size-full l border-dashed border mx-auto text-gray-500 flex gap-2"
                >
                  <span>Cargar Comporbante</span>
                  <Paperclip className="size-4 " />
                </Button>
              )}
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <hr />
          <div className="text-center">
            <p className="text-3xl"> ${membership_price.toFixed(2)}</p>
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
              <span className="font-medium">
                ${membership_price.toFixed(2)}
              </span>
            </div>
            <hr />

            <div className="text-gray-500 flex justify-between font-light ">
              <p>Total</p>
              <span className="font-medium text-green-500">
                ${membership_price.toFixed(2)}
              </span>
            </div>

            <hr />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (opcional)</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Podés escribir cualquier comentario adicional sobre el pago..."
                      className="w-full border border-input rounded-md p-2 text-sm resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <Button isLoading={loading}>Cargar Pago</Button>
      </form>
    </Form>
  );
}
