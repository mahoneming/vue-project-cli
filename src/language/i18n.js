import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store/index'
import locale from 'element-ui/lib/locale';
import zh from './zh/index'
import en from './en/index'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.getters.language,
  messages: {
    'zh-CN': Object.assign(zh, zhLocale),
    'en-US': Object.assign(en, enLocale)
  },
  silentTranslationWarn: true
});
window.i18n = i18n;

locale.i18n((key, value) => i18n.t(key, value)); //为了实现element插件的多语言切换

export default i18n
