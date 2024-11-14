import React from 'react';

function TableHeader() {
    return (
        <div className="flex items-center gap-10 px-5 py-3 font-normal mt-10 mb-3" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            <div className="w-[200px] text-[13px] text-[#878790] font-normal">Nombre</div>
            <div className="w-[120px] text-[13px] text-[#878790] font-normal">Estado</div>
            <div className="w-[150px] text-[13px] text-[#878790] font-normal">Última Actualización</div>
            <div className="w-[100px] text-[13px] text-[#878790] font-normal">Contacto</div>
            <div className="w-[150px] text-[13px] text-[#878790] font-normal">RUT</div>
            <div className="w-[180px] text-[13px] text-[#878790] font-normal">Fecha de Pago</div>
            <div className="w-[120px] text-[13px] text-[#878790] font-normal">Opciones</div>
        </div>
    );
}

export default TableHeader;
