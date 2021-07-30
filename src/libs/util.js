import moment from 'moment';

export function goToView(item) {
  // console.log(item.class)
  // console.log(document.querySelector(`.${item.class}`));
  document.querySelector(`.${item.class}`).scrollIntoView({
    behavior: 'smooth', // 默认 auto
    block: 'center', // 默认 center
    inline: 'nearest', // 默认 nearest
  });
}

// 小数转分数
export const toPercent = (point) => {
  const str = 100 - parseInt(point * 100);
  return str;
};

// 比较日期大小(-分隔)
export const CompareDate = (d1, d2) => {
  // console.log(d1)
  if (new Date(d1.replace(/-/g, '/')) > new Date(d2.replace(/-/g, '/'))) {
    return d1;
  }
  return d2;
};

// 小数向上取整
export const ToInt = data => Math.ceil(data);

// sleep延时函数
export const sleep = time => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, time);
});

// 生成随机字符串（字母数字）
export const randomStr = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// 数组交集
export const getCommonString = (arr1, arr2) => {
  const len = Math.min(arr1.length, arr2.length);
  let i = -1;
  const res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]));

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => target.some(_ => arr.indexOf(_) > -1);

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
export const isMillisecond = (timeStamp) => {
  const timeStr = String(timeStamp);
  return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
export const isEarly = (timeStamp, currentTime) => timeStamp < currentTime;

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const getHandledValue = num => (num < 10 ? `0${num}` : num);

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = '';
  if (startType === 'year') resStr = `${year}-${month}-${date} ${hours}:${minutes}:${second}`;
  else resStr = `${month}-${date} ${hours}:${minutes}`;
  return resStr;
};

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = (timeStamp) => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp);
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) timeStamp /= 1000;
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp);
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000);
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime);
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp;
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff;
  let resStr = '';
  const dirStr = IS_EARLY ? '前' : '后';
  // 少于等于59秒
  if (diff <= 59) resStr = `${diff}秒${dirStr}`;
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = `${Math.floor(diff / 60)}分钟${dirStr}`;
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = `${Math.floor(diff / 3600)}小时${dirStr}`;
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = `${Math.floor(diff / 86400)}天${dirStr}`;
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp);
  else resStr = getDate(timeStamp, 'year');
  return resStr;
};

// 获取当月有多少周
export const getMonthWeek = (y, m, d) => {
  const date = new Date(y, m - 1, d);
  const funD = date.getDate();
  let weekendCount = 0;
  for (let i = 0; i < funD; i++) {
    date.setDate(i + 1);
    if (date.getDay() === 0) {
      weekendCount++;
    }
    if (i === funD - 1 && date.getDay() !== 0) {
      weekendCount += 1;
    }
  }
  return weekendCount;
};

export const getAllLeaf = (data) => {
  const result = [];
  function getLeaf(data) {
    data.forEach((item) => {
      if (!item.children) {
        result.push(item.value);
      } else {
        getLeaf(item.children);
      }
    });
  }
  getLeaf(data);
  return result;
};

export const getPageParams = () => {
  let i;
  let ilen;
  let strs;
  let keyName;
  let keyValue;
  const params = {};
  const path = window.location.pathname;
  const url = window.location.href;
  if (url.indexOf('?') > -1) {
    const index = url.indexOf('?');
    strs = url.substring(index + 1);
    // console.log( strs );
    strs = strs.split('&');
    ilen = strs.length;
    for (i = 0; i < ilen; i++) {
      const indexEqual = strs[i].indexOf('=');
      keyName = strs[i].substring(0, indexEqual);
      keyValue = strs[i].substring(indexEqual + 1);
      if (keyName == 'callback') keyValue = decodeURIComponent(keyValue);
      params[keyName] = keyValue;
    }
  }
  return params;
};

// 以下作为filter(YYYY-MM-DD HH:mm:ss, YYYY-MM-DD)
export const dateFormat = (d, formatter = 'YYYY-MM-DD') => {
  if (!d) {
    return '';
  }
  return moment(d).format(formatter);
};

export const percentageFormat = (value) => {
  if (!value || isNaN(Number(value))) {
    return '0';
  }
  return `${(value * 100).toFixed(2)}`;
};

/**
 * 数字月转英文缩写月
 * @param {Number} month
 * @returns
 */
export const enMonthFormat = (month) => {
  if (isNaN(Number(month))) {
    return '';
  }
  const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return arr[month - 1];
};

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param number 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export const amountFormat = (strData = 0, hasCents = true) => {
  if (!strData) return 0;
  let num = strData.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) { num = '0'; }
  const sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) { cents = `0${cents}`; }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = `${num.substring(0, num.length - (4 * i + 3))},${
      num.substring(num.length - (4 * i + 3))}`;
  }
  if (hasCents) {
    return (`${((sign) ? '' : '-') + num}.${cents}`);
  }
  return (`${((sign) ? '' : '-') + num}`);
};

/**
 *
 * @param {number} year
 * @returns 将自然年转换为财年
 */
export const fiscalYearFormat = year => (`${year}`).substr(2, 2);

export const setDashboardQuery = (obj) => {
  const data = JSON.stringify(obj);
  localStorage.setItem('dashboard_query', data);
};

export const getDashboardQuery = () => {
  const data = localStorage.getItem('dashboard_query');
  return JSON.parse(data) || {};
};
