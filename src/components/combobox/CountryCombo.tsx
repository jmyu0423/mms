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
        height: '33px'
    },
}));

function CountryCombo(props) {
    const [countryList, setCountryList] = useState([
        { cd: 0, title: '한국' },
        { cd: 1, title: '미국' },
        { cd: 2, title: '중국' },
        { cd: 3, title: '일본' },
        { cd: 4, title: '태국' },
        { cd: 5, title: '독일' },
        { cd: 6, title: '프랑스' },
        { cd: 7, title: '대만' },
    ]);

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
                    height: "30px"
                }
            }}
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
            {countryList.map((option) => (
                <MenuItem key={option.cd} value={option.title}>
                    {option.title}
                </MenuItem>
            ))}
        </CustomTextField>
    )
}

CountryCombo.propTypes = {
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
    targetData: PropTypes.string
};

export default CountryCombo;