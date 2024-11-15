import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSection from '../components/FilterSection';
import TableHeader from '../components/TableHeader';
import ClientRow from '../components/ClientRow';
import Pagination from '../components/Pagination';
import ExpandedClientRow from '../components/ExpandedClientRow';

function MyContadores() {
    const clients = [
        {
            name: 'Camilo Osorio',
            status: 'Por pagar',
            date: '23-10-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Luis Céspedes',
            status: 'Por pagar',
            date: '02-11-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022',
        },
        {
            name: 'Andrea Céspedes',
            status: 'Por pagar',
            date: '22-03-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Constanza Sanhueza',
            status: 'Al dia',
            date: '22/02/2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Enzo Camerati',
            status: 'Al dia',
            date: '10-03-2022',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Camilo Osorio',
            status: 'Por pagar',
            date: '23-10-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Luis Céspedes',
            status: 'Por pagar',
            date: '02-11-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022',
        },
        {
            name: 'Andrea Céspedes',
            status: 'Por pagar',
            date: '22-03-2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Constanza Sanhueza',
            status: 'Al dia',
            date: '22/02/2024',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        },
        {
            name: 'Enzo Camerati',
            status: 'Al dia',
            date: '10-03-2022',
            contact: 'No disp',
            rut: '20.792-999-9',
            paymentDate: '21-03-2022'
        }
    ];

    const [expandedClients, setExpandedClients] = useState({});

    const toggleExpansion = (name) => {
        setExpandedClients(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    return (
        <main className="flex flex-col items-center p-6 min-h-screen" style={{backgroundColor: '#F2F5FF'}}>
            <div
                className="flex flex-col px-9 py-6 w-full max-w-[1400px] min-h-[892px] bg-white rounded-3xl shadow-[1px_2px_3px_rgba(93,95,239,0.4)] max-md:px-5 mt-16">
                <Header/>
                <FilterSection/>
                <TableHeader/>
                <section className="flex flex-col w-full gap-3">
                    {clients.map((client, index) => (
                        <React.Fragment key={index}>
                            <ClientRow client={client} onClick={() => toggleExpansion(client.name)}
                                       expanded={expandedClients[client.name]}/>
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
