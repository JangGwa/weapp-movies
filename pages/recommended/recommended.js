const douban = require('../../network/movie.js')

Page({
  data: {
    title: '',
    page: 1,
    size: 10,
    type: 'top250',
    subtitle: '加载中...',
    loading: true,
    hasMore: true,
    movies: []
  },

  onLoad () {
    console.log('onload')
    douban.find(this.data.type, this.data.page, this.data.size)
      .then(d => this.setData({ movies: d.subjects, loading: false, subtitle: d.title }))
      .catch(e => {
        console.error(e)
        this.setData({ movies: [], loading: false})
      })
  },

  loadMore () {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects), loading: false })
        } else {
          this.setData({ subtitle: d.title, hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },
})
