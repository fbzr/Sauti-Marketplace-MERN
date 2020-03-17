import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';
import { Container } from '@material-ui/core';

const PriceList = () => {
    const token = sessionStorage.getItem('token');
    
    const [prices, setPrices] = useState([]);
    const [table, setTable] = useState({
        columns: [
            { title: 'Product', field: 'product' },
            { title: 'Category', field: 'product_cat' },
            { title: 'Subcategory', field: 'sub_category' },
            { title: 'Avg. Price', field: 'avg_price', type: 'numeric' }
        ],
        data: []
    });

    useEffect(() => {
        const config = { headers: { 'Authorization':token } }
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/prices', config);
                setPrices(res.data);
            } catch(err) {
                console.log(err.message);
            }   
        }
        fetchData();
    }, [token]);

    useEffect(() => {
        setTable(table => ({
            ...table,
            data: prices.map(item => (item))
        }));
    }, [prices]);

    const addPrice = async newData => {
        try {
            const config = { headers: { 'Authorization':token } }
            const res = await Axios.post('http://africanmarketplace.ddns.net:5000/api/prices', newData, config);
            if (res.statusText === 'Created') {
                setPrices(prevPrices => [...prevPrices, {...newData, id: res.data.id}]);
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    const removePrice = async oldData => {
        try {
            const res = await Axios.delete(`http://africanmarketplace.ddns.net:5000/api/prices/${oldData.id}`, {
                headers: {
                    'Authorization': token
                },
                data: oldData
            });
            console.log(res);
        } catch(err) {
            console.log(err.message);
        } finally {
            setPrices(prevPrices => {
                const index = prevPrices.findIndex(element => element.id === oldData.id);
                prevPrices.splice(index, 1);
                return [ ...prevPrices ];
            })
        }
    }

    const editPrice = async (oldData, newData) => {
        // const config = { headers: { 'Authorization':token } }
        // try {
        //     const res = await Axios.put(`http://africanmarketplace.ddns.net:5000/api/prices/${oldData.id}`, newData, config);
        //     console.log(res);
        // } catch(err) {
        //     console.log(err.message);
        // } finally {
        //     setPrices(prevPrices => {
        //         const data = [...prevPrices];
        //         data[data.indexOf(oldData)] = newData;
        //         console.log(data);
        //         return data;
        //     })
        // }     
        
        setPrices(prevPrices => {
            const data = [...prevPrices];
            data[data.indexOf(oldData)] = newData;
            console.log(data);
            return data;
        })
    }


    return (
        <Container>
            <MaterialTable
            title="Price List"
            columns={table.columns}
            data={table.data}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        addPrice(newData);
                    }, 600);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                            editPrice(oldData, newData);
                        }
                    }, 600);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        removePrice(oldData);
                    }, 600);
                }),
            }}
            />
        </Container>
      );
}

export default PriceList
