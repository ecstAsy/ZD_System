const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: '中德呼叫中心系统',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/call.png',
  logo2:'/call2.png',
  logo3:'/ghef_03.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    successPolicys:`${APIV1}/successPolicys`,
    records:`${APIV1}/records`,
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    providers: `${APIV1}/providers`,
    provider: `${APIV1}/provider/:id`,
    purchase: 'api_1/purchases/:id',
    complaint:`${APIV1}/complaint`,
    allocate:`${APIV1}/allocate`,
    rebateapply:`${APIV1}/rebateapply`
  },
}
