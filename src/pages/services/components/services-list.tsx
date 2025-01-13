import LoaderWrapper from "@/components/common/loader-wrapper"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"


export function ServicesList() {
    const { services, loading } = useAppSelector((a) => a.service)


    return (
        <LoaderWrapper loading={loading} type="services">
            <div className="flex flex-row gap-4 h-24 ">
                {services.map((service) => (
                    <Card key={service.id}>
                        <h2 className="text-xl font-bold">{service.title}</h2>
                        <p>Precio: ${service.price}</p>
                        <p>Duracion: {service.duration}</p>
                    </Card>
                ))}
            </div>
        </LoaderWrapper>
    )
}