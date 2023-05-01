import React, { useState, useEffect } from 'react';
import {
  useCreateGamePresenterMutation,
  useDeleteGamePresenterMutation,
  useUpdatePlayerMutation,
  useGetAllGamePresentersQuery,
} from '@/api/api';

import styled from 'styled-components';
import {
  getPlayerIdByName,
  handleShiftName,
  validateGamePresenter,
} from '@/utils/requests';
import Loader from './Loader';
import { gamePresenters, tables } from '@/types/types';

interface PresenterControlProps {
  tablesData?: string[];
  gamePresentersData?: string[];
  gamePresentersResponse?: gamePresenters[];
  shiftIndex: number;
  tablesResponse?: tables[];
}

const PresenterControls: React.FC<PresenterControlProps> = ({
  shiftIndex,
  gamePresentersData,
  tablesData,
  gamePresentersResponse,
  tablesResponse,
}) => {
  const [createGamePresenter] = useCreateGamePresenterMutation();
  const [updatePlayer] = useUpdatePlayerMutation();
  const [deleteGamePresenter] = useDeleteGamePresenterMutation();
  const [changeName, setChangeName] = useState('');
  const [defaultError, setDefaultError] = useState('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [addGamePresenter, setAddGamePresenter] = useState('');
  const { refetch } = useGetAllGamePresentersQuery();
  const shift = handleShiftName(shiftIndex);

  useEffect(() => {
    setDefaultError('');
  }, [shiftIndex]);

  const handleGamePresenterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const name = addGamePresenter.trim();

      if (!validateGamePresenter(name)) {
        throw setDefaultError(`Invalid game presenter name`);
      }

      const isDuplicate = gamePresentersData!.some(
        (presenter) => presenter === name
      );

      if (isDuplicate) {
        throw setDefaultError(`Presenter '${name}' already exists`);
      }

      if (gamePresentersData!.length >= 8) {
        console.log('An error has occurred');
      }

      await createGamePresenter({
        gamePresenter: name,
        shift: shift,
      }).then(() => refetch());
      setAddGamePresenter('');
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const MyPlayerSelectorComponent = () => {
    const handleSelectChange = async (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      try {
        const presenterName = e.target.value;
        const presenterId = getPlayerIdByName(
          gamePresentersResponse,
          presenterName,
          shift
        );
        const presenterCount = gamePresentersData!.length;

        if (presenterCount > tablesData!.length + 1) {
          await deleteGamePresenter(presenterId as void).then(() => refetch());
        } else {
          throw setDefaultError(
            `Game presenter ratio to active Tables canno't be equal`
          );
        }
      } catch (error) {
        console.log('An error has occurred');
      }
    };

    return (
      <select onChange={handleSelectChange}>
        <option>choose an option</option>
        {gamePresentersData?.map((obj, idx) => {
          return (
            <option key={idx} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
    );
  };

  const changePlayerName = async (
    playersResponse: gamePresenters[] | undefined,
    obj: string,
    changeName: string
  ) => {
    try {
      const isNameExists = playersResponse?.some(
        (player) =>
          player.gamePresenter === changeName && player.shift === shift
      );
      console.log(playersResponse, 'players response');
      console.log(changeName, 'changeName');

      if (!isNameExists) {
        const id = getPlayerIdByName(playersResponse, obj, shift);
        await updatePlayer({
          id: id,
          gamePresenter: changeName,
          shift: shift,
        }).then(() => refetch());
      } else {
        setDefaultError(`${changeName} already exists on ${shift} shift`);
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const onInputFocus = (idx: number) => {
    setInputIndex(idx);
    setChangeName('');
  };

  if (!gamePresentersResponse === undefined || !tablesResponse === undefined) {
    return <Loader />;
  }
  return (
    <PlayerContainer>
      <form onSubmit={handleGamePresenterSubmit}>
        <StyledLabel>Add a new player: </StyledLabel>
        <input
          type='name'
          id='addName'
          value={addGamePresenter}
          placeholder='Enter name'
          onChange={(e) => setAddGamePresenter(e.target.value)}
        />
        <ButtonStyled disabled={addGamePresenter === ''} type='submit'>
          submit
        </ButtonStyled>
      </form>
      <div>
        <StyledLabel>Delete player: </StyledLabel>
        <MyPlayerSelectorComponent />
      </div>
      <div>
        <StyledLabel>edit players:</StyledLabel>
        {gamePresentersData?.map((presenter, idx) => {
          return (
            <div key={idx}>
              <div>{presenter}</div>
              <input
                value={inputIndex === idx ? changeName : presenter}
                type='name'
                onFocus={() => onInputFocus(idx)}
                onChange={(e) => setChangeName(e.target.value)}
              />
              <ButtonStyled
                type='button'
                onClick={() =>
                  changePlayerName(
                    gamePresentersResponse,
                    presenter,
                    changeName
                  )
                }
              >
                change name
              </ButtonStyled>
            </div>
          );
        })}
      </div>
      {defaultError && <Error>{defaultError}</Error>}
    </PlayerContainer>
  );
};

export default PresenterControls;

const Error = styled.p`
  color: red;
`;

const PlayerContainer = styled.div`
  background: teal;
  padding: 20px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
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
