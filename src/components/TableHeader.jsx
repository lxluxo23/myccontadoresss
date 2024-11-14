import React from 'react';

function TableHeader() {
    const handleClick = (section) => {
        console.log(`${section} funcionalidad aún no implementada`); // Log para saber qué sección se hizo clic
    };

    return (
        <div className="flex items-center gap-10 px-5 py-3 font-normal mt-10 mb-3" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            {/* Nombre */}
            <div className="w-[200px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer" onClick={() => handleClick('Nombre')}>
                Nombre
                <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc8e063ba4e294c0496fff8126c800e5e%2Fb02436da6a8cb2a6ea466a8bd683b6383bbf2b0adf6a47b514ba8fcc60d4d425"
                    alt="Icono Nombre"
                    className="ml-2 w-[14px] h-[14px] object-contain"
                />
            </div>

            {/* Estado */}
            <div className="w-[120px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer" onClick={() => handleClick('Estado')}>
                Estado
                <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc8e063ba4e294c0496fff8126c800e5e%2Fb02436da6a8cb2a6ea466a8bd683b6383bbf2b0adf6a47b514ba8fcc60d4d425"
                    alt="Icono Estado"
                    className="ml-2 w-[14px] h-[14px] object-contain"
                />
            </div>

            {/* Última Actualización */}
            <div className="w-[150px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer" onClick={() => handleClick('Última Actualización')}>
                Última Actualización
                <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc8e063ba4e294c0496fff8126c800e5e%2Fb02436da6a8cb2a6ea466a8bd683b6383bbf2b0adf6a47b514ba8fcc60d4d425"
                    alt="Icono Última Actualización"
                    className="ml-2 w-[14px] h-[14px] object-contain"
                />
            </div>

            {/* Contacto */}
            <div className="w-[100px] text-[13px] text-[#878790] font-normal">Contacto</div>

            {/* RUT */}
            <div className="w-[150px] text-[13px] text-[#878790] font-normal">RUT</div>

            {/* Fecha de Pago */}
            <div className="w-[180px] text-[13px] text-[#878790] font-normal">Fecha de Pago</div>

            {/* Opciones */}
            <div className="w-[120px] text-[13px] text-[#878790] font-normal">Opciones</div>
        </div>
    );
}

export default TableHeader;
