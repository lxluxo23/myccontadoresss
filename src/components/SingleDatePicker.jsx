import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SingleDatePicker({ selectedDate, setSelectedDate }) {
    return (
        <div className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb4768184554818f870328312764cbf7a9b7f02f2c969284c54c257f2539cd6?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                alt="Icono Calendario"
                className="w-3.5 h-3.5 mr-2"
            />
            <span>Fecha Última Actualización</span>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Seleccione fecha"
                className="ml-2 text-center"
            />
        </div>
    );
}

export default SingleDatePicker;
