import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';

const DangerButton = ({ value, marginRightValue }) => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: grey[300],
        backgroundColor: red[300],
        width: 80,
        height: 30,
        fontSize: 15,
        marginRight: marginRightValue,
        '&:hover': {
            backgroundColor: red[400],
        },
    }));

    return (
        <ColorButton>{value}</ColorButton>
    )
}
export default DangerButton;