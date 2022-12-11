import {
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Input,
} from '@mui/material';
import { useState } from 'react';

export default function LoginPage({setLogged}) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    // Set logged to true and redirect user to homepage
    const handleLogin = (e) => {
        e.preventDefault();
        setLogged(true);
        sessionStorage.setItem('logged', true);
        window.location.replace('/');
        setUser({
            username: '',
            password: ''
        })
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Box sx={{maxWidth:'80%', display:'block', margin:'auto', textAlign:'center'}}>
            <Typography variant="h5">Login</Typography>
            <form>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" name="username" value={user.username} onChange={handleChange} />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" name="password" value={user.password} onChange={handleChange} />
                </FormControl>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
            </form>
        </Box>
    )
}