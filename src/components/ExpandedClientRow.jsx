import React, { useState } from 'react';

function ExpandedClientRow() {
  // El estado ya no es necesario para el dropdown
  const [isXlsxClicked, setIsXlsxClicked] = useState(false);

  // Alternar la funcionalidad del botón
  const handleXlsxClick = () => {
    setIsXlsxClicked(true);
    // Aquí puedes agregar la lógica para descargar el archivo XLSX
    // o cualquier acción adicional que desees
    alert("Descargar XLSX - Funcionalidad aún no implementada");
  };

  return (
      <div className="flex flex-col w-full bg-white rounded-xl border border-solid border-slate-200 shadow-[0px_2px_9px_rgba(0,0,0,0.03)]">
        {/* Fila morada de encabezado */}
        <div className="flex gap-10 items-start px-5 pt-5 pb-2 -mt-1.5 text-indigo-500 bg-indigo-100">
          <div className="w-[200px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>Mes</div>
          <div className="w-[120px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>Honorarios</div>
          <div className="w-[150px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>IVA</div>
          <div className="w-[100px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>Imposiciones</div>
          <div className="grow shrink self-stretch w-[351px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>X</div>
        </div>

        {/* Filas de datos - Alineados con el TableHeader */}
        <div className="flex items-center gap-10 px-5 py-3 text-zinc-700">
          {/* Mes */}
          <div className="w-[200px] text-zinc-700 font-sans text-[14px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            Enero
          </div>

          {/* Honorarios */}
          <div className="w-[120px] text-zinc-700 font-sans text-[14px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            5000
          </div>

          {/* IVA */}
          <div className="w-[150px] text-zinc-700 font-sans text-[14px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            950
          </div>

          {/* Imposiciones */}
          <div className="w-[100px] text-zinc-700 font-sans text-[14px]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            300
          </div>

          {/* Columna X */}
          <div className="grow shrink self-stretch w-[351px]"></div>
        </div>

        {/* Botón abajo a la derecha */}
        <div className="flex justify-end mt-5 px-5 mb-3">
          <div
              className="p-2 rounded-lg shadow-sm bg-indigo-500 text-white cursor-pointer"
              onClick={handleXlsxClick}
              style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}
          >
            Descargar XLSX
          </div>
        </div>
      </div>
  );
}

export default ExpandedClientRow;
