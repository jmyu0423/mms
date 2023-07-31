import { Box, Avatar, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { authStatus } from "src/recoil/atoms/authAtoms"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const MainToolUser = () => {
    const authCurrent = useRecoilState(authStatus)[0];
    return (
        <Button
            style={{
                backgroundColor: "aliceblue",
                padding: "0px 5px",
                marginRight: "10px"
            }}
            sx={{ "& .MuiButton-startIcon": { marginRight: "0px" } }}

            variant="outlined"
            startIcon={<PersonOutlineIcon />}>
            {authCurrent.realname}
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