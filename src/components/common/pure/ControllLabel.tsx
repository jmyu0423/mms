import { FormControlLabel } from "@mui/material";
import { styled } from '@mui/material/styles';

const WngFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    width: 'auto',
    margin: '4px 30px 4px 0px',
    flexDirection: 'column-reverse',
    alignItems: 'baseline',

    '& .MuiFormControlLabel-label': {
        marginBottom: '5px',
    },

    '& .MuiInputBase-input': {
        padding: '10px',
    },
    '& .MuiTextField-root': {
        width: '220px',
        background: theme.palette.background.default, //'#FcFcFc',
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    BackdropProps: {
        style: {
            backgroundColor: 'transparent',
            backdropFilter: 'none',
        }
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    }
};

export { WngFormControlLabel, MenuProps }