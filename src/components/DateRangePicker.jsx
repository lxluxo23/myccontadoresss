import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ dateRange, setDateRange }) {
    return (
        <div className="flex items-center gap-3" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            {/* Texto sin caja */}
            <span className="mr-2 text-sm" style={{ letterSpacing: '-2%' }}>Rango Transacciones</span>

            {/* Caja de fecha de inicio */}
            <div className="flex items-center rounded-lg border border-neutral-200 p-1.5">
                <DatePicker
                    selected={dateRange.startDate}
                    onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                    selectsStart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    placeholderText="Fecha inicio"
                    className="text-center text-sm p-1.5 w-[120px]"
                    style={{ letterSpacing: '-2%' }}
                />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/44d6156fde00dc78822de1e824559d926056dc3c603a2c7232d3567cc75dd122?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    alt="Icono Calendario"
                    className="w-3.5 h-3.5 mr-2"
                />
            </div>

            {/* Icono separador */}
            <img
                src="https://cdn.builder.io/api/v1/image/assets/c8e063ba4e294c0496fff8126c800e5e/3ef30c01dc7de1d89b0928bedc2277b1cec1acaf378f9ee1f0694db3fe6470de?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                alt="Icono Separador"
                className="w-5 h-5 mx-3"
            />

            {/* Caja de fecha de fin */}
            <div className="flex items-center rounded-lg border border-neutral-200 p-1.5">
                <DatePicker
                    selected={dateRange.endDate}
                    onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                    selectsEnd
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    minDate={dateRange.startDate}
                    placeholderText="Fecha fin"
                    className="text-center text-sm p-1.5 w-[120px]"
                    style={{ letterSpacing: '-2%' }}
                />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/44d6156fde00dc78822de1e824559d926056dc3c603a2c7232d3567cc75dd122?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    alt="Icono Calendario"
                    className="w-3.5 h-3.5 mr-2"
                />
            </div>
        </div>
    );
}

export default DateRangePicker;
