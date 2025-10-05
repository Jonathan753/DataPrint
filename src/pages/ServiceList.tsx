import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonDelete, ButtonUpdate} from "../components/Button";
import Title from "../components/Title";
import { ModalDelete } from "../components/Modal";

type Service = {
    serviceId: number,
    service: string;
    value: number;
}

let getId = 0;

const ServiceList = () => {
    const { id } = useParams();
    const [form, setForm] = useState<Service[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await (window as any).services.all();
            setForm(data);
        })();
    }, [id]);

    return (
        <>
            <Title title="Lista de Servicos" />
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Serviço/Produto</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {form.map((service, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {service.serviceId}
                                        </td>
                                        <td>{service.service}</td>
                                        <td>{
                                            new Intl.NumberFormat("ptt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(service.value / 100)
                                        }</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-4">

                                                <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true);
                                                        getId = service.serviceId;
                                                    }

                                                } />
                                                <ButtonUpdate textMain="Editar Serviço" onClick={() => navigate(`/service/edit/${service.serviceId}`)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalDelete
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onDelete={
                        async () => {
                            await (window as any).services.delete(getId);
                            setForm(form.filter(ser => ser.serviceId !== getId));
                        }
                    }
                    title="Tem certeza que quer excluir esse serviço?"
                    message="Essa ação será irreversível!"
                />
            </div>
        </>
    )
}

export default ServiceList;