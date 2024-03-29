import { useEffect, useState } from "react";
import { MenuItem, TextField, styled } from "@mui/material";
import PropTypes from 'prop-types';
import { MenuProps } from 'src/components/common/pure/ControllLabel'

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
        if (props.targetData === "organization1" || props.targetData === "organization2" ||
            props.targetData === "regSosok1" || props.targetData === "regSosok2"
            || props.targetData === "regSosokSub1" || props.targetData === "regSosokSub2"
            || props.targetData === "inserSosok" || props.targetData === "inserSosokSub"
        ) {
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

                <MenuItem
                    key={option.cd !== undefined ? option.cd : option.code}
                    value={option.cd !== undefined ? option.cd : option.code}
                >
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