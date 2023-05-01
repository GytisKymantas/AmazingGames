import React, { useMemo, useState } from 'react';
import { useGetAllGamePresentersQuery, useGetAllTablesQuery } from '@/api/api';
import ControlDashboard from './sections/ControlDashboard';
import {
  generateRepeatedSequence,
  handleShiftGamePresenters,
  handleShiftTables,
} from '@/utils/requests';
import Authentication from './elements/Authentication';
import Loader from './elements/Loader';

interface TableProps {
  timetables: string[];
  shiftIndex: number;
}

const Table: React.FC<TableProps> = ({ timetables, shiftIndex }) => {
  const [flippedDisplay, setFlippedDisplay] = useState(true);
  const { data: gamePresentersResponse, isFetching: presentersIsFetching } =
    useGetAllGamePresentersQuery();
  const { data: tablesResponse, isFetching: tablesisFetching } =
    useGetAllTablesQuery();
  const tablesData = handleShiftTables(shiftIndex, tablesResponse);
  const gamePresentersData = handleShiftGamePresenters(
    shiftIndex,
    gamePresentersResponse
  );

  const repeatedSequence = useMemo(() => {
    let sequence = [] as string[];
    if (!!tablesData?.length) {
      while (sequence.length < 24) {
        sequence = [
          ...sequence,
          ...tablesData,
          ...(generateRepeatedSequence(
            shiftIndex,
            gamePresentersResponse,
            tablesResponse
          ) as string[]),
        ];
      }
    }
    return sequence;
  }, [tablesData, shiftIndex, gamePresentersResponse, tablesResponse]);

  const timeTables = timetables;
  const timeTablesNew = timetables.slice();
  const timeTablesReversed = timeTablesNew.reverse();
  const finalSequence = repeatedSequence?.slice(0, 12);

  if (presentersIsFetching || tablesisFetching) {
    return <Loader />;
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div>
      <table border={1}>
        <tbody>
          {flippedDisplay && (
            <tr>
              <td></td>
              {timeTables.map((timetable, index) => (
                <td key={index}>{timetable}</td>
              ))}
            </tr>
          )}
          {handleShiftGamePresenters(shiftIndex, gamePresentersResponse)?.map(
            (array, idx) => {
              return (
                <tr key={idx}>
                  {flippedDisplay && <td>{array}</td>}
                  {finalSequence
                    .slice(idx)
                    .concat(finalSequence)
                    .concat(finalSequence.slice(0, idx))
                    .map((obj: string, idx: number) => {
                      return <td key={idx}>{obj}</td>;
                    })}
                  {!flippedDisplay && <td>{array}</td>}
                </tr>
              );
            }
          )}
          {!flippedDisplay && (
            <tr>
              <td></td>
              {flippedDisplay
                ? timeTables
                : timeTablesReversed.map((timetable, index) => (
                    <td key={index}>{timetable}</td>
                  ))}
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setFlippedDisplay(!flippedDisplay)}>
          Switch display
        </button>
      </div>
      <div>
        <Authentication />
      </div>
      {isLoggedIn && (
        <ControlDashboard
          tablesData={tablesData}
          gamePresentersData={gamePresentersData}
          tablesResponse={tablesResponse}
          gamePresentersResponse={gamePresentersResponse}
          shiftIndex={shiftIndex}
        />
      )}
    </div>
  );
};

export default React.memo(Table);
