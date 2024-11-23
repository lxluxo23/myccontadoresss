import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import StateSelector from './StateSelector';
import AddClientForm from './AddClientForm';
import ClientRow from './ClientRow';

function FilterSection() {
    const [transactionDateRange, setTransactionDateRange] = useState({ startDate: null, endDate: null });
    const [lastUpdateDate, setLastUpdateDate] = useState(null);
    const [selectedState, setSelectedState] = useState('');
    const [searchName, setSearchName] = useState('');
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [clients, setClients] = useState([]);

    const handleTransactionDateRangeChange = (range) => {
        setTransactionDateRange(range);
        setLastUpdateDate(null);
    };

    const handleLastUpdateDateChange = (date) => {
        setLastUpdateDate(date);
        setTransactionDateRange({ startDate: null, endDate: null });
    };

    const handleNameSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleAddClient = (clientData) => {
        setClients([...clients, clientData]);
        setShowAddClientForm(false);
        setClients([...clients, clientData]);
        setShowAddClientForm(false);
    };

    return (
        <section className="flex flex-wrap justify-between gap-5 mt-10 w-full max-md:max-w-full text-sm">
            <div className="flex flex-wrap gap-4 items-center max-md:max-w-full">
                <StateSelector selectedState={selectedState} setSelectedState={setSelectedState}/>
                <DateRangePicker dateRange={transactionDateRange} setDateRange={handleTransactionDateRangeChange}/>
                <div
                    className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5 w-[222px] h-[40px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac34c89075cc9f5150c0d9188e344b5ab22d341ea722a0b4ce115573d2bf2e7?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                        alt=""
                        className="w-[18px] h-[18px] mr-2"
                    />
                    <input
                        type="text"
                        value={searchName}
                        onChange={handleNameSearchChange}
                        placeholder="Buscar Cliente"
                        className="bg-transparent focus:outline-none h-full w-full"
                    />
                </div>

            </div>

            <button
                onClick={() => setShowAddClientForm(true)}
                className="flex items-center px-3 py-2 font-medium text-white bg-indigo-500 rounded-lg transform transition-all duration-500 ease-in-out hover:bg-indigo-600 hover:scale-105 hover:opacity-90"
            >
                <span>Añadir Cliente</span>
            </button>

            {showAddClientForm && (
                <AddClientForm
                    onClose={() => setShowAddClientForm(false)}
                    onAddClient={handleAddClient}
                />
            )}

            {clients.map((client, index) => (
                <ClientRow
                    key={index}
                    client={client}
                    showAddClientForm={showAddClientForm}
                />
            ))}
        </section>
    );
}

export default FilterSection;