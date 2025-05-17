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
import { FilesServices } from "@/services/files.services";
import { PaymentServices } from "@/services/payment.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function CreatePaymentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ICreatePayment>({
    resolver: zodResolver(CreatePaymentSchema),
    defaultValues: {
      amount: 0,
      date: new Date().toISOString(),
      image: "",
      notes: "",
      payment_method: "",
      start_date: new Date().toISOString(),
    },
  });
  const { toast } = useToast();
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
      await PaymentServices.createPayment(data);
      toast({
        title: "Pago realizado!",
        description: `Se notificó a su proveedor, aguarde a ser confirmado!  `,
        variant: "default",
      });
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

  const handleAmount = (value: string) => {
    if (!value) return;
    console.log({ value });
    form.setValue("amount", parseInt(value));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center   gap-2  "
      >
        <section className="space-y-4 flex-grow border p-4 rounded">
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full  items-center gap-2">
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Monto"
                    {...field}
                    type="number"
                    onChange={(e) => handleAmount(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex justify-center">
            <div className="w-[500px]">
              {preview ? (
                <div className="flex flex-col  items-center  justify-between py-2 gap-1 bg-accent p-2 size-full">
                  <img src={preview} className="w-full " />
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
                  className="size-[350px] border-dashed border mx-auto text-gray-500 flex gap-2"
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
        </section>

        <Button isLoading={loading}>Cargar Pago</Button>
      </form>
    </Form>
  );
}
