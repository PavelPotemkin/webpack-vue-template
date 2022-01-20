import '@/vue/index'

function init () {
  console.log('init')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}
