import { Box, Avatar, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import IconButton from '@mui/material/IconButton';

const MainToolUser = () => {
    return (
        <>
            <IconButton color="primary" aria-label="user" style={{ padding: 0 }}>
                <PersonOutlineIcon />
            </IconButton>
            <Box sx={{ color: "yellow" }} style={{ marginRight: "10px" }}>user님</Box>
        </>
    )
}
export default MainToolUser