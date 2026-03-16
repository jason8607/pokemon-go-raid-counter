import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      appTitle: 'GO 團戰計數器',
      summary: '數據總覽',
      totalRaids: '總場數',
      shiny: '色違',
      hundo: '100%',
      background: '背卡',
      shinyHundo: '色違100%',
      shinyBackground: '色違背卡',
      hundoBackground: '100%背卡',
      shundoBackground: '全滿貫',
      legendary: '傳說團體戰',
      primal: '原始團體戰',
      shadow: '傳說暗影團體戰',
      raidsTab: '團戰列表',
      summaryTab: '總表統計',
      all: '全部',
      dangerZone: '危險區域',
      resetAll: '重置所有數據',
      resetConfirmTitle: '重置所有數據？',
      resetConfirmDesc: '這將會清除您目前所有的捕捉記錄與場數，此操作無法復原。',
      confirmReset: '確定重置',
      cancel: '取消',
      // Types
      type_Normal: '一般',
      type_Fire: '火',
      type_Water: '水',
      type_Electric: '電',
      type_Grass: '草',
      type_Ice: '冰',
      type_Fighting: '格鬥',
      type_Poison: '毒',
      type_Ground: '地面',
      type_Flying: '飛行',
      type_Psychic: '超能力',
      type_Bug: '蟲',
      type_Rock: '岩石',
      type_Ghost: '幽靈',
      type_Dragon: '龍',
      type_Steel: '鋼',
      type_Fairy: '妖精',
      type_Dark: '惡',
      // Pokemon Names
      pkmn_mewtwo: '超夢',
      pkmn_articuno: '急凍鳥',
      pkmn_suicune: '水君',
      pkmn_kyogre_primal: '原始蓋歐卡',
      pkmn_groudon_primal: '原始固拉多',
      pkmn_shadow_articuno: '暗影急凍鳥',
      pkmn_shadow_suicune: '暗影水君',
      pkmn_shadow_kyogre: '暗影蓋歐卡',
      pkmn_shadow_groudon: '暗影固拉多',
    }
  },
  en: {
    translation: {
      appTitle: 'GO Raid Counter',
      summary: 'Summary',
      totalRaids: 'Total',
      shiny: 'Shiny',
      hundo: 'Hundo',
      background: 'BG',
      shinyHundo: 'Shundo',
      shinyBackground: 'Shiny BG',
      hundoBackground: 'Hundo BG',
      shundoBackground: 'Shundo BG',
      legendary: 'Legendary',
      primal: 'Primal',
      shadow: 'Shadow',
      raidsTab: 'Raids',
      summaryTab: 'Summary',
      all: 'All',
      dangerZone: 'Danger Zone',
      resetAll: 'Reset All Data',
      resetConfirmTitle: 'Reset All Data?',
      resetConfirmDesc: 'This will clear all your current records. This action cannot be undone.',
      confirmReset: 'Confirm Reset',
      cancel: 'Cancel',
      // Types
      type_Normal: 'Normal',
      type_Fire: 'Fire',
      type_Water: 'Water',
      type_Electric: 'Electric',
      type_Grass: 'Grass',
      type_Ice: 'Ice',
      type_Fighting: 'Fighting',
      type_Poison: 'Poison',
      type_Ground: 'Ground',
      type_Flying: 'Flying',
      type_Psychic: 'Psychic',
      type_Bug: 'Bug',
      type_Rock: 'Rock',
      type_Ghost: 'Ghost',
      type_Dragon: 'Dragon',
      type_Steel: 'Steel',
      type_Fairy: 'Fairy',
      type_Dark: 'Dark',
      // Pokemon Names
      pkmn_mewtwo: 'Mewtwo',
      pkmn_articuno: 'Articuno',
      pkmn_suicune: 'Suicune',
      pkmn_kyogre_primal: 'Primal Kyogre',
      pkmn_groudon_primal: 'Primal Groudon',
      pkmn_shadow_articuno: 'Shadow Articuno',
      pkmn_shadow_suicune: 'Shadow Suicune',
      pkmn_shadow_kyogre: 'Shadow Kyogre',
      pkmn_shadow_groudon: 'Shadow Groudon',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
