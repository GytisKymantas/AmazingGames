import { gamePresenters, tables } from '@/types/types';
import {
  generateRepeatedSequence,
  getPlayerIdByName,
  getTableIdByName,
  handleShiftGamePresenters,
  handleShiftName,
  handleShiftTables,
} from './requests';

describe('handleShiftName function', () => {
  it('should return "morning" when passed shiftIndex of 0', () => {
    const result = handleShiftName(0);
    expect(result).toEqual('morning');
  });

  it('should return "evening" when passed shiftIndex of 1', () => {
    const result = handleShiftName(1);
    expect(result).toEqual('evening');
  });

  it('should return "night" when passed shiftIndex of 2', () => {
    const result = handleShiftName(2);
    expect(result).toEqual('night');
  });
});

describe('handleShiftTables', () => {
  it('should return an array of table names for morning shift', () => {
    const tables: tables[] = [
      { table: 'Table 1', shift: 'morning' },
      { table: 'Table 2', shift: 'evening' },
      { table: 'Table 3', shift: 'night' },
    ];

    expect(handleShiftTables(0, tables)).toEqual(['Table 1']);
  });

  it('should return an array of table names for evening shift', () => {
    const tables: tables[] = [
      { table: 'Table 1', shift: 'morning' },
      { table: 'Table 2', shift: 'evening' },
      { table: 'Table 3', shift: 'night' },
    ];
    expect(handleShiftTables(1, tables)).toEqual(['Table 2']);
  });

  it('should return an array of table names for night shift', () => {
    const tables: tables[] = [
      { table: 'Table 1', shift: 'morning' },
      { table: 'Table 2', shift: 'evening' },
      { table: 'Table 3', shift: 'night' },
    ];
    expect(handleShiftTables(2, tables)).toEqual(['Table 3']);
  });

  it('should return undefined if tablesResponse is undefined', () => {
    expect(handleShiftTables(0)).toBeUndefined();
  });
});

describe('generateRepeatedSequence', () => {
  it('should return an array with "break" if the difference between the number of game presenters and tables is less than 2', () => {
    const gamePresentersResponse: gamePresenters[] = [
      { gamePresenter: 'Presenter 1', shift: 'morning', id: 1 },
      { gamePresenter: 'Presenter 2', shift: 'morning', id: 2 },
      { gamePresenter: 'Presenter 3', shift: 'morning', id: 3 },
      { gamePresenter: 'Presenter 4', shift: 'morning', id: 4 },
    ];
    const tablesResponse: tables[] = [
      { table: 'Table 1', shift: 'morning', id: 1 },
      { table: 'Table 2', shift: 'morning', id: 2 },
      { table: 'Table 3', shift: 'morning', id: 3 },
    ];

    expect(
      generateRepeatedSequence(0, gamePresentersResponse, tablesResponse)
    ).toEqual(['break']);
  });

  it('should return an array with two "break" if the difference between the number of game presenters and tables is 2', () => {
    const gamePresentersResponse: gamePresenters[] = [
      { gamePresenter: 'Presenter 1', shift: 'morning', id: 1 },
      { gamePresenter: 'Presenter 2', shift: 'morning', id: 2 },
      { gamePresenter: 'Presenter 3', shift: 'morning', id: 3 },
      { gamePresenter: 'Presenter 4', shift: 'morning', id: 4 },
      { gamePresenter: 'Presenter 5', shift: 'morning', id: 5 },
    ];
    const tablesResponse: tables[] = [
      { table: 'Table 1', shift: 'morning', id: 1 },
      { table: 'Table 2', shift: 'morning', id: 2 },
      { table: 'Table 3', shift: 'morning', id: 3 },
    ];

    expect(
      generateRepeatedSequence(0, gamePresentersResponse, tablesResponse)
    ).toEqual(['break', 'break']);
  });

  it('should return an array with three "break" if the difference between the number of game presenters and tables is 3', () => {
    const gamePresentersResponse: gamePresenters[] = [
      { gamePresenter: 'Presenter 1', shift: 'morning', id: 1 },
      { gamePresenter: 'Presenter 2', shift: 'morning', id: 2 },
      { gamePresenter: 'Presenter 3', shift: 'morning', id: 3 },
      { gamePresenter: 'Presenter 4', shift: 'morning', id: 4 },
      { gamePresenter: 'Presenter 5', shift: 'morning', id: 5 },
      { gamePresenter: 'Presenter 6', shift: 'morning', id: 6 },
    ];
    const tablesResponse: tables[] = [
      { table: 'Table 1', shift: 'morning', id: 1 },
      { table: 'Table 2', shift: 'morning', id: 2 },
      { table: 'Table 3', shift: 'morning', id: 3 },
    ];

    expect(
      generateRepeatedSequence(0, gamePresentersResponse, tablesResponse)
    ).toEqual(['break', 'break', 'break']);
  });

  it('should return an array with four "break" if the difference between the number of game presenters and tables is 4 or more', () => {
    const gamePresentersResponse: gamePresenters[] = [
      { gamePresenter: 'Presenter 1', shift: 'morning', id: 1 },
      { gamePresenter: 'Presenter 2', shift: 'morning', id: 2 },
      { gamePresenter: 'Presenter 3', shift: 'morning', id: 3 },
      { gamePresenter: 'Presenter 4', shift: 'morning', id: 4 },
      { gamePresenter: 'Presenter 5', shift: 'morning', id: 5 },
      { gamePresenter: 'Presenter 6', shift: 'morning', id: 6 },
      { gamePresenter: 'Presenter 7', shift: 'morning', id: 7 },
      { gamePresenter: 'Presenter 8', shift: 'morning', id: 8 },
      { gamePresenter: 'Presenter 9', shift: 'morning', id: 9 },
    ];

    const tablesResponse: tables[] = [
      { table: 'Table 1', shift: 'morning', id: 1 },
      { table: 'Table 2', shift: 'morning', id: 2 },
      { table: 'Table 3', shift: 'morning', id: 3 },
    ];
    expect(
      generateRepeatedSequence(0, gamePresentersResponse, tablesResponse)
    ).toEqual(['break', 'break', 'break', 'break']);
  });

  describe('getPlayerIdByName', () => {
    const presenters: gamePresenters[] = [
      { id: 1, gamePresenter: 'John Doe', shift: 'morning' },
      { id: 2, gamePresenter: 'Jane Smith', shift: 'evening' },
      { id: 3, gamePresenter: 'Bob Johnson', shift: 'night' },
    ];

    it('returns the correct player ID when given a matching name and shift', () => {
      expect(getPlayerIdByName(presenters, 'John Doe', 'morning')).toBe(1);
      expect(getPlayerIdByName(presenters, 'Jane Smith', 'evening')).toBe(2);
      expect(getPlayerIdByName(presenters, 'Bob Johnson', 'night')).toBe(3);
    });

    it('returns undefined when given a non-matching name and shift', () => {
      expect(getPlayerIdByName(presenters, 'Alice', 'morning')).toBeUndefined();
      expect(
        getPlayerIdByName(presenters, 'John Doe', 'evening')
      ).toBeUndefined();
      expect(
        getPlayerIdByName(presenters, 'Bob Johnson', 'morning')
      ).toBeUndefined();
    });

    it('returns undefined when given an undefined presenters array', () => {
      expect(
        getPlayerIdByName(undefined, 'John Doe', 'morning')
      ).toBeUndefined();
    });
  });
});

