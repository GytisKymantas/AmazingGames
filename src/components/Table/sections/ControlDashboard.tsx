import React from 'react';

import styled from 'styled-components';
import TablesControls from '../elements/TablesControls';
import Loader from '../elements/Loader';
import PresenterControls from '../elements/PresenterControls';
import { gamePresenters, tables } from '@/types/types';

interface ControlDashboardProps {
  tablesData?: string[];
  gamePresentersData?: string[];
  tablesResponse?: tables[];
  gamePresentersResponse?: gamePresenters[];
  shiftIndex: number;
}

const ControlDashboard: React.FC<ControlDashboardProps> = ({
  tablesData,
  gamePresentersData,
  tablesResponse,
  gamePresentersResponse,
  shiftIndex,
}) => {
  if (!gamePresentersResponse === undefined || !tablesResponse === undefined) {
    return <Loader />;
  }

  return (
    <DashboardContainer>
      <PresenterControls
        tablesResponse={tablesResponse}
        tablesData={tablesData}
        gamePresentersData={gamePresentersData}
        shiftIndex={shiftIndex}
        gamePresentersResponse={gamePresentersResponse}
      />

      <TablesControls
        tablesResponse={tablesResponse}
        tablesData={tablesData}
        gamePresentersData={gamePresentersData}
        shiftIndex={shiftIndex}
      />
    </DashboardContainer>
  );
};

export default React.memo(ControlDashboard);

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  width: 100%;
`;
