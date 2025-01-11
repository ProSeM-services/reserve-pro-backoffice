import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";


export function AppointmentsList() {
    const { appointments, loading } = useAppSelector((a) => a.appointments)

    return (
        <LoaderWrapper loading={loading} type="appointments">
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Employee</th>
                        <th>Client Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Hour</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody className="">
                    {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                            <td>{appointment.User.name}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.date.substring(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LoaderWrapper >
    )
}