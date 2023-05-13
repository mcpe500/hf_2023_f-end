import Box from '@mui/material/Box';

function CenteredBox({children}) {
    return (
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <div>
                {children}
            </div>
        </Box>
    );
}

export default CenteredBox