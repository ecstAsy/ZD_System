import { routerRedux } from 'dva/router';
import { login } from 'services/login';

export default {
  namespace: 'login',

  state: {

  },

  effects: {
    * login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload);
      const { locationQuery } = yield select(_ => _.app);
      if (data.success) {
        if(payload.remember){
          window.localStorage.setItem("loginInfo",JSON.stringify(payload));
        }
        const { from } = locationQuery;
        yield put({ type: 'app/query' });
        if (from && from !== '/login' && from !=='/' ) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data;
      }
    },
  },

}
