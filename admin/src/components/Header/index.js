import React from 'react';
import { Box, BaseHeaderLayout } from '@strapi/design-system';


export const Header = () => {
  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        title={'Google Authentication for Mobile Apps'}
        as="h2"
      />
    </Box>
  );
};