import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { v4 as uuid } from 'uuid';

import Candidate from 'interfaces/candidate.interface';

import {
  CREATE_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
} from 'store/actions/actionTypes';

const initialState: { candidates: Array<Candidate> } = {
  candidates: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_CANDIDATE:
      const newCandidate = {
        ...action.candidate,
        id: uuid(),
      };
      return {
        ...state,
        candidates: [...state.candidates, newCandidate],
      };
    case UPDATE_CANDIDATE:
      const targetIndex = state.candidates.findIndex(
        ({ id }) => id === action.id
      );
      let newCandidates = [...state.candidates];
      newCandidates[targetIndex] = action.candidate;

      return {
        ...state,
        candidates: newCandidates,
      };
    case DELETE_CANDIDATE:
      return {
        ...state,
        candidates: [
          ...state.candidates.filter(({ id }) => {
            const isExists = action.id.some(
              (actionId: string) => actionId === id
            );
            return !isExists;
          }),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
