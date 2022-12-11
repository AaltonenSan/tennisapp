import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Modal,
    FormControl,
    Input,
    InputLabel,
} from '@mui/material';

export default function UserForm({opened, onClose, type, setLogged}) {
    const [open, setOpen] = useState(opened);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => setOpen(false);
    const change = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value,
            }
        )
    }
    // Set logged to true and close modal
    const login = (e) => {
        e.preventDefault();
        setLogged(true);
        sessionStorage.setItem('logged', true);
        onClose();
        setUser(
            {
                username: '',
                password: ''
            }
        )
        handleClose();
    }
    // No functionality on register yet or coming
    const register = (e) => {
        e.preventDefault();
        onClose();
        setUser(
            {
                username: '',
                password: ''
            }
        )
        handleClose();
    }

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                {type === "login"
                    ? <Typography variant="h6" color="primary">Login</Typography>
                    : null}
                {type === "reg"
                    ? <Typography variant="h6" color="primary">Register</Typography>
                    : null}
                <form>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" name="username" value={user.username} onChange={change} />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" name="password" value={user.password} onChange={change} />
                    </FormControl>
                    {type === "login"
                        ? <Button fullWidth variant='contained' color='primary' onClick={login}>Login</Button>
                        : null}
                    {type === "reg"
                        ? <Button fullWidth variant='contained' color='primary' onClick={register}>Register</Button>
                        : null}
                </form>
            </Box>
        </Modal>
    )
}