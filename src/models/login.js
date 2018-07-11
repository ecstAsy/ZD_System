import { routerRedux } from 'dva/router'
import { login } from 'services/login'

export default {
  namespace: 'login',

  state: {
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)

      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login' && from !=='/' ) {
          console.log('3')
          console.log(from)
          yield put(routerRedux.push(from))
        } else {
          console.log('4')
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data;

      }
    },
  },

}
