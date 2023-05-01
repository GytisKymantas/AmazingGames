import React, { useState, useEffect } from 'react';
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useUpdateTableMutation,
  useGetAllTablesQuery,
} from '@/api/api';

import styled from 'styled-components';
import { getTableIdByName, handleShiftName } from '@/utils/requests';
import { tables } from '@/types/types';

interface TablesControlsProps {
  tablesData?: string[];
  gamePresentersData?: string[];
  tablesResponse?: tables[];
  shiftIndex: number;
}

const TablesControls: React.FC<TablesControlsProps> = ({
  tablesData,
  gamePresentersData,
  tablesResponse,
  shiftIndex,
}) => {
  const [changedName, setChangedName] = useState('');
  const [defaultError, setDefaultError] = useState('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [updateTable] = useUpdateTableMutation();
  const [createTable] = useCreateTableMutation();
  const [deleteTable] = useDeleteTableMutation();
  const { refetch } = useGetAllTablesQuery();

  const changeTableName = async (
    tablesResponse: tables[] | undefined,
    obj: string,
    changedName: string
  ) => {
    const pattern = /^Table[1-9]$/; // regex pattern for single digit number between 1-9
    const shift = handleShiftName(shiftIndex);
    const id = getTableIdByName(tablesResponse, obj, shift);

    try {
      if (!pattern.test(changedName)) {
        setDefaultError(
          `Table name must start with Table and be a single digit number between 1-9`
        );
        return;
      }

      await updateTable({
        id: id,
        table: changedName,
        shift: shift,
      }).then(() => refetch());
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  useEffect(() => {
    setDefaultError('');
  }, [shiftIndex]);

  const handleTableSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        tablesData!.length < 6 &&
        tablesData!.length < gamePresentersData!.length - 1
      ) {
        const numericalTablesData = tablesData?.map((table) =>
          Number(table.slice(5))
        );
        const sortedNumericalTablesData = numericalTablesData?.sort(
          (a: number, b: number) => a - b
        );

        let numericalId = 1;
        if (sortedNumericalTablesData && sortedNumericalTablesData.length > 0) {
          for (let i = 0; i < sortedNumericalTablesData.length; i++) {
            if (numericalId < sortedNumericalTablesData[i]) {
              break;
            }
            numericalId++;
          }
        }

        await createTable({
          table: `Table${numericalId}`,
          shift: handleShiftName(shiftIndex),
        }).then(() => refetch());
      } else {
        throw setDefaultError('Maximum number of tables on a given shift is 4');
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const MySelectorComponent = () => {
    const handleSelectChange = async (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const shift = handleShiftName(shiftIndex);
      const id = getTableIdByName(tablesResponse, e.target.value, shift);
      try {
        if (tablesData!.length > 3) {
          await deleteTable(id).then(() => refetch());
        } else {
          throw setDefaultError(`Unable to have less than 3 tables active`);
        }
      } catch (error) {
        console.log('An error has occurred');
      }
    };

    return (
      <select onChange={handleSelectChange}>
        <option>choose an option</option>
        {tablesData?.map((obj, idx) => {
          return (
            <option key={idx} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
    );
  };

  const onInputFocus = (idx: number) => {
    setInputIndex(idx);
    setChangedName('');
  };

  return (
    <TableContainer>
      <form onSubmit={handleTableSubmit}>
        <StyledLabel>Add a new table:</StyledLabel>
        <ButtonStyled type='submit'>Submit</ButtonStyled>
      </form>
      <div>
        <StyledLabel>Delete table: </StyledLabel>
        <MySelectorComponent />
      </div>
      <div>
        <StyledLabel>edit table: </StyledLabel>
        {tablesData?.map((obj, idx) => {
          return (
            <div key={idx}>
              <div>{obj}</div>
              <input
                value={inputIndex === idx ? changedName : obj}
                type='name'
                onFocus={() => onInputFocus(idx)}
                onChange={(e) => setChangedName(e.target.value)}
              />
              <ButtonStyled
                type='button'
                onClick={() =>
                  changeTableName(tablesResponse, obj, changedName)
                }
              >
                change name
              </ButtonStyled>
            </div>
          );
        })}
      </div>
      {defaultError && <Error>{defaultError}</Error>}
    </TableContainer>
  );
};

export default TablesControls;

const Error = styled.p`
  color: red;
`;

const TableContainer = styled.div`
  background: gray;
  padding: 1.25rem;
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  text-transform: uppercase;
  color: white;
`;

const ButtonStyled = styled.button`
  color: white;
  background: black;
  font-size: 10px;
  padding: 3px 1.5px;
  text-transform: uppercase;

  &:disabled {
    background: gray;
  }
`;
