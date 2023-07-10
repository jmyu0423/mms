import { Typography, Avatar } from "@mui/material";
import assets from "../../assets";

const MainToolbar = () => {
    return (
        <Typography display="flex" align="right" flexDirection="row-reverse">
            <Typography>
                <Avatar
                    sx={{
                        backgroundColor: 'transparent',
                    }}
                    src={assets.images.png}
                />
            </Typography>
            <Typography>
                최근접속 | {"2023-07-09 23:36:00"}
            </Typography>

        </Typography>
    )
}
export default MainToolbar