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
    const [searchName, setSearchName] = useState(''); // Estado para la búsqueda
    const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden

    // Cargar los clientes desde el backend
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('https://backend.cobros.myccontadores.cl/api/clientes');
                const sortedClients = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setClients(sortedClients);
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
            }
        };

        fetchClients();
    }, []);

    const handleAddClient = (newClient) => {
        axios.post('https://backend.cobros.myccontadores.cl/api/clientes', newClient)
            .then(() => {
                console.log('Cliente agregado exitosamente.');
                return axios.get('https://backend.cobros.myccontadores.cl/api/clientes');
            })
            .then(response => {
                const sortedClients = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setClients(sortedClients);
            })
            .catch(error => {
                console.error('Error al añadir el cliente:', error);
                alert('Hubo un error al agregar el cliente.');
            });
    };

    // Cambiar el orden de la lista
    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
        const sortedClients = [...clients].sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        });
        setClients(sortedClients);
    };

    // Filtrar clientes por nombre
    const filteredClients = clients.filter(client =>
        client.nombre.toLowerCase().includes(searchName.toLowerCase())
    );

    const toggleExpansion = (id) => {
        setExpandedClients(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <main className="flex flex-col items-center p-6 min-h-screen" style={{ backgroundColor: '#F2F5FF' }}>
            <div
                className="flex flex-col px-9 py-6 w-full max-w-[1400px] min-h-[892px] bg-white rounded-3xl shadow-[1px_2px_3px_rgba(93,95,239,0.4)] max-md:px-5 mt-16">
                <Header />
                <FilterSection
                    onAddClient={handleAddClient}
                    onSearchNameChange={setSearchName} // Pasar el controlador de búsqueda
                />
                <TableHeader
                    sortOrder={sortOrder} // Pasar el estado del orden actual
                    onSortChange={handleSortChange} // Manejar el cambio de orden
                />
                <section className="flex flex-col w-full gap-3">
                    {filteredClients.map((client) => (
                        <React.Fragment key={client.id}>
                            <ClientRow
                                client={client}
                                onClick={() => toggleExpansion(client.id)}
                                expanded={expandedClients[client.id]}
                                onDelete={() => setClients(clients.filter(c => c.id !== client.id))}
                            />
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
