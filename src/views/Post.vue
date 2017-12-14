<template>
  <section class="post-view">
    <div v-show="loading">loading..</div>
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="this.date | formatDate" :title="this.date | formatDate" class="post-date">{{ this.date | timeago }}</time>
    </h1>
    <article v-if="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
  import api from '../api'
  import marked from '../utils/render.js'
  import NProgress from 'nprogress'

  export default {
    name: 'postView',

    data () {
      return {
        title: '',
        date: null,
        loading: true,
        content: ''
      }
    },

    computed: {
      htmlFromMarkdown () {
        return marked(this.content)
      }
    },

    mounted () {
      this.loadDetail()
    },

    methods: {
      async loadDetail () {
        NProgress.start()
        try {
          let content = await api.getDetail(this.$route.params.hash)
          this.loading = false
          this.content = content.body
          this.title = content.title
          this.date = content.updated_at
          window.document.title = `${this.title} - PLdaily`
          NProgress.done()
        } catch (err) {
          this.loading = false
          console.error(err)
        }
      }
    }
  }
</script>
