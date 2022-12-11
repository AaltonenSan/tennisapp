import { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Box,
    IconButton,
    Typography,
    Collapse
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function TournamentList() {
    const [selected, setSelected] = useState(-1);
    const [tournaments, setTournaments] = useState([]);
    const [error, setError] = useState('Fetching tournaments...');
    const expanded = false;

    // Get tournaments from the database
    const getTournamentList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tournaments')
            setTournaments(response.data)
            setError('')
        } catch (error) {
            setTournaments([])
            setError('Error fetching tournaments')
        }
    }
    useEffect(() => { getTournamentList() }, [])

    // Expand card for more information
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
    
    if (error.length > 0) return <Typography variant="h6">{error}</Typography>
    return (
        <Box sx={{ flexGrow: 1, marginTop: 5 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {tournaments.map(tournament => {
                return (
                    <Grid item xs={2} sm={4} md={3} key={tournament.id}>
                        <Card sx={{
                            maxWidth: 500,
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            borderTop: 2,
                            borderBottom: 2,
                            borderColor: "secondary.main"
                        }}>
                                <CardContent>
                                    <img src={'http://localhost:8080/download/tournaments/' + tournament.image} alt="" width="100%" height="100%"/> <br /> 
                                </CardContent>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={() => handleExpandClick(tournament.id)}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon /><Typography>More</Typography>
                                </ExpandMore>
                            <Collapse in={tournament.id === selected} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph sx={{borderBottom:1}}><b>Name</b><br />{tournament.name}</Typography>
                                    <Typography paragraph sx={{borderBottom:1}}><b>Location</b><br /> {tournament.location}</Typography>
                                    <Typography paragraph sx={{borderBottom:1}}><b>Court</b><br /> {tournament.court}</Typography>
                                    <Typography paragraph sx={{borderBottom:1}}><b>Surface</b><br /> {tournament.surface}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                )
            })}
            </Grid>
        </Box>
    )
}