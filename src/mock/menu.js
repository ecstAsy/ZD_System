const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: '今日汇总',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '名单查询',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    bpid: '2',
    mpid: '-1',
    name: '新增名单',
    icon: 'user',
    route: '/user/add',
  },
  {
    id: '21',
    bpid: '2',
    mpid: '-1',
    name: '用户信息',
    icon: 'user',
    route: '/user/quote',
  },
  {
    id: '3',
    bpid: '1',
    name: '名单申请',
    icon: 'user',
    route: '/application',
  },
  {
    id: '4',
    bpid: '1',
    name: '成功提交保单',
    icon: 'user',
    route: '/successPolicy',
  },

  // {
  //   id: '70002',
  //   bpid: '1',
  //   name: '采购商',
  //   icon: 'home',
  //   route: '/purchase',
  // },
  // {
  //   id: '700011',
  //   mpid: '-1',
  //   bpid: '70001',
  //   name: '采购商明细',
  //   route: '/purchase/:id',
  // },
  // {
  //   id: '80001',
  //   bpid: '1',
  //   name: '门店',
  //   icon: 'home',
  //   route: '/provider',
  // },
  // {
  //   id: '800011',
  //   mpid: '-1',
  //   bpid: '80001',
  //   name: '门店详情',
  //   route: '/provider/info/:id',
  // },
  // {
  //   id: '800012',
  //   mpid: '-1',
  //   bpid: '80001',
  //   name: '修改门店',
  //   route: '/provider/form/:id',
  // },
  // {
  //   id: '800013',
  //   mpid: '-1',
  //   bpid: '80001',
  //   name: '新增门店',
  //   route: '/provider/form',
  // },
  // {
  //   id: '90001',
  //   bpid: '1',
  //   name: '卡券模板',
  //   icon: 'credit-card',
  //   route: '/cardmodel',
  // },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
