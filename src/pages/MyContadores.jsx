import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/MyCcontadoresComp/Header';
import FilterSection from '../components/MyCcontadoresComp/FilterSection';
import TableHeader from '../components/MyCcontadoresComp/TableHeader';
import ClientRow from '../components/MyCcontadoresComp/ClientRow';
import Pagination from '../components/MyCcontadoresComp/Pagination';
import ExpandedClientRow from '../components/MyCcontadoresComp/ExpandedClientRow';

function MyContadores() {
    const [clients, setClients] = useState([]);
    const [expandedClients, setExpandedClients] = useState({});

    // Cargar los clientes desde el backend
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clientes');
                setClients(response.data);
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
            }
        };

        fetchClients();
    }, []);

    const toggleExpansion = (id) => {
        setExpandedClients(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <main className="flex flex-col items-center p-6 min-h-screen" style={{backgroundColor: '#F2F5FF'}}>
            <div
                className="flex flex-col px-9 py-6 w-full max-w-[1400px] min-h-[892px] bg-white rounded-3xl shadow-[1px_2px_3px_rgba(93,95,239,0.4)] max-md:px-5 mt-16">
                <Header />
                <FilterSection />
                <TableHeader />
                <section className="flex flex-col w-full gap-3">
                    {clients.map((client) => (
                        <React.Fragment key={client.id}>
                            <ClientRow client={client} onClick={() => toggleExpansion(client.id)}
                                       expanded={expandedClients[client.id]} onDelete={() => setClients(clients.filter(c => c.id !== client.id))} />
                            {expandedClients[client.id] && <ExpandedClientRow client={client} />}
                        </React.Fragment>
                    ))}
                </section>
                <Pagination />
            </div>
        </main>
    );
}

export default MyContadores;

