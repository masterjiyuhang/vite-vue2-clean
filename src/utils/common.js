/**
 * 获取浏览器语言
 * @returns {String} language
 */
export function getBrowserLanguage() {
  const nav = window.navigator;
  const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

  // Modern browsers (IE11+, Chrome, Firefox, Safari, Edge) use navigator.languages
  if (Array.isArray(nav.languages)) {
    for (const lang of nav.languages) {
      if (lang && lang.length > 0) {
        return lang;
      }
    }
  }

  // Other browsers use navigator.language
  for (const key of browserLanguagePropertyKeys) {
    const language = nav[key];
    if (language && language.length > 0) {
      return language;
    }
  }

  // Fallback to 'en' if the browser language cannot be determined
  return 'en-US';
}
