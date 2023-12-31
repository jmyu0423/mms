import { FC } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';

interface PageTitleProps {
    heading?: string;
    subHeading?: string;
    docs?: string;
}

const PageTitle: FC<PageTitleProps> = ({
    heading = '',
    subHeading = '',
    docs = '',
    ...rest
}) => {
    return (
        <Grid container justifyContent="space-between" alignItems="center" {...rest}>
            <Grid item>
                <Typography variant="h5" component="h5" gutterBottom marginBottom={0}>
                    {heading}
                </Typography>
                <Typography variant="subtitle2">
                    {subHeading}
                </Typography>
            </Grid>
        </Grid>
    );
};

PageTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    docs: PropTypes.string,
};

export default PageTitle;
