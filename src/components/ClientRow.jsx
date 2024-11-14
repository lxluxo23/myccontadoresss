function ClientRow({ client = {}, expanded, onClick }) {
    const {
        name = "Nombre no disponible",
        status = "Estado no disponible",
        date = "Fecha no disponible",
        contact = "Contacto no disponible",
        rut = "RUT no disponible",
        paymentDate = "Fecha de pago no disponible",
        debt = "0"
    } = client;

    const isExpanded = expanded;

    return (
        <div
            className={`flex items-center gap-10 px-5 py-3 w-full min-h-[50px] bg-white border-b border-gray-200 ${isExpanded ? 'bg-indigo-500' : ''}`}
            onClick={onClick}
        >
            {/* Nombre */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : 'text-green-600'}`}>
                {name}
            </div>

            {/* Estado */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : 'text-zinc-700'}`}>
                {status}
            </div>

            {/* Fecha Última Factura */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : ''}`}>
                {date}
            </div>

            {/* Número */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : ''}`}>
                {contact}
            </div>

            {/* RUT */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : ''}`}>
                {rut}
            </div>

            {/* Fecha de Pago */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : ''}`}>
                {paymentDate}
            </div>

            {/* Deuda */}
            <div className={`flex-1 ${isExpanded ? 'text-white' : ''}`}>
                {debt}
            </div>

            {/* Opciones */}
            <div className="flex gap-4">
                <div
                    className={`p-2 rounded-lg shadow-sm ${isExpanded ? 'bg-gray-50 text-indigo-500' : 'bg-indigo-500 text-white'}`}>
                    Detalle
                </div>
                <img loading="lazy"
                     src={isExpanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/993067af5ea4a4c041538a25e19bc2604be7f44aabca253d5465dad75ca74f00?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/dea794fe98df3586a8c24bc9cbe3fd5ab8cb41fff78c6837054ba10849216de2?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                     alt="" className="object-contain shrink-0 w-[30px]"/>
                <img loading="lazy"
                     src={isExpanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e6be53545a674c23db96adba534d034f98a4c3529f9e0a828beb534394283415?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/b2c0af724e64f2a72d83a9fe68fc767f2b746dc3168115915a1d143553c190eb?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                     alt="" className="object-contain shrink-0 w-[30px]"/>
                <img loading="lazy"
                     src={isExpanded ? "https://cdn.builder.io/api/v1/image/assets/TEMP/e596324028b2a73c869ab3a30a2afd29348e42b614d1eaac9c2ef9fce603dfac?apiKey=c8e063ba4e294c0496fff8126c800e5e&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd453a1918970a54ffc2b34f36dd8210408728eb76742b3bef7083b42a1a351?apiKey=c8e063ba4e294c0496fff8126c800e5e&"}
                     alt="" className="object-contain shrink-0 w-[5px]"/></div>
        </div>
    );
}

export default ClientRow;
