import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandedClientRow from './ExpandedClientRow'; // Asegúrate de importar el componente ExpandedClientRow

function ClientRow({ client = {} }) {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const {
        name = "Nombre no disponible",
        status = "Estado no disponible",
        date = "Fecha no disponible",
        contact = "Contacto no disponible",
        rut = "RUT no disponible",
        paymentDate = "Fecha de pago no disponible",
    } = client;

    const handleRowClick = () => {
        setExpanded(!expanded); // Cambiar estado al hacer clic
    };

    const handleDetailClick = (event) => {
        event.stopPropagation();
        navigate('/spreadsheet'); // Aquí redirige a la página de la hoja de cálculo
    };

    const handleEditClick = (event) => {
        event.stopPropagation(); // Evita que el clic se propague a la fila
        alert("Editar funcionalidad aún no implementada"); // Muestra un mensaje al hacer clic en "Editar"
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation(); // Evita que el clic se propague a la fila
        alert("Eliminar funcionalidad aún no implementada"); // Muestra un mensaje al hacer clic en "Eliminar"
    };

    const handleMoreClick = (event) => {
        event.stopPropagation(); // Evita que el clic se propague a la fila
        alert("Más funcionalidad aún no implementada"); // Muestra un mensaje al hacer clic en "Más"
    };

    return (
        <div>
            <div
                className={`flex items-center gap-10 px-5 py-3 w-full min-h-[50px] border border-gray-200 rounded-lg cursor-pointer ${expanded ? 'bg-[#5D5FEF]' : 'bg-white'}`}
                onClick={handleRowClick}
            >
                {/* Nombre */}
                <div className={`w-[200px] ${expanded ? 'text-white' : 'text-green-600'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {name}
                </div>

                {/* Estado */}
                <div className={`w-[120px] ${expanded ? 'text-white' : 'text-zinc-700'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {status}
                </div>

                {/* Fecha Última Factura */}
                <div className={`w-[150px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {date}
                </div>

                {/* Número */}
                <div className={`w-[100px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {contact}
                </div>

                {/* RUT */}
                <div className={`w-[150px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {rut}
                </div>

                {/* Fecha de Pago */}
                <div className={`w-[180px] ${expanded ? 'text-white' : 'text-gray-600'} font-sans text-[14px]`} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {paymentDate}
                </div>

                {/* Opciones */}
                <div className="w-[120px] flex justify-center gap-4">
                    <div
                        className={`p-2 rounded-lg shadow-sm ${expanded ? 'bg-gray-50 text-indigo-500' : 'bg-indigo-500 text-white'}`}
                        onClick={handleDetailClick} // Aquí se maneja el clic
                        style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}
                    >
                        Detalle
                    </div>
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/993067af5ea4a4c041538a25e19bc2604be7f44aabca253d5465dad75ca74f00?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/dea794fe98df3586a8c24bc9cbe3fd5ab8cb41fff78c6837054ba10849216de2?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Editar"
                        className="object-contain shrink-0 w-[30px]"
                        onClick={handleEditClick} // Agrega el manejador de clic aquí
                    />
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e6be53545a674c23db96adba534d034f98a4c3529f9e0a828beb534394283415?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/b2c0af724e64f2a72d83a9fe68fc767f2b746dc3168115915a1d143553c190eb?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Eliminar"
                        className="object-contain shrink-0 w-[30px]"
                        onClick={handleDeleteClick} // Agrega el manejador de clic aquí
                    />
                    <img
                        loading="lazy"
                        src={expanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e596324028b2a73c869ab3a30a2afd29348e42b614d1eaac9c2ef9fce603dfac?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd453a1918970a54ffc2b34f36dd8210408728eb76742b3bef7083b42a1a351?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                        alt="Más"
                        className="object-contain shrink-0 w-[5px]"
                        onClick={handleMoreClick} // Agrega el manejador de clic aquí
                    />
                </div>
            </div>

            {/* ExpandedClientRow: animación al abrir/cerrar */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ transitionProperty: 'max-height, opacity' }}
            >
                <ExpandedClientRow />
            </div>
        </div>
    );
}

export default ClientRow;
