const DetailsTable = ({ movements }) => {
    if (!movements || movements.length === 0) {
        return <p>No hay movimientos registrados.</p>;
    }

    return (
        <section className="bg-white shadow-md rounded-md p-6 my-6">
            <h2 className="text-lg font-bold mb-4">Movimientos Financieros</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Monto</th>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Descripción</th>
                </tr>
                </thead>
                <tbody>
                {movements.map((movement, index) => (
                    <tr key={index}>
                        <td className="p-2 border">${movement.amount.toFixed(2)}</td>
                        <td className="p-2 border">{movement.date}</td>
                        <td className="p-2 border">{movement.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default DetailsTable;
