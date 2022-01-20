import '@/assets/scss/pages/about.scss'
import fetchData from "@/api/fetchData";

function init() {
  console.log('init')
   
  const getData = async () => await fetchData()

  getData().then(res => console.log(res)) 
} 

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else { 
  init()
}
