import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../assets/logo.png'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CustomListItem from '../components/Sidenav/CustomListItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Layout({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color='primary'>
                <Toolbar>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <img src={Logo} width={240} height={60} />
                </Toolbar>
                <Divider />
                <List sx={{ flexGrow: 1 }}>
                    {user.rol === 'admin' ? (
                        <>
                            <CustomListItem icon={<DashboardIcon />} text='Dashboard' to='/reporte' />
                            <Divider />
                            <CustomListItem icon={<AddShoppingCartIcon />} text='Ventas' to='/ventas' />
                            <CustomListItem icon={<PersonIcon />} text='Clientes' to='/listaClientes' />
                            <CustomListItem icon={<PersonIcon />} text='Empleados' to='/listaEmpleados' />
                            <CustomListItem icon={<InventoryIcon />} text='Productos' to='/listaProductos' />
                            <CustomListItem icon={<PersonIcon />} text='Proveedores' to='/lista_proveedores' />
                        </>
                    ) : user.rol === 'caja' ? (
                        <>
                            <CustomListItem icon={<AddShoppingCartIcon />} text='Ventas' to='/ventas' />
                            <CustomListItem icon={<PersonIcon />} text='Clientes' to='/listaClientes' />
                        </>
                    ) : user.rol === 'entrenador' ? (
                        <>
                            <CustomListItem icon={<PersonIcon />} text='Clientes' to='/listaClientes' />
                        </>
                    ) : null}
                </List>
                <List >

                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <Stack >
                                    <Avatar>{user.nombre.charAt(0)}</Avatar>
                                </Stack>
                            </div>
                            <div class="media-content">
                                <p class="title is-5">{user.nombre}</p>
                                <p class="subtitle is-6">
                                    {user.rol === 'admin' ? 'Administrador' : user.rol === 'caja' ? 'Cajero' : user.rol === 'entrenador' ? 'Entrenador' : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <ListItem>
                        <ListItemButton component="button" onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Toolbar />
                {children}
            </Box>
        </Box >
    );
}