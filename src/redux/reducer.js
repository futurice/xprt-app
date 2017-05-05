import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import SessionStateReducer, { RESET_STATE } from '../modules/session/SessionState';
import { reducers as RestReducers } from '../utils/rest';
import { reducer as LoginReducer } from '../modules/login/Login';
import { reducer as SelectExpertReducer } from '../modules/lectureInvitation/LectureInvitationView';

const reducers = {
  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

  login: LoginReducer,

  selectedExpert: SelectExpertReducer,

  ...RestReducers,
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || undefined, action);

  return loop(nextState, effects);
}
