import {defineStore} from "pinia";
import {ref} from "vue";
import { PORT } from '../stores/plan'

export const useConfigStore = defineStore('config', () => {
    const port = ref(PORT)

    const setPort = (newPort:string) => {
        port.value = newPort
        console.log(newPort)
    }

    return { port, setPort }
})
