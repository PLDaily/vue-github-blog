import axios from 'axios'

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  // let url = `https://api.github.com/repos/${conf.repo}/contents/`
  // if (conf.path) url += conf.path
  // if (conf.branch) url += `?ref=${conf.branch}`
  // return url
  let url = 'https://api.github.com/repos/pldaily/blog/issues?page=1&per_page=10';
  return url;
}

/**
 * Format GitHub Api url for file content
 * @param {string} hash
 * @returns {string}
 */
function getPostUrl (id) {
  // @see https://developer.github.com/v3/git/blobs/#get-a-blob
  // return `https://api.github.com/repos/${conf.repo}/git/blobs/${hash}`
  return  `https://api.github.com/repos/pldaily/blog/issues/${id}`
}

// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

export default {

  getList () {
    // if (!Cache.has('list')) {
    //   // Read from cache
    //   return Promise.resolve(Cache.get('list'))
    // } else {
      return axios.get(getListUrl())
        .then(res => res.data)
        .then(arr => {
          // Data cleaning
          const list = arr.map(({title, created_at, number}) => ({
            title: title,
            date: created_at,
            id: number
          }))
          // Save into cache
          // Cache.set('list', list)
          // ..then return
          return list
        })
    // }
  },

  getDetail (id) {
    const cacheKey = 'post.' + id

    // if (!Cache.has(cacheKey)) {
    //   // Read from cache
    //   return Promise.resolve(Cache.get(cacheKey))
    // } else {
      return axios.get(getPostUrl(id))
        .then(res => res.data)
        .then(content => {
          // Save into cache
          // Cache.set(cacheKey, content)
          // ..then return
          return content
        })
    // }
  }
}
