import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import SingleDatePicker from './SingleDatePicker';
import StateSelector from './StateSelector';

function FilterSection() {
    // Estados para los filtros
    const [transactionDateRange, setTransactionDateRange] = useState({ startDate: null, endDate: null });
    const [lastUpdateDate, setLastUpdateDate] = useState(null);
    const [selectedState, setSelectedState] = useState('');
    const [searchName, setSearchName] = useState(''); // Estado para el filtro de nombre

    // Lógica de exclusión mutua para los filtros de fecha
    const handleTransactionDateRangeChange = (range) => {
        setTransactionDateRange(range);
        setLastUpdateDate(null); // Limpiar última actualización al activar rango de transacciones
    };

    const handleLastUpdateDateChange = (date) => {
        setLastUpdateDate(date);
        setTransactionDateRange({ startDate: null, endDate: null }); // Limpiar rango de transacciones al activar última actualización
    };

    // Manejo del cambio en el input de búsqueda por nombre
    const handleNameSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    return (
        <section className="flex flex-wrap justify-between gap-5 mt-10 w-full max-md:max-w-full text-sm">
            <div className="flex flex-wrap gap-4 items-center max-md:max-w-full">

                {/* Filtro de Estado */}
                <StateSelector selectedState={selectedState} setSelectedState={setSelectedState} />

                {/* Filtro de Rango de Fechas de Transacciones */}
                <DateRangePicker dateRange={transactionDateRange} setDateRange={handleTransactionDateRangeChange} />

                {/* Filtro de Fecha de Última Actualización */}
                <SingleDatePicker selectedDate={lastUpdateDate} setSelectedDate={handleLastUpdateDateChange} />

                {/* Filtro de Nombre Cliente */}
                <div className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5 w-[222px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac34c89075cc9f5150c0d9188e344b5ab22d341ea722a0b4ce115573d2bf2e7?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                        alt=""
                        className="w-[18px] h-[18px] mr-2"
                    />
                    <input
                        type="text"
                        value={searchName}
                        onChange={handleNameSearchChange} // Cambiar el nombre a medida que el usuario escribe
                        placeholder="Buscar Cliente"
                        className="bg-transparent focus:outline-none"
                    />
                </div>
            </div>

            {/* Botón de Contacto */}
            <button className="flex items-center px-3 py-2 font-medium text-white bg-indigo-500 rounded-lg">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc8e063ba4e294c0496fff8126c800e5e%2Fc05b811e45c841eebd0409533b748374"
                    alt=""
                    className="w-[17px] h-[17px] mr-2"
                />
                <span>Añadir Cliente</span>
            </button>
        </section>
    );
}

export default FilterSection;