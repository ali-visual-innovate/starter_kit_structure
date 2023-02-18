import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAppLangStore = defineStore('appLangStore', {
    state: ()=>({
        appLang: useStorage('appLang', 'en'),
        isRtl: useStorage('isRtl', false),
    }),
    getters: {
        getAppLang() {return this.appLang},
        getAppRtl() {return this.isRtl},
    },
    actions: {
        setAppLang(locale) {
            this.appLang = locale
        },
        setAppRtl(isRtl) {
            this.isRtl = isRtl
        }
    }
})