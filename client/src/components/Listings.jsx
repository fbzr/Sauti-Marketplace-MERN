import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import ListingItem from './ListingItem';
import { Grid, Container, makeStyles, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, CardContent, Collapse, Card } from '@material-ui/core';
import { AddBox, Close } from '@material-ui/icons';
import AddListingForm from './AddListingForm';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '180px'
    }
  }));


const Listings = ({userId}) => {
    const classes = useStyles();
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ id: '', username: '' });
    const [selectedLocation, setSelectedLocation] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if(reload) {
            // Fetch users for the select input
            const fetchUsers = async () => {
                try {
                    const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/users/');
                    setUsers(res.data);
                } catch(err) {
                    console.log(err.message);
                }
            }

            const fetchAllListings = async () => {            
                try {
                    const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/listings');                    
                    setListings(res.data);
                } catch(err) {
                    console.log(err.message);
                }
            }

            fetchUsers();
            fetchAllListings();
            setReload(false);
        } 
    }, [reload])

    // Load locations select dropdown
    useEffect(() => {
        setLocations(listings
            .filter((current, index) => listings.findIndex(item => item.location.toLowerCase() === current.location.toLowerCase()) === index)
            .map(obj => obj.location));
    }, [listings])

    // Fetches data when user selects a filter
    useEffect(() => {
        let res = listings;
        if( selectedLocation !== '' ) {
            res = res.filter(listing => listing.location.toLowerCase() === selectedLocation.toLowerCase());
        }
        if( selectedUser.id !== '') {
            res = res.filter(listing => listing.user_id === selectedUser.id);
        }
        setFilteredListings(res);
    }, [selectedUser, selectedLocation, listings]);

    const handleUserChange = e => setSelectedUser(e.target.value);
    const handleLocationChange = e => setSelectedLocation(e.target.value);

    const handleAddButtonClick = e => setExpanded(!expanded);
    const resetListings = () => {
        setReload(true);
        setExpanded(false);
    }    
    
    return (
        <Container className={classes.root}>
            <Grid container alignItems='flex-end' justify='space-between'>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="user-select-label">Select User</InputLabel>
                        <Select value={selectedUser.id === '' ? '' : selectedUser} labelId='user-select-label' displayEmpty onChange={handleUserChange}>
                            <MenuItem value={{id: ''}}>All Users</MenuItem>
                            {users.map(user => (
                                <MenuItem key={user.id} value={user}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="location-select-label">Locations</InputLabel>
                        <Select value={selectedLocation === '' ? '' : selectedLocation} labelId='location-select-label' displayEmpty={false} onChange={handleLocationChange}>
                            <MenuItem value=''>All Locations</MenuItem>
                            {locations.map(location => (
                                <MenuItem key={location} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <IconButton aria-expanded={expanded} onClick={handleAddButtonClick} aria-label="Add listing">
                        { expanded 
                        ? <Close />
                        : <AddBox /> }
                    </IconButton>
                </Grid>
                <AddListingForm resetListings={resetListings} userId={userId} expanded={expanded} />
            </Grid>
            <Grid justify='flex-start' container>
                { filteredListings.map(item => (
                    <ListingItem userId={userId} key={item.id} listing={item} />
                )) }
            </Grid>
        </Container>
    )
}

export default Listings
