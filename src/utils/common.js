import Fingerprint2 from 'fingerprintjs2';

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

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str === 'undefined' || str === 'null') {
    return '';
  }
  return str;
}

// 浏览器指纹生成
function getBrowserVer() {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    Fingerprint2.get(function (components) {
      const values = components.map(function (component, index) {
        if (index === 0) {
          // 把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
          return component.value.replace(/\bNetType\/\w+\b/, '');
        }
        return component.value;
      });
      values[6] = [720, 1280];
      values[7] = [680, 1280];
      values[25] = [10, false, false];
      values[26] = [
        'Arial',
        'Arial Black',
        'Arial Narrow',
        'Book Antiqua',
        'Bookman Old Style',
        'Calibri',
        'Cambria',
        'Cambria Math',
        'Century',
        'Century Gothic',
        'Century Schoolbook',
        'Comic Sans MS',
        'Consolas',
        'Courier',
        'Courier New',
        'Georgia',
        'Helvetica',
        'Impact',
        'Lucida Bright',
        'Lucida Calligraphy',
        'Lucida Console',
        'Lucida Fax',
        'Lucida Handwriting',
        'Lucida Sans',
        'Lucida Sans Typewriter',
        'Lucida Sans Unicode',
        'Microsoft Sans Serif',
        'Monotype Corsiva',
        'MS Gothic',
        'MS PGothic',
        'MS Reference Sans Serif',
        'MS Sans Serif',
        'MS Serif',
        'Palatino Linotype',
        'Segoe Print',
        'Segoe Script',
        'Segoe UI',
        'Segoe UI Light',
        'Segoe UI Semibold',
        'Segoe UI Symbol',
        'Tahoma',
        'Times',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana',
        'Wingdings',
        'Wingdings 2',
        'Wingdings 3',
      ];
      // 生成最终id murmur
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      if (murmur !== '') {
        resolve(murmur);
      }
    });
  });
}

export async function setLocalItem(key, value) {
  const num = await getBrowserVer();
  localStorage.setItem(key, value || num);
}

export function setSessionItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function getLocalItem(key, remove = false) {
  try {
    const item = JSON.parse(localStorage.getItem(key));
    if (remove) {
      localStorage.removeItem(key);
    }
    return item;
  } catch (e) {
    const item = localStorage.getItem(key);
    if (remove) {
      localStorage.removeItem(key);
    }
    return item;
  }
}

export function getSessionItem(key, remove = false) {
  try {
    const item = JSON.parse(sessionStorage.getItem(key));
    if (remove) {
      sessionStorage.removeItem(key);
    }
    return item;
  } catch (e) {
    const item = sessionStorage.getItem(key);
    if (remove) {
      sessionStorage.removeItem(key);
    }
    return item;
  }
}
