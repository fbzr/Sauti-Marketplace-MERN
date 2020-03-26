import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Container } from '@material-ui/core';
// crud operations
import { getAllPrices, addPrice, removePrice, editPrice } from '../crud/prices';

const PriceList = () => {  
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
        const fetchData = async () => {
            try {
                const res = await getAllPrices();
                setPrices(res.data);
            } catch(err) {
                console.log(err.message);
            }   
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(prices) {
            setTable(table => ({
                ...table,
                data: prices.map(item => (item))
            }));
        }
    }, [prices]);

    const handleAddPrice = async newData => {
        try {
            const res = await addPrice(newData);
            setPrices(prevPrices => [...prevPrices, {...newData, _id: res.data._id}]);
        } catch(err) {
            console.log(err.message);
        }
    }

    const handleRemovePrice = async oldData => {
        try {
            await removePrice(oldData._id);
        } catch(err) {
            console.log(err.message);
        } finally {
            setPrices(prevPrices => {
                const index = prevPrices.findIndex(element => element._id === oldData._id);
                prevPrices.splice(index, 1);
                return [ ...prevPrices ];
            })
        }
    }

    const handleEditPrice = async (oldData, newData) => {
        try {
            await editPrice(newData);
        } catch(err) {
            console.log(err.message);
        } finally {
            setPrices(prevPrices => {
                const data = [...prevPrices];
                data[data.indexOf(oldData)] = newData;
                console.log(data);
                return data;
            })
        }     
        
        setPrices(prevPrices => {
            const data = [...prevPrices];
            data[data.indexOf(oldData)] = newData;
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
                        handleAddPrice(newData);
                    }, 600);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                            handleEditPrice(oldData, newData);
                        }
                    }, 600);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        handleRemovePrice(oldData);
                    }, 600);
                }),
            }}
            />
        </Container>
      );
}

export default PriceList
