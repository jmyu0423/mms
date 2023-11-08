import { useEffect, useState } from "react";
import { MenuItem, TextField, styled } from "@mui/material";
import PropTypes from 'prop-types';

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

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        height: '30px'
    },
}));

function CustomCombo(props){

    useEffect(()=>{
        selectList();
    },[])

    const selectList = () =>{
        if(props.setData){
            props.setData(props.dataList[0].cd, props.targetData)
        }
    }

    return (
        <CustomTextField
            size={props.size} select fullWidth
            disabled={props.disabled}
            SelectProps={{ MenuProps }}
            value={props.value}
            helperText={props.helperText}
            onChange={props.codeChange}
            inputProps={{
                style: {
                    height: "30px",
                },
            }}

            // sx={{"& fieldset": { border: 'none' },}}
        >
            {props.type === "all" ?
                <MenuItem key="" value="">
                    --전체--
                </MenuItem>
                : props.type === "choice" ?
                    <MenuItem key="" value="">
                        --선택--
                    </MenuItem>
                    : null
            }
            {props.dataList.map((option) => (
                <MenuItem key={option.cd} value={option.title}>
                    {option.title}
                </MenuItem>
            ))}
        </CustomTextField>
    )
}

CustomCombo.propTypes = {
    value: PropTypes.string.isRequired,
    size: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf([
        'none',
        'all',
        'choice',
    ]).isRequired,
    codeChange: PropTypes.func.isRequired,
    sortNo: PropTypes.number,
    setData: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.any
    ]),
    targetData: PropTypes.string, 
    dataList: PropTypes.array
};

export default CustomCombo;