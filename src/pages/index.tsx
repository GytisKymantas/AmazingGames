import Table from '@/components/Table/Table';
import { TIMETABLES } from '@/constants/constants';
import React, { useState } from 'react';
import styled from 'styled-components';

const Home: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const timetables = TIMETABLES;
  const morningTimetable = timetables.morning;
  const eveningTimetable = timetables.evening;
  const nightTimetable = timetables.night;

  const handleTimetable = (pageIndex: number) => {
    if (pageIndex === 0) {
      return morningTimetable;
    }
    if (pageIndex === 1) {
      return eveningTimetable;
    }
    if (pageIndex === 2) {
      return nightTimetable;
    }
    return [];
  };

  const backgroundColor =
    pageIndex === 0 ? 'lightyellow' : pageIndex === 1 ? '#fecc70' : 'lightgray';

  return (
    <MainContainer backgroundColor={backgroundColor}>
      <StyledContainer>
        <div onClick={() => setPageIndex(0)}>
          {pageIndex === 0 ? <b>Morning</b> : 'Morning'}
        </div>
        <div onClick={() => setPageIndex(1)}>
          {pageIndex === 1 ? <b>Evening</b> : 'Evening'}
        </div>
        <div onClick={() => setPageIndex(2)}>
          {pageIndex === 2 ? <b>Night</b> : 'Night'}
        </div>
      </StyledContainer>
      <div>
        <Table timetables={handleTimetable(pageIndex)} shiftIndex={pageIndex} />
      </div>
    </MainContainer>
  );
};

export default Home;

const StyledContainer = styled.div`
  display: Flex;
  gap: 1.25rem;
  justify-content: Center;
  font-size: 1.25rem;
  cursor: pointer;
`;

const MainContainer = styled.div<{ backgroundColor?: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
`;
