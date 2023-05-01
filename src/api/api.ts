import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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


export const api = createApi({ 
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:8080' }), 
  tagTypes: ['games'], 
  endpoints: (builder) => ({  
    getAllGamePresenters: builder.query<gamePresenters[], void>({ 
      query: () => `presenters`,     
    }),
    getAllTables: builder.query<tables[], void>({ 
      query: () => `tables`,    
    }),
    createGamePresenter: builder.mutation<gamePresenters[], gamePresenters>({ 
      query: ({gamePresenter,shift}) => ({
        url: `/presenters`,
        method: 'POST',
        body: {gamePresenter,shift} 
      }),
      invalidatesTags: ['games'],
    }),

    createTable: builder.mutation<tables[], tables>({ 
      query: ({table, shift}) => ({
        url: `/tables`,
        method: 'POST',
        body: {table,shift} 
      }),
      invalidatesTags: ['games'], 
    }),

    deleteGamePresenter: builder.mutation<gamePresenters[], void>({
      query: (id) => ({
        url: `/presenters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['games'],
    }),

    deleteTable: builder.mutation<tables, number | undefined>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['games'],
    }),

    updateTable: builder.mutation<tables[], tables>({
      query: ({ id, table,shift }) => ({
        url: `/tables/${id}`,
        method: 'PUT',
        body: { table,shift }
      }),
      invalidatesTags: ['games'],
    }),

    updatePlayer: builder.mutation<gamePresenters[], gamePresenters>({
      query: ({ id, gamePresenter, shift }) => ({
        url: `/presenters/${id}`,
        method: 'PUT',
        body: { gamePresenter, shift }
      }),
      invalidatesTags: ['games'],
    })

  }),
});

export const { useGetAllGamePresentersQuery, useCreateGamePresenterMutation,useDeleteGamePresenterMutation, useUpdatePlayerMutation, useGetAllTablesQuery,useCreateTableMutation,useDeleteTableMutation, useUpdateTableMutation} = api;
