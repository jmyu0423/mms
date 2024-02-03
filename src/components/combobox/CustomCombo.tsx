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



function CustomCombo(props) {

    const CustomTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            height: `${props.height == undefined ? '30px' : props.height}`,
            backgroundColor: 'white'
        },
    }));

    useEffect(() => {
        if (props.dataList.length > 0) {
            selectList();
        }
    }, [props.dataList])

    const selectList = () => {
        if (props.targetData === "organization1" || props.targetData === "organization2") {
            if (props.setData) {
                props.setData(props.dataList[0].code, props.targetData)
            }
        } else {
            if (props.setData) {
                props.setData(props.dataList[0].cd, props.targetData)
            }
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

                <MenuItem key={option.cd} value={option.cd !== undefined ? option.cd : option.code}>
                    {option.title !== undefined ? option.title : option.name !== undefined ? option.name : option.name_kor}
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
    dataList: PropTypes.array,
    height: PropTypes.string,
};

export default CustomCombo;