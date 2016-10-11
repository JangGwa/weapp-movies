const douban = require('../../network/movie.js')
// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '',
    loading: true,
    movie: {}
  },

  onLoad (params) {
    douban.findOne(params.id)
      .then(d => this.setData({ title: d.title, movie: d, loading: false }))
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {}, loading: false })
        console.error(e)
      })
  },
})
