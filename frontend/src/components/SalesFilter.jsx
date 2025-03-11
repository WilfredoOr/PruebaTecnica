import React, { useState, useEffect } from 'react';

const SalesFilter = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [date, setDate] = useState('');
    const [productId, setProductId] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = new URL('http://localhost:3000/api/sales/filter');
                if (date) url.searchParams.append('date', date);
                if (productId) url.searchParams.append('product_id', productId);
                if (location) url.searchParams.append('location', location);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                setFilteredData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [date, productId, location]);

    return (
        <div>
            <h2>Filtrar Ventas</h2>
            <form>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ID Producto"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </form>

            {loading && <p className="loading-message">Cargando...</p>}
            {error && <p className="error-message">{error}</p>}

            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>ID Producto</th>
                        <th>Cantidad Vendida</th>
                        <th>Ubicación</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.date}</td>
                            <td>{sale.product_id}</td>
                            <td>{sale.quantity_sold}</td>
                            <td>{sale.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesFilter;