import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../assets/logo.png'
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CustomListItem from '../components/Sidenav/CustomListItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import CerrarSesion from '../components/CerrarSesion';

const drawerWidth = 240;

export default function Layout({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color='primary'>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1 }} />

                    <Typography variant='h5'>
                        Bienvenido, {user.nombre}
                    </Typography>
                    <Typography variant='h6' color={'white'}>({user.rol})</Typography>
                    <CerrarSesion />
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
                <List>
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