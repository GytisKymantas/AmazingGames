export type gamePresenters = {
    id?: number;
    gamePresenter: string,
    shift?:'morning' | 'evening' | 'night';
  };

export type tables  = {
    id?: number;
    table: string,
    shift?: 'morning' | 'evening' | 'night',
  };