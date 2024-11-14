import React, { useState } from 'react';
import Header from './Header';
import FilterSection from './FilterSection';
import TableHeader from './TableHeader';
import ClientRow from './ClientRow';
import Pagination from './Pagination';
import ExpandedClientRow from './ExpandedClientRow';

function MyContadores() {
    const clients = [
        { name: 'Camilo Osorio', status: 'Por pagar', date: '23-10-2024', contact: 'No disp', rut: '20.792-999-9', paymentDate: '21-03-2022', debt: '100.000' },
        { name: 'Luis Céspedes', status: 'Por pagar', date: '02-11-2024', contact: 'No disp', rut: '20.792-999-9', paymentDate: '21-03-2022', debt: '600.000' },
        { name: 'Andrea Céspedes', status: 'Por pagar', date: '22-03-2024', contact: 'No disp', rut: '20.792-999-9', paymentDate: '21-03-2022', debt: '300.000' },
        { name: 'Constanza Sanhueza', status: 'Al dia', date: '22/02/2024', contact: 'No disp', rut: '20.792-999-9', paymentDate: '21-03-2022', debt: '0' },
        { name: 'Enzo Camerati', status: 'Al dia', date: '10-03-2022', contact: 'No disp', rut: '20.792-999-9', paymentDate: '21-03-2022', debt: '0' },
        // Agrega más clientes según sea necesario
    ];

    // Estado para manejar las filas expandidas
    const [expandedClients, setExpandedClients] = useState({});

    // Función para manejar el cambio de expansión de fila
    const toggleExpansion = (name) => {
        setExpandedClients(prevState => ({
            ...prevState,
            [name]: !prevState[name] // Alterna el estado de expansión para ese cliente
        }));
    };

    return (
        <main className="flex flex-col items-center p-6 min-h-screen" style={{backgroundColor: '#F2F5FF'}}>
            <div className="flex flex-col px-9 py-6 w-full bg-white rounded-3xl shadow-[1px_2px_3px_rgba(93,95,239,0.4)] max-md:px-5 max-md:max-w-full">
                <Header/>
                <FilterSection/>
                <TableHeader/>
                <section className="flex flex-col w-full gap-3">
                    {clients.map((client, index) => (
                        <React.Fragment key={index}>
                            <ClientRow client={client} onClick={() => toggleExpansion(client.name)} expanded={expandedClients[client.name]}/>
                            {/* Si el cliente está expandido, muestra la fila expandida */}
                            {expandedClients[client.name] && <ExpandedClientRow client={client}/>}
                        </React.Fragment>
                    ))}
                </section>
                <Pagination/>
            </div>
        </main>
    );
}

export default MyContadores;
