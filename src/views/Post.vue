<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="this.date | formatDate" :title="this.date | formatDate" class="post-date">{{ this.date }}</time>
    </h1>
    <article v-if="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
  import Vue from 'vue'
  import api from '../api'
  import marked from '../utils/render.js'

  export default {
    name: 'postView',

    data () {
      return {
        title: '',
        date: null,
        content: ''
      }
    },

    computed: {
      htmlFromMarkdown () {
        return marked(this.content)
      }
    },

    created () {
      this.loadPost()
    },

    methods: {
      loadPost () {
        api.getDetail(this.$route.params.hash)
          .then(content => {
            this.content = content.body
            this.title = content.title
            this.date = content.updated_at

            window.document.title = `${this.title} - PLdaily`
          })
          .catch(err => {
            console.error(err)
            this.$router.replace('/')
          })
      },

      newTab () {
        Vue.nextTick(function () {
          const linksArray = [...document.querySelectorAll('a')]
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              el.rel = 'noopener noreferrer'
            }
          })
        })
      }
    },

    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>
