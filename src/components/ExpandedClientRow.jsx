import React from 'react';

function ExpandedClientRow() {
  return (
      <div className="flex flex-col pb-2.5 mt-5 w-full bg-white rounded-xl border border-solid border-slate-200 shadow-[0px_2px_9px_rgba(0,0,0,0.03)] max-md:max-w-full" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
        <div className="flex gap-10 items-start px-5 pt-5 pb-2 -mt-1.5 text-center text-indigo-500 bg-indigo-100 max-md:max-w-full">
          <div data-layername="nr">Nr</div>
          <div data-layername="nombre">Nombre</div>
          <div data-layername="estado">Estado</div>
          <div data-layername="ilosc">Ilość</div>
          <div data-layername="costoFactura">Costo factura</div>
          <div data-layername="x" className="grow shrink self-stretch w-[351px]">
            X
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-between items-start mt-4 ml-5 max-w-full text-zinc-700 w-[836px]">
          <div className="flex flex-col self-stretch whitespace-nowrap">
            <div className="flex gap-5 justify-between">
              <div data-layername="sharedWithMe">1</div>
              <div data-layername="sharedWithMe">X</div>
            </div>
            <div className="flex gap-5 justify-between mt-4">
              <div data-layername="sharedWithMe">2</div>
              <div data-layername="sharedWithMe">Y</div>
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <div className="flex gap-5 justify-between whitespace-nowrap">
              <div data-layername="pagado">Pagado</div>
              <div data-layername="2">2</div>
            </div>
            <div className="flex gap-5 justify-between mt-3 max-md:mr-0.5">
              <div data-layername="porPagar">Por pagar</div>
              <div data-layername="1">1</div>
            </div>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex gap-5 justify-between">
              <div data-layername="150000">150.000</div>
              <div data-layername="x">X</div>
            </div>
            <div className="flex gap-5 justify-between mt-3">
              <div data-layername="150000">150.000</div>
              <div data-layername="x">X</div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 justify-center items-center self-end mt-9 text-center text-gray-50 max-md:mr-2.5">
          <button className="flex gap-2.5 justify-center items-center self-stretch p-2.5 my-auto bg-indigo-500 rounded-lg shadow-sm w-[166px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7589d98d68e2a5586a4673a715a5a1293c5e451280b237e515be5d69b849d324?apiKey=c8e063ba4e294c0496fff8126c800e5e&" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
            <span data-layername="descargarXlsx" className="self-stretch my-auto">
            Descargar XLSX
          </span>
          </button>
        </div>
      </div>
  );
}

export default ExpandedClientRow;
