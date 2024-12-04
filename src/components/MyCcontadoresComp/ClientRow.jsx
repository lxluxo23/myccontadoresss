import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandedClientRow from './ExpandedClientRow';

function ClientRow({ client = {}, showAddClientForm }) {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleRowClick = () => {
        setExpanded(!expanded);
    };

    const handleDetailClick = (event) => {
        event.stopPropagation(); // Evita que se disparen otros eventos del contenedor
        navigate(`/spreadsheet/${client.clienteId}`); // Asegúrate de usar el nombre correcto de la propiedad
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        alert("Editar funcionalidad aún no implementada");
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        alert("Eliminar funcionalidad aún no implementada");
    };

    const handleMoreClick = (event) => {
        event.stopPropagation();
        alert("Más funcionalidad aún no implementada");
    };

    return (
        <div>
            <div
                className={`flex items-center gap-10 px-5 py-3 w-full min-h-[50px] border border-gray-200 rounded-lg cursor-pointer 
                ${expanded ? 'bg-[#5D5FEF]' : 'bg-white'}
                ${showAddClientForm ? 'pointer-events-none opacity-50' : ''} 
                ${!expanded ? 'duration-500 hover:scale-105 hover:bg-indigo-100 transition-all' : ''}`} // Solo animación si no está expandido
                onClick={handleRowClick}
            >
                <div className={`w-[200px] ${expanded ? 'text-white' : 'text-green-600'} font-sans text-[14px]`}>
                    {client.nombre || "Nombre no disponible"}
                </div>
                <div className={`w-[120px] ${expanded ? 'text-white' : 'text-zinc-700'} font-sans text-[14px]`}>
                    {client.estado || "Estado no disponible"}
                </div>
                <div className={`w-[150px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`}>
                    {client.fechaCreacion || "Fecha no disponible"}
                </div>
                <div className={`w-[100px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`}>
                    {client.email || "Correo no disponible"}
                </div>
                <div className={`w-[150px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`}>
                    {client.rut || "RUT no disponible"}
                </div>
                <div className={`w-[180px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`}>
                    {client.fechaPago || "Fecha de pago no disponible"}
                </div>
                <div className="w-[120px] flex justify-center gap-4">
                    <div
                        className={`p-2 rounded-lg shadow-sm ${expanded ? 'bg-gray-50 text-indigo-500' : 'bg-indigo-500 text-white'}`}
                        onClick={handleDetailClick}
                    >
                        Detalle
                    </div>
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/993067af5ea4a4c041538a25e19bc2604be7f44aabca253d5465dad75ca74f00?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/dea794fe98df3586a8c24bc9cbe3fd5ab8cb41fff78c6837054ba10849216de2?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Editar"
                        className="object-contain shrink-0 w-[30px]"
                        onClick={handleEditClick}
                    />
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e6be53545a674c23db96adba534d034f98a4c3529f9e0a828beb534394283415?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/b2c0af724e64f2a72d83a9fe68fc767f2b746dc3168115915a1d143553c190eb?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Eliminar"
                        className="object-contain shrink-0 w-[30px]"
                        onClick={handleDeleteClick}
                    />
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e596324028b2a73c869ab3a30a2afd29348e42b614d1eaac9c2ef9fce603dfac?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd453a1918970a54ffc2b34f36dd8210408728eb76742b3bef7083b42a1a351?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Más"
                        className="object-contain shrink-0 w-[5px]"
                        onClick={handleMoreClick}
                    />
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <ExpandedClientRow />
            </div>
        </div>
    );
}

export default ClientRow;
