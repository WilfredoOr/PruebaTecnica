import React, { useEffect, useState } from 'react';

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);


  useEffect(() => {

    fetch('http://localhost:3000/api/sales')
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        setFilteredSales(data);
      })
      .catch((error) => console.error('Error fetching sales data:', error));


    fetch('http://localhost:3000/api/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations data:', error));
  }, []);


  const filterSalesByLocation = (location) => {
    if (location === 'all') {
      setFilteredSales(sales);
    } else {
      const filtered = sales.filter((sale) => sale.location === location);
      setFilteredSales(filtered);
    }
  };


  const getLocationDetails = (locationName) => {
    return locations.find((loc) => loc.location_name === locationName);
  };


  const closeTooltip = () => {
    setSelectedLocation(null);
  };

  return (
    <div>

      <select onChange={(e) => filterSalesByLocation(e.target.value)}>
        <option value="all">Todas las ubicaciones</option>
        {locations.map((loc) => (
          <option key={loc.location_id} value={loc.location_name}>
            {loc.location_name}
          </option>
        ))}
      </select>

 
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cantidad Vendida</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => {
            const locationDetails = getLocationDetails(sale.location);
            return (
              <tr
                key={`${sale.date}-${sale.product_id}`}
                onClick={() => setSelectedLocation(locationDetails)}
                style={{ cursor: 'pointer' }}
              >
                <td>{sale.date}</td>
                <td>{sale.product_id}</td>
                <td>{sale.quantity_sold}</td>
                <td>{sale.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>


      {selectedLocation && (
        <div className="tooltip">
   
          <button className="close-button" onClick={closeTooltip}>
            ×
          </button>
          <h3>Detalles de la Ubicación</h3>
          <p><strong>ID:</strong> {selectedLocation.location_id}</p>
          <p><strong>Nombre:</strong> {selectedLocation.location_name}</p>
          <p><strong>Dirección:</strong> {selectedLocation.address}</p>
        </div>
      )}
    </div>
  );
};

export default SalesTable;