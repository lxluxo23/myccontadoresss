import React from 'react';

function TableHeader({ sortOrder, onSortChange }) {
    const handleClick = () => {
        // Cambia el orden al hacer clic
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        onSortChange(newSortOrder);
    };

    return (
        <div className="flex items-center gap-10 px-5 py-3 font-normal mt-10 mb-3" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            {/* Nombre */}
            <div
                className="w-[200px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer"
                onClick={handleClick}
            >
                Nombre
                <img
                    src={
                        sortOrder === 'asc'
                            ? 'https://cdn.builder.io/api/v1/image/assets%2Fc8e063ba4e294c0496fff8126c800e5e%2Fb02436da6a8cb2a6ea466a8bd683b6383bbf2b0adf6a47b514ba8fcc60d4d425'
                            : 'https://cdn.builder.io/api/v1/image/assets/TEMP/rotated-image-url' // Reemplaza con la URL del icono invertido
                    }
                    alt={`Orden ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
                    className="ml-2 w-[14px] h-[14px] object-contain"
                />
            </div>

            {/* Otros encabezados */}
            <div className="w-[120px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer">
                Estado
            </div>
            <div className="w-[150px] text-[13px] text-[#878790] font-normal flex items-center cursor-pointer">
                Última Actualización
            </div>
            <div className="w-[100px] text-[13px] text-[#878790] font-normal">Contacto</div>
            <div className="w-[150px] text-[13px] text-[#878790] font-normal">RUT</div>
            <div className="w-[180px] text-[13px] text-[#878790] font-normal">Fecha de Pago</div>
            <div className="w-[120px] text-[13px] text-[#878790] font-normal">Opciones</div>
        </div>
    );
}

export default TableHeader;
