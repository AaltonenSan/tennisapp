import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField({ onChange }) {
    return (
        <Box sx={{ padding: 4 }} display="flex" justifyContent="center">
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <SearchIcon sx={{ color: "primary.contrastText", mr: 1, my: 0.5 }} />
                <TextField
                    id="input-with-sx"
                    label="Search players"
                    variant="standard"
                    inputProps={{style: { fontSize: 24, color:"primary.contrastText" } }}
                    InputLabelProps={{ style: { fontSize: 24 } }}
                    onChange={onChange}
                />
            </Box>
        </Box>
    )
}