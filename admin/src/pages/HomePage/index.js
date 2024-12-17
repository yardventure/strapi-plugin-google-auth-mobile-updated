/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { ContentLayout } from '@strapi/design-system';
import { Header } from '../../components/Header';
import { SettingsBlock } from '../../components/SettingsBlock';

const HomePage = () => {
  return (
    <ContentLayout>
      <Header></Header>
      <SettingsBlock></SettingsBlock>
    </ContentLayout>
  );
};

export default memo(HomePage);