import CandidateForm from 'interfaces/candidate-form.interface';
import Candidate from 'interfaces/candidate.interface';
import {
  CREATE_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
} from 'store/actions/actionTypes';

const createCandidate = (candidate: CandidateForm) => ({
  type: CREATE_CANDIDATE,
  candidate,
});
const updateCandidate = (id: string, candidate: Candidate) => ({
  type: UPDATE_CANDIDATE,
  id,
  candidate,
});
const deleteCandidate = (id: Array<string>) => ({ type: DELETE_CANDIDATE, id });

export { createCandidate, updateCandidate, deleteCandidate };
