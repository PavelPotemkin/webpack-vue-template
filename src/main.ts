import 'assets/scss/main.scss'
import 'material-icons/iconfont/material-icons.css';

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
