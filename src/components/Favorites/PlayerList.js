import React, { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Box,
    Button,
    Typography,
    Collapse,
    Tooltip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteForm from '../Favorites/FavoriteForm';
import SearchField from '../common/SearchField';
import axios from 'axios';
import countryCodes from '../../data/countryCodes.js';

export default function PlayerList() {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(-1);
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState('Fetching favorites...');
    const [openDialog, setOpenDialog] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const expanded = false;

    // Get favorites from the database
    const getFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/favorites')
            setPlayers(response.data)
            setError('')
        } catch (error) {
            setPlayers([])
            setError('Error fetching favorites')
        }
    }
    useEffect(() => { getFavorites() }, [])

    // Show all favorites matching search criteria
    const search = (players) => {
        return players.filter(
            (player) =>
                player.first_name.toLowerCase().includes(query.toLowerCase()) ||
                player.last_name.toLowerCase().includes(query.toLowerCase()) ||
                player.country.toLowerCase().startsWith(query.toLowerCase())
        )
    }
    
    // Expand card for more details
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));
    const handleExpandClick = (i) => {
        if (selected === i) {
            setSelected(-1);
        } else {
            setSelected(i);
        }
    };

    // Delete favorite from the database
    const deletePlayer = (id) => {
            try {
                axios.get('http://localhost:8080/api/favorites/delete/' + id)
                setPlayers(players.filter((player) => player.id !== id));
            } catch (error) {
                console.log(error);
            };
        handleCloseDialog();
    }

    // Return country code for flag - icon
    const createCountryIcon = (player) => {
        const iso_code = Object.keys(countryCodes).find(key =>
            countryCodes[key].toLowerCase() === player.country.toLowerCase());
        let code = '';
        if (iso_code) {
            code = "fi fi-" + iso_code.toLowerCase();
        }

        return (
            <Typography><span className={code}></span>&nbsp;{player.country}</Typography>
        )
    }

    // Handle Dialog for deleting a favorite
    const handleCloseDialog = () => {
        setPlayerToDelete(null)
        setOpenDialog(false);
    }
    const handleOpenDialog = (id) => {
        setPlayerToDelete(id)
        setOpenDialog(true)
    }
    
    // Return error message or list of favorites
    if (error.length > 0) return <Typography variant="h6">{error}</Typography>
    if (players.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', paddingTop: '20px'}}>
                <Typography variant='h6'>No favorites found</Typography>
                <FavoriteForm type={"add"} getFavorites={getFavorites} />
            </Box>
        )
    }
    return (
        <Box sx={{ marginBottom: 5 }}>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <SearchField onChange={(e) => setQuery(e.target.value)} />
                <FavoriteForm type={"add"} getFavorites={getFavorites} />
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this favorite?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => deletePlayer(playerToDelete)}>Delete</Button>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="space-around">
                    {search(players).map((player) => {
                        return (
                            <Grid item key={player.id}>
                                <Card sx={{backgroundColor: "primary.main", color: "secondary.main"}}>
                                    <CardHeader title={player.first_name + ' ' + player.last_name} subheader={createCountryIcon(player)} />
                                        <CardContent sx={{borderBottom: 2, borderTop: 2, borderColor: "secondary.main"}}>
                                            <img src={'http://localhost:8080/download/players/' + player.image} alt="" width="250px" height="250px" />
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <Tooltip title="Edit">
                                                <><FavoriteForm oldPlayer={player} type={"edit"} getFavorites={getFavorites} /></>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleOpenDialog(player.id)}>
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                            <ExpandMore
                                                expand={expanded}
                                                onClick={() => handleExpandClick(player.id)}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                                >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </CardActions>
                                        <Collapse in={player.id === selected} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph sx={{borderBottom:1}}>Age: {player.age}</Typography>
                                                <Typography paragraph sx={{borderBottom:1}}>Height: {player.height} m</Typography>
                                            </CardContent>
                                        </Collapse>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}