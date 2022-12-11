import { Box, Typography } from "@mui/material";

export default function Homepage() {
    return (
        <Box style={{ textAlign: 'center' }}>
            <img src="/tenniscourtsmall.png" alt="Tennis logo" style={{ width: '100%', maxWidth: 600 }} />
            <Typography variant="h3" color="secondary">Welcome to the Tennis App!</Typography>
        </Box>
    );
}