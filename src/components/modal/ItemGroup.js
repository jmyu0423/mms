import { Box, FormControlLabel, styled } from "@mui/material";

let PopupFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    width: 'auto',
    margin: '4px 10px 4px 0px',
    alignItems: 'baseline',

    '& .MuiFormControlLabel-label': {
        marginBottom: '2px',
        marginRight: '5px',
        fontSize: '16px',
        color: '#e57373',
        fontWeight: 'bold'
    },
    '& .MuiInputBase-input': {
        padding: '10px',
        height: '12px',
    },
    '& .MuiTextField-root': {
        width: '200px',
        background: '#fcfcfc',
        '.Mui-disabled': {
            background: '#f7f7f7',
        }
    },
}));

const Title = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  color: #121212;
  font-family: 'SpoqaHanSansNeo';
  margin-bottom: 5px;
  margin-top: 15px;
  width: 100%;
`;

function ItemGroup({ display, title, marginTop, control, children }) {
    return (
        <Box width={'100%'} sx={{ display: display }} marginTop={title != null ? marginTop : null}>
            <Box sx={{ display: 'flex' }}>
                {title != null ? <Title> {title} </Title> : null}
                {control != null ?
                    <Box width={'100%'} sx={{ display: 'flex', alignItems: 'flex-end', direction: 'rtl' }}>
                        {control}
                    </Box> : null}
            </Box>
            <Box padding={'10px 10px 10px 10px'}
                width={'100%'}
                borderRadius="5px"
                border="1px solid #e4e4e4"
                bgcolor="#ffffff">
                {children}
            </Box>
        </Box>
    );
}

export { ItemGroup, PopupFormControlLabel };