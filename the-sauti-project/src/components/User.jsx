import React, { useEffect, useState, Fragment } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Listings from './Listings';
import UserListings from './UserListings';
import { Select, FormControl, MenuItem, InputLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

const User = () => {
    // TODO change to dinamic token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6OSwiaWF0IjoxNTgzMjYxMjM4LCJleHAiOjE1ODMzNDc2Mzh9.3teldLkKlu-DW4fM4u5-lTQ_2WVtg4QbXMoA4PKmZcQ';

    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        id: '',
        username: ''
    });
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/users/');
                setUsers(res.data);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        if(selectedUser.id !== '') {
            const fetchData = async () => {
                const config = { headers: { 'Authorization':token } }
                try {
                    const res = await Axios.get(`http://africanmarketplace.ddns.net:5000/api/users/${selectedUser.id}/listings`, config);
                    setListings(res.data);
                } catch(err) {
                    console.log(err.message);
                }
            }
            fetchData();
        }
    }, [selectedUser])

    const handleChange = e => setSelectedUser(e.target.value);

    return (
        <Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="user-select-label">User</InputLabel>
                <Select value={selectedUser} labelId='user-select-label' onChange={handleChange}>
                    {users.map(user => (
                        <MenuItem key={user.id} value={user}>
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* If it's the user's own page it should render UserListings */}
            {/* <Listings listings={listings} />  */}
            {/* <UserListings userListings={listings} user={selectedUser} /> */}
        </Fragment>
    )
}

export default User
