import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// Data for testing purposes. API only has 250 request per month.
// const players = [
//     {
//         id: 1,
//         first_name: 'Novak',
//         last_name: 'Djokovic',
//         country: 'Serbia'
//     },
//     {
//         id: 2,
//         first_name: 'Rafael',
//         last_name: 'Nadal',
//         country: 'Spain'
//     },
//     {
//         id: 3,
//         first_name: 'Eemil',
//         last_name: 'Ruusuvuori',
//         country: 'Finland'
//     },
//     {
//         id: 4,
//         first_name: 'Jarkko',
//         last_name: 'Nieminen',
//         country: 'Finland'
//     },
//     {
//         id: 5,
//         first_name: 'Nick',
//         last_name: 'Kyrgios',
//         country: 'Australia'
//     },
//     {
//         id: 6,
//         first_name: 'Carlos',
//         last_name: 'Alcaraz',
//         country: 'Spain'
//     },
//     {
//         id: 7,
//         first_name: 'Holger',
//         last_name: 'Rune',
//         country: 'Denmark'
//     },
//     {
//         id: 8,
//         first_name: 'Andrey',
//         last_name: 'Rublev',
//         country: 'Russia'
//     },
//     {
//         id: 9,
//         first_name: 'Holger',
//         last_name: 'Rune',
//         country: 'Denmark'
//     },
//     {
//         id: 10,
//         first_name: 'Holger',
//         last_name: 'Rune',
//         country: 'Denmark'
//     },
//     {
//         id: 11,
//         first_name: 'Testaajar',
//         last_name: 'Test',
//         country: 'Denmark'
//     },
//     {
//         id: 12,
//         first_name: 'Mike',
//         last_name: 'Babcock',
//         country: 'USA'
//     },
// ]
export default function AllPlayers() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState('Loading players...');

    // Get all ATP players from API
    useEffect(() => {
       const options = {
           headers: {
               'X-RapidAPI-Key':  process.env.REACT_APP_RAPIDAPI_KEY,
               'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com'
            }
        };
      const getAllPlayers = async () => {
            try {
                const response = await axios.get('https://tennis-live-data.p.rapidapi.com/players/ATP', options)
                setPlayers(response.data.results.players)
                setError('');
            } catch (error) {
                console.log(error)
                setError('Error loading players');
            }
        };
        getAllPlayers();
    }, []);
    
    // Datagrid columns
    const columns = [
        { field: 'first_name', headerName: 'First name', width: 210 },
        { field: 'last_name', headerName: 'Last name', width: 210 },
        { field: 'country', headerName: 'Country', width: 150 },
    ];
    
    // Return table with all players
    if (error.length > 0) return <Typography variant="h6">{error}</Typography>
    return (
        <Box style={{
            height: 600,
            maxWidth: '600px',
            display: 'block',
            margin: 'auto',
            paddingTop: '20px'
        }}>
            <DataGrid
                rows={players}
                columns={columns}
                rowsPerPageOptions={[10, 25, 50, 100]}
                disableSelectionOnClick={true}
            />
        </Box>
    )
}
