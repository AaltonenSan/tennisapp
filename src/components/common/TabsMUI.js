import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Container,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    MenuList,
    useMediaQuery,
    useTheme
} from '@mui/material/';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerMUI from './DrawerMUI';
import UserForm from './UserForm';

export default function TabsMUI({logged, setLogged}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(false);
    const [openMenu, setOpenMenu] = useState(null)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)

    const menuClose = () => setOpenMenu(null)
    const handleChange = (e, val) => {
      setValue(val);
    }

    const handleCloseLogin = () => setOpenLogin(false)
    const handleOpenLogin = () => {
        menuClose()
        setOpenLogin(true)
    }
    
    const handleCloseRegister = () => setOpenRegister(false)
    const handleOpenRegister = () => {
        menuClose()
        setOpenRegister(true)
    }
    const handleLogout = () => {
        menuClose()
        setLogged(false)
        sessionStorage.removeItem('logged')
    }

    return (
        <Box>
            <AppBar position="sticky">
                <Container maxWidth="x1">
                    <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
                        <SportsTennisIcon sx={{ display: { sx: 'none', sm: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >TENNIS</Typography>

                        {isMobile
                            ? <DrawerMUI logged={logged} setLogged={setLogged} />
                            : <>
                                <Tabs
                                    value={value}
                                    onChange={handleChange} 
                                    textColor="inherit"
                                    indicatorColor='secondary'
                                    sx={{
                                        flexGrow: 1,
                                        textAlign: "center"
                                                }}>
                                    <Tab disabled style={{ display:"none" }} />
                                    <Tab label='Favorites' component={Link} to="favorites" />
                                    <Tab label='All players' component={Link} to="players" />
                                    <Tab label='Grand Slams' component={Link} to="tournaments" />
                                </Tabs>
                                <IconButton onClick={(e) => setOpenMenu(e.currentTarget)}><AccountCircleIcon color="secondary"/></IconButton>
                            </>}
                        
                        {openMenu &&
                            <MenuList>
                                {logged 
                                    ? <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={menuClose}>
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemText primary="Logout" />
                                        </MenuItem>
                                      </Menu>
                                    : <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={menuClose}>
                                        <MenuItem onClick={handleOpenLogin}>
                                            <ListItemText primary="Login" />
                                        </MenuItem>
                                        <MenuItem onClick={handleOpenRegister}>
                                            <ListItemText primary="Register" />
                                        </MenuItem>
                                      </Menu>
                                }
                            </MenuList>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
            {openLogin 
                ? <UserForm type={"login"} setLogged={setLogged} opened={openLogin} onClose={handleCloseLogin} />
                : null}
            {openRegister 
                ? <UserForm type={"reg"} opened={openRegister} onClose={handleCloseRegister} />
                : null}
        </Box>
    )
}