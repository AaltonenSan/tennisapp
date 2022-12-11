import {
    Box,
    Typography,
    Button,
    Modal,
    FormControl,
    Input,
    InputLabel,
    IconButton
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AttachmentIcon from '@mui/icons-material/Attachment';

export default function FavoriteForm({ oldPlayer, type, getFavorites }) {
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState({
        id: null,
        firstname: '',
        lastname: '',
        country: '',
        age: '',
        height: '',
        image: []
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

    const handleOpen = () => {
        if (oldPlayer) {
            setPlayer({
                id: oldPlayer.id,
                firstname: oldPlayer.first_name,
                lastname: oldPlayer.last_name,
                country: oldPlayer.country,
                age: oldPlayer.age,
                height: oldPlayer.height,
                image: oldPlayer.image
            })
        }
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setPlayer({
            firstname: '',
            lastname: '',
            country: '',
            age: '',
            height: '',
            image: []
        })
    }
    const change = (e) => {
        setPlayer(
            {
                ...player,
                [e.target.name]: e.target.value,
            }
        )
    }
    const changeImage = (e) => {
        setPlayer(
            {
                ...player,
                image: e.target.files[0]
            }
        )
    }

    // Check that no fields are empty
    const handleValidation = (p) => {
        let formIsValid = true;
        if (!p.firstname) {
            formIsValid = false;
        }
        if (!p.lastname) {
            formIsValid = false;
        }
        if (!p.country) {
            formIsValid = false;
        }
        if (!p.age || isNaN(p.age)) {
            formIsValid = false;
        }
        if (!p.height) {
            formIsValid = false;
        }
        return formIsValid;
    }

    // Add a new favorite to the database
    const savePlayer = async (e) => {
        e.preventDefault();
        if (handleValidation(player)) {
            const formData = new FormData();
            if (oldPlayer) { 
                formData.append('id', player.id);
            }   
            formData.append('first_name', player.firstname);
            formData.append('last_name', player.lastname);
            formData.append('country', player.country);
            formData.append('age', player.age);
            formData.append('height', player.height);
            formData.append('image', player.image);

            try {
                await axios.post('http://localhost:8080/api/favorites/add', formData)
                    .then(response => {
                        setPlayer({
                            firstname: '',
                            lastname: '',
                            country: '',
                            age: '',
                            height: '',
                            image: []
                        })
                        alert('Player saved')
                        setOpen(false);
                        getFavorites();
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Please fill out all fields correctly');
        }
    }

    // Return depending on type, add or edit favorite
    return (
        <div>
            {type === "add" ?
                <Button variant="contained" onClick={handleOpen} style={{ marginTop: 50 }}>
                    Add favorite
                </Button>
            : null}
            {type === "edit" ?
                <IconButton onClick={handleOpen}>
                    <EditIcon color="secondary" />
                </IconButton>
            : null}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    {oldPlayer
                        ? <Typography variant="h6" color="primary">Edit favorite</Typography>
                        : <Typography variant="h6" color="primary">Add favorite</Typography>
                    }
                    <form>
                        {oldPlayer && <input id="id" name="id" type="hidden" value={oldPlayer.id} />}
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="firstname">First name</InputLabel>
                            <Input id="firstname" name="firstname" value={player.firstname} onChange={change} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="lastname">Last name</InputLabel>
                            <Input id="lastname" name="lastname" value={player.lastname} onChange={change} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <Input id="country" name="country" value={player.country} onChange={change} />
                        </FormControl> 
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="age">Age</InputLabel>
                            <Input id="age" name="age" value={player.age} onChange={change} />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="height">Height (eg. 1.85)</InputLabel>
                            <Input id="height" name="height" value={player.height} onChange={change} />
                        </FormControl>
                        <Input accept="image/*" type="file" id="image" name="image"
                            onChange={changeImage} sx={{display:'none'}} />
                        <InputLabel htmlFor='image'>
                            <Typography sx={{display:'inline'}}>Image</Typography>
                            <Button component='span'>
                                <AttachmentIcon />
                            </Button>
                            <Typography sx={{display:'inline'}}>{player.image === 'defaultplayer.jpg' ? null : player.image}</Typography>
                        </InputLabel>
                        {type === "add"
                            ? <Button fullWidth variant='contained' color='primary' onClick={savePlayer}>Add</Button>
                            : null}
                        {type === "edit"
                            ? <Button fullWidth variant='contained' color='primary' onClick={savePlayer}>Save</Button>
                            : null}
                    </form>
                </Box>
            </Modal>
        </div>
    )
}