describe('getTableIdByName', () => {
  const tables: tables[] = [
    { id: 1, table: 'table1', shift: 'morning' },
    { id: 2, table: 'table2', shift: 'evening' },
    { id: 3, table: 'table3', shift: 'night' },
  ];

  it('returns the table ID if table name and shift match', () => {
    const tableId = getTableIdByName(tables, 'table1', 'morning');
    expect(tableId).toEqual(1);
  });

  it('returns undefined if table name does not match', () => {
    const tableId = getTableIdByName(tables, 'table6', 'evening');
    expect(tableId).toBeUndefined();
  });

  it('returns undefined if shift does not match', () => {
    const tableId = getTableIdByName(tables, 'table2', 'morning');
    expect(tableId).toBeUndefined();
  });

  it('returns undefined if tables is undefined', () => {
    const tableId = getTableIdByName(undefined, 'table4', 'evening');
    expect(tableId).toBeUndefined();
  });
});

describe('handleShiftGamePresenters', () => {
  const gamePresenters: gamePresenters[] = [
    { id: 1, gamePresenter: 'Presenter A', shift: 'morning' },
    { id: 2, gamePresenter: 'Presenter B', shift: 'evening' },
    { id: 3, gamePresenter: 'Presenter C', shift: 'night' },
    { id: 4, gamePresenter: 'Presenter D', shift: 'morning' },
    { id: 5, gamePresenter: 'Presenter E', shift: 'evening' },
  ];

  it('should return game presenters for morning shift', () => {
    expect(handleShiftGamePresenters(0, gamePresenters)).toEqual([
      'Presenter A',
      'Presenter D',
    ]);
  });

  it('should return game presenters for evening shift', () => {
    expect(handleShiftGamePresenters(1, gamePresenters)).toEqual([
      'Presenter B',
      'Presenter E',
    ]);
  });

  it('should return game presenters for night shift', () => {
    expect(handleShiftGamePresenters(2, gamePresenters)).toEqual([
      'Presenter C',
    ]);
  });

  it('should return undefined for unknown shift index', () => {
    expect(handleShiftGamePresenters(3, gamePresenters)).toBeUndefined();
  });

  it('should return undefined if gamePresentersResponse is undefined', () => {
    expect(handleShiftGamePresenters(0, undefined)).toBeUndefined();
  });
});
