<template>
  <section class="list-view">
    <div class="loading" v-show="loading">loading..</div>
    <div class="no-content" v-if="!loading && filteredList.length === 0">nothing..</div>
    <ol v-else class="list">
      <li v-for="{ title, date, id } in filteredList" class="list-item">
        <router-link :to="'/post/' + id" class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import NProgress from 'nprogress'

  export default {
    name: 'listView',
    data () {
      return {
        lists: [],
        loading: true
      }
    },

    computed: {
      filteredList () {
        let keyword = ''
        if (this.$route) {
          keyword = (this.$route.query.q || '').toLowerCase()
        }
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    created () {
      window.document.title = 'PLDaily'
    },

    mounted () {
      this.loadList()
    },

    methods: {
      async loadList () {
        NProgress.start()
        try {
          this.lists = await api.getList()
          this.loading = false
          NProgress.done()
        } catch (err) {
          this.loading = false
          console.error(err)
        }
      }
    }
  }
</script>
