import { Box, Avatar, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MainToolUser = () => {
    return (
        <Button 
            style={{
                backgroundColor: "aliceblue", 
                padding: "0px 5px",
                marginRight: "10px"
            }} 
            variant="outlined" 
            startIcon={<PersonOutlineIcon />}>
            User
        </Button>
        // <>
        //     <IconButton color="primary" aria-label="user" style={{ padding: 0 }}>
        //         <PersonOutlineIcon />
        //     </IconButton>
        //     <Box sx={{ color: "yellow" }} style={{ marginRight: "10px" }}>user님</Box>
        // </>
    )
}
export default MainToolUser