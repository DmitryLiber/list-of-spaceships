import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Btn, Container, Loader, Typography, Field, Grid, Card } from '@/shared/ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('btn', Btn)
app.component('loader', Loader)
app.component('typography', Typography)
app.component('container', Container)
app.component('field', Field)
app.component('grid', Grid)
app.component('card', Card)

app.mount('#app')
