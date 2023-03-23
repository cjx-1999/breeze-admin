import type { App } from 'vue'
import { vLoading, vLoading2, vCopy, vFullscreen, vJelly } from './directive'
export default (app: App<Element>) => {
  vLoading(app)
  vLoading2(app)
  vCopy(app)
  vFullscreen(app)
  vJelly(app)
}
