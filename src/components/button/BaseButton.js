import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { indigo } from '@mui/material/colors';

const BaseButton = ({ value, marginRightValue }) => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(indigo[400]),
        backgroundColor: indigo[400],
        width: 80,
        height: 30,
        fontSize: 15,
        marginRight: marginRightValue,
        '&:hover': {
            backgroundColor: indigo[600],
        },
    }));

    return (
        <ColorButton>{value}</ColorButton>
    )
}
export default BaseButton;