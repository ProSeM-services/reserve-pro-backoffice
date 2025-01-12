import LoaderWrapper from "@/components/common/loader-wrapper"
import { useAppSelector } from "@/store/hooks"


export function ServicesList() {
    const { services, loading } = useAppSelector((a) => a.service)


    return (
        <LoaderWrapper loading={loading} type="services">
            <div className="flex flex-row gap-4 h-24 ">
                {services.map((service) => (
                    <div key={service.id} className="flex flex-col justify-start border p-2 border-[#000] gap-3">
                        <h2 className="text-xl font-bold">{service.title}</h2>
                        <p>Precio: ${service.price}</p>
                        <p>Duracion: {service.duration}</p>
                    </div>
                ))}
            </div>
        </LoaderWrapper>
    )
}