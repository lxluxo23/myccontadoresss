import React, { useState } from 'react';
import ClientRow from './ClientRow';
import ExpandedClientRow from './ExpandedClientRow';

function ClientList({ clients }) {
    const [expandedClient, setExpandedClient] = useState(null);

    const handleRowClick = (clientId) => {
        setExpandedClient(expandedClient === clientId ? null : clientId);
    };

    return (
        <div>
            {clients.map((client) => (
                <div key={client.id}>
                    <ClientRow
                        client={client}
                        expanded={expandedClient === client.id}
                        onClick={() => handleRowClick(client.id)}
                    />
                    {expandedClient === client.id && <ExpandedClientRow />}
                </div>
            ))}
        </div>
    );
}

export default ClientList;
