import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ dateRange, setDateRange }) {
    return (
        <div className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/44d6156fde00dc78822de1e824559d926056dc3c603a2c7232d3567cc75dd122?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                alt="Icono Calendario"
                className="w-3.5 h-3.5 mr-2"
            />
            <span>Rango Transacciones</span>
            <DatePicker
                selected={dateRange.startDate}
                onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                selectsStart
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                placeholderText="Fecha inicio"
                className="ml-2 text-center"
            />
            <DatePicker
                selected={dateRange.endDate}
                onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                selectsEnd
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                minDate={dateRange.startDate}
                placeholderText="Fecha fin"
                className="ml-2 text-center"
            />
        </div>
    );
}

export default DateRangePicker;
