//index.js
import V3VirtualScroll from './v3-virtual-scroll/Index.vue'

export { V3VirtualScroll }

const components = [V3VirtualScroll]
const install = function (App: any, options = {}) {
  components.forEach(component => {
    App.component(component.name, component)
  })
}
export default { install }
