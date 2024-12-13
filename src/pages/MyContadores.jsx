import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/MyCcontadoresComp/Header';
import FilterSection from '../components/MyCcontadoresComp/FilterSection';
import TableHeader from '../components/MyCcontadoresComp/TableHeader';
import ClientRow from '../components/MyCcontadoresComp/ClientRow';
import Pagination from '../components/MyCcontadoresComp/Pagination';
import { useCliente } from '../components/context/ClienteContext'; // Corrige la ruta del contexto
import { useNavigate } from 'react-router-dom';

function MyContadores() {
    const [clients, setClients] = useState([]);
    const [searchName, setSearchName] = useState(''); // Estado para la búsqueda
    const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden de la lista
    const { clearCliente } = useCliente(); // Función para limpiar el cliente seleccionado
    const navigate = useNavigate();
    // Función para añadir un nuevo cliente

    const handleAddClient = async (newClient) => {
        try {
            const response = await axios.post('https://backend.cobros.myccontadores.cl/api/clientes', newClient);
            setClients((prevClients) => [...prevClients, response.data]);
        } catch (error) {
            console.error('Error al añadir el cliente:', error);
        }
    };
 
    // Cargar los clientes desde el backend
    useEffect(() => {
        clearCliente(); // Limpia el cliente seleccionado al cargar la lista

        const fetchClients = async () => {
            try {
                const response = await axios.get('https://backend.cobros.myccontadores.cl/api/clientes'); // Endpoint del backend
                const sortedClients = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setClients(sortedClients);
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
            }
        };

        fetchClients();
    }, [clearCliente]);

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

    // Navegar a la página de detalles del cliente
    const handleRowClick = (clientId) => {
        navigate(`/spreadsheet/${clientId}`); // Navega a la página del cliente con su ID
    };

    return (
        <main className="flex flex-col items-center p-6 min-h-screen" style={{ backgroundColor: '#F2F5FF' }}>
            <div
                className="flex flex-col px-9 py-6 w-full max-w-[1400px] min-h-[892px] bg-white rounded-3xl shadow-md max-md:px-5 mt-16">
                <Header />
                <FilterSection
                    onAddClient={handleAddClient} // Pasa la función a FilterSection
                    onSearchNameChange={setSearchName}
                />
                <TableHeader
                    sortOrder={sortOrder} // Estado actual del orden
                    onSortChange={handleSortChange} // Controlador para cambiar el orden
                />
                <section className="flex flex-col w-full gap-3">
                    {filteredClients.map(client => (
                        <ClientRow
                            key={client.id}
                            client={{
                                ...client,
                                email: client.email || "No disponible",
                                telefono: client.telefono || "No disponible",
                                direccion: client.direccion || "No disponible"
                            }}
                            onClick={() => handleRowClick(client.id)}
                        />
                    ))}
                </section>
                <Pagination />
            </div>
        </main>
    );
}

export default MyContadores;
