import { data, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonDelete, ButtonReturn, ButtonUpdate } from "../../components/Button";
import Title from "../../components/Title";
import { ModalDelete } from "../../components/Modal";
import type { Service } from "../../types/global";
import { useDatabaseQueryAll } from "../../hooks/useDatabaseQueryAll";


let getId = 0;

const ServiceList = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const query = (window as any).services.all();
    const { data: service, isLoading, error } = useDatabaseQueryAll<Service[]>(() => query);

    if (isLoading) {
        return <p>Carregando Serviços...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <>
            <ButtonReturn />
            <Title title="Lista de Servicos" subtitle="Visualize e gerencie os serviços/produtos cadastrados."/>
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 ">
                            <thead className="text-xs text-text-primary uppercase bg-accent-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Serviço/Produto</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {service && service.map((service, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-200">
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
                                                {/* <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true);
                                                        getId = service.serviceId;
                                                    }
                                                } /> */}
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
                    // onDelete={
                    //     async () => {
                    //         await (window as any).services.delete(getId);
                    //         setForm(service.filter(ser => ser.serviceId !== getId));
                    //     }
                    // }
                    title="Tem certeza que quer excluir esse serviço?"
                    message="Essa ação será irreversível!"
                />
            </div>
        </>
    )
}

export default ServiceList;