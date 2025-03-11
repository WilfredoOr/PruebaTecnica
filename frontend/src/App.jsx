

import React, { useEffect, useState } from 'react';
import FinancialChart from './components/FinancialChart';
import InventoryChart from './components/InventoryChart';
import SalesTable from './components/SaleTable';
import SalesFilter from './components/SalesFilter';

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);


  
  useEffect(() => {

    fetch('http://localhost:3000/api/metrics/financial')
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((error) => console.error('Error fetching financial data:', error));


    fetch('http://localhost:3000/api/inventory')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error('Error fetching inventory data:', error));
  }, []);

  return (
    <div className="App">
    <h1>Dashboard Financiero y Logístico</h1>
    <div className="dashboard-container">

      <div className="column">
        <div className="chart-container">
          <h2>Tabla de Facturación</h2>
          <FinancialChart data={financialData} />
        </div>
        <div className="chart-container">
          <h2>Control de Inventarios</h2>
          <InventoryChart data={inventoryData} />
        </div>
      </div>


      <div className="column" >
        <div className="chart-container">
          <h2>Ventas y salidas de Inventario</h2>
          <SalesTable />
        </div>
        <div className="chart-container">
        <SalesFilter />
        </div>
      </div>
      
    </div>
  </div>
  );
}

export default App;