const Overview = ({ finance }) => {
    if (!finance) {
        return <p>No hay datos disponibles.</p>;
    }

    const {
        totalPayments = 0,
        totalDebt = 0,
        pendingPayments = 0,
        nextDueDate = "No disponible"
    } = finance;

    return (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
            <div className="bg-white shadow-md p-4 rounded-md text-center">
                <h2 className="text-xl font-bold">Total Pagado</h2>
                <p className="text-2xl">${totalPayments.toFixed(2)}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-md text-center">
                <h2 className="text-xl font-bold">Deuda Total</h2>
                <p className="text-2xl">${totalDebt.toFixed(2)}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-md text-center">
                <h2 className="text-xl font-bold">Pagos Pendientes</h2>
                <p className="text-2xl">{pendingPayments}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-md text-center">
                <h2 className="text-xl font-bold">Próxima Fecha</h2>
                <p className="text-2xl">{nextDueDate}</p>
            </div>
        </section>
    );
};

export default Overview;
