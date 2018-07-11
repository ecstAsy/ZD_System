/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout ,saveUseInfo} from 'services/app'
import * as menusService from 'services/menus'
import queryString from 'query-string'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    currentItem: {},  //当前选择的话术数据
    searchTxt:'',//搜索条件
    defaultActiveKey:1,
    userInfoModalVisible:false,
    speechcraftModalVisible:false,
    editPwdModalVisible:false,
    QuickSearchModalVisible:false,
    choseItem:[{id:1,title:'我朋友是做保险的',detail:'我朋友是做保险的'},
      {id:2,title:'送的礼品太少了',detail:'送的礼品太少了'},
      {id:3,title:'后勤保障服务怎么样',detail:'后勤保障服务怎么样'},
      {id:4,title:'你们价格比外面高',detail:'你们价格比外面高'},
      {id:5,title:'保养券如何使用',detail:'保养券如何使用'},],
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: '今日汇总',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    * query ({
      payload,
    }, { call, put, select }) {
      const { success, user } = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (success && user) {
        const { list } = yield call(menusService.query)
        const { permissions } = user
        let menu = list
        if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) {
          permissions.visit = list.map(item => item.id)
        } else {
          menu = list.filter((item) => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        });
        if (location.pathname === '/login' || location.pathname === '/') {
          yield put(routerRedux.push({
            pathname: '/dashboard',
          }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },
    //保存个人信息
    * saveUseInfo ({ payload }, { call, put }) {
      const data = yield call(saveUseInfo, payload)
      if (data.success) {
        yield put({ type: 'hideUseInfo' })
      } else {
        throw data
      }
    },


    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    choseDesId(state, { payload }){
      console.log(payload);
      return{
        ...state,currentItem:payload
      }
    },
    openUserInfo(state){
      return {
        ...state,
        userInfoModalVisible: true,
      }
    },
    hideUseInfo (state) {
      return { ...state, userInfoModalVisible: false }
    },
    openSpeechcraftModal(state){
      return { ...state, speechcraftModalVisible: true }
    },
    hideSpeechcraft(state){
      return { ...state, speechcraftModalVisible: false }
    },
    openEditPwdModal(state){
      return { ...state, editPwdModalVisible: true }
    },
    hideEditPwdModal(state){
      return { ...state, editPwdModalVisible: false }
    },
    onChangeSearchTxt(state,{ payload }){
      console.log(payload)
      return { ...state, searchTxt: payload }
    },
    openQuickSearchModal(state){
      return { ...state, QuickSearchModalVisible: true }
    },
    hideQuickSearchModal(state){
      return { ...state, QuickSearchModalVisible: false }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    changeActiveKey(state,{payload}){
      return { ...state, defaultActiveKey: payload }
    },
    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
