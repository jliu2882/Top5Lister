import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorE2, setAnchorE2] = useState(null);
    const isMenuOpen = Boolean(anchorE2);

    const handleProfileMenuOpen = (event) => {
        setAnchorE2(event.currentTarget);
        console.log("open menu; doesn't work rn");
        console.log("Publish Date(Newest)\nPublish Date(Oldest)\nViews\nLikes\nDislikes");
    };

    const handleMenuClose = () => {
        setAnchorE2(null);
        console.log("close menu");
    };

    const menuId = 'primary-search-account-menu';
    const loggedInMenu =
        <Menu
            anchorE2={anchorE2}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>Hi</MenuItem>
        </Menu>;
let menu = loggedInMenu;

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";


    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">

            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <HomeOutlinedIcon style={{width:50, height: 50}}></HomeOutlinedIcon>
            <GroupsOutlinedIcon style={{width:50, height: 50}}></GroupsOutlinedIcon>
            <PersonOutlineOutlinedIcon style={{width:50, height: 50}}></PersonOutlineOutlinedIcon>
            <FunctionsIcon style={{width:50, height: 50}}></FunctionsIcon>
            <TextField style ={{width: '25%', backgroundColor: 'white'}} id="outlined-basic" label="Search" variant="outlined" />

            <span id="sort-by">Sort By</span>
            <IconButton id="sort-icon"
                aria-controls={menuId}
                aria-haspopup="true"

                onClick={handleProfileMenuOpen}
            >
                <SortIcon style={{width:50, height: 50}}>
                    { menu }
                </SortIcon>
            </IconButton>


            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>)
}

export default HomeScreen;