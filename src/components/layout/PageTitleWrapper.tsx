import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const PageTitle = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(1, 0)};
        `
);

const PageTitleContainer = styled(Container)(
    ({ theme }) => `
      // & .MuiContainer-root: {
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          max-width:none;
          display:flex;
        };
      // };
  `
);


interface PageTitleWrapperProps {
    children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
    return (
        <>
            <PageTitle>
                <PageTitleContainer >
                    {children}
                </PageTitleContainer>
            </PageTitle>
        </>
    );
};

PageTitleWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
