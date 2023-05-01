import { gamePresenters, tables } from '@/api/api';

export const handleShiftName = (shiftIndex: number) => {
  if (shiftIndex === 0) {
    return 'morning';
  }
  if (shiftIndex === 1) {
    return 'evening';
  }
  if (shiftIndex === 2) {
    return 'night';
  }
};

export const getTableIdByName = (
  tables: tables[] | undefined,
  name: string,
  shift: 'morning' | 'evening' | 'night' | undefined
) => {
  const matchingTable = tables?.find(
    (table) => table.table === name && table.shift === shift
  );
  if (matchingTable) {
    return matchingTable.id;
  }
};

export const getPlayerIdByName = (
  presenters: gamePresenters[] | undefined,
  name: string,
  shift: 'morning' | 'evening' | 'night' | undefined
): number | undefined => {
  const matchingTable = presenters?.find(
    (presenter) => presenter.gamePresenter === name && presenter.shift === shift
  );
  if (matchingTable) {
    return matchingTable.id;
  }
};

export const handleShiftTables = (
  shiftIndex: number,
  tablesResponse?: tables[]
) => {
  if (shiftIndex === 0) {
    return tablesResponse
      ?.filter((table) => table.shift === 'morning')
      .map((table) => table.table);
  }

  if (shiftIndex === 1) {
    return tablesResponse
      ?.filter((table) => table.shift === 'evening')
      .map((table) => table.table);
  }

  if (shiftIndex === 2) {
    return tablesResponse
      ?.filter((table) => table.shift === 'night')
      .map((table) => table.table);
  }
};

export const handleShiftGamePresenters = (
  shiftIndex: number,
  gamePresentersResponse?: gamePresenters[]
) => {
  if (shiftIndex === 0) {
    return gamePresentersResponse
      ?.filter((presenter) => presenter.shift === 'morning')
      .map((presenter) => presenter.gamePresenter);
  }

  if (shiftIndex === 1) {
    return gamePresentersResponse
      ?.filter((presenter) => presenter.shift === 'evening')
      .map((presenter) => presenter.gamePresenter);
  }

  if (shiftIndex === 2) {
    return gamePresentersResponse
      ?.filter((presenter) => presenter.shift === 'night')
      .map((presenter) => presenter.gamePresenter);
  }
};

export const generateRepeatedSequence = (
  shiftIndex: number,
  gamePresentersResponse?: gamePresenters[],
  tablesResponse?: tables[]
) => {
  if (gamePresentersResponse && tablesResponse) {
    const gamePresenters = handleShiftGamePresenters(
      shiftIndex,
      gamePresentersResponse
    );
    const tables = handleShiftTables(shiftIndex, tablesResponse);

    const diff = gamePresenters!.length - tables!.length;

    if (diff < 2) {
      return ['break'];
    }
    if (diff === 2) {
      return ['break', 'break'];
    }
    if (diff === 3) {
      return ['break', 'break', 'break'];
    }
    if (diff >= 4) {
      return ['break', 'break', 'break', 'break'];
    }
  }

  return [];
};

export const validateGamePresenter = (name: string) => {
  const pattern = /^[a-zA-Z0-9 ]+$/;

  if (!pattern.test(name)) {
    return false;
  }

  if (name.length > 12) {
    return false;
  }

  return true;
};
