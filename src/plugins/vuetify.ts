import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#004977',
          secondary: '#ff8f1c',
          accent: '#d9e7f3',
          success: '#1e7f5b',
          warning: '#f2b84b',
          error: '#c92d39',
          info: '#4a7fc1',
          background: '#f4f7fb',
          surface: '#ffffff',
        },
      },
    },
  },
})
