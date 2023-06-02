import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'

const CustomListItem = ({ icon, text, to }) => {
    return (
        <ListItem>
            <ListItemButton component={Link} to={to}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}

export default CustomListItem;