import React from 'react';

function TableHeader() {
    return (
        <div className="flex items-center gap-10 px-5 py-3 bg-white-100 border-b border-gray-300">
            <div className="w-[200px] font-semibold text-gray-600">Nombre</div>
            <div className="w-[120px] font-semibold text-gray-600">Estado</div>
            <div className="w-[150px] font-semibold text-gray-600">Última Actualizacion</div>
            <div className="w-[100px] font-semibold text-gray-600">Contacto</div>
            <div className="w-[150px] font-semibold text-gray-600">RUT</div>
            <div className="w-[180px] font-semibold text-gray-600">Fecha de Pago</div>
            <div className="w-[120px] font-semibold text-gray-600">Opciones</div>
        </div>
    );
}

export default TableHeader;