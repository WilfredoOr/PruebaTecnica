const express = require('express');
const router = express.Router();

const jsonData = require('../data/valoresPrueba.json');

router.get('/metrics/financial', (req, res) => {
    res.json(jsonData.financial_metrics);
});


router.get('/inventory', (req, res) => {
    res.json(jsonData.inventory);
});

router.get('/sales', (req, res) => {
    res.json(jsonData.sales_data);
});

router.get('/locations', (req, res) => {
    res.json(jsonData.locations);
});

router.get('/sales/filter', (req, res) => {
    const filterData = req.query; 

    const filterById = jsonData.sales_data.filter(j => {
        if(!filterData.product_id ){
           return true
        }
        return j.product_id ==filterData.product_id;
    } );
    const filterByLocation = filterById.filter(j => {
        if(!filterData.location){
           return true
        }
        return j.location ==filterData.location;
    } );
    const filterByDate = filterByLocation.filter(j => {
        if(!filterData.date ){
           return true
        }
        return j.date ==filterData.date;
    } );

    res.json(filterByDate);
});


module.exports = router;