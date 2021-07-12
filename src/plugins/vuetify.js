import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#5da400',
        secondary: '#EEF5E5',
        delicate: '#E0E0E0',
        accent: '#F7B500',
        error: '#f44336',
        warning: '#ff5722',
        info: '#607d8b',
        success: '#4caf50',
      },
      dark: {
        primary: '#5da400',
        // secondary: '#ffffff',
      }
    }
  }
})
