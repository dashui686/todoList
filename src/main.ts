import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'

//pinia
import pinia from './stores/index'
 //routes
 import router from "./routes/index";

 const app= createApp(App)
 
 app.use(pinia)
 //routes 
 app.use(router)  
app.mount('#app')
export default app; // Export the app instance