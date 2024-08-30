/**
 * telFormat  手机号前三后四显示
 * firstLetterUpper  字符串首字母大写
 * dateFormat    格式化日期
 * beforeDateFormat    刚刚、几天前、几个月前、几年前
 * calculateDiffTime   时间差
 * getWeek   星期几
 * numFilterThreeCut    数字 逢三一断
 * digitUppercase       数字转为大写金额
 * changeToChinese      将阿拉伯数字翻译成中文的大写数字
 * urlToObject          获取链接参数  根据&划分
 * uniqueArrayAndObject 数组去重
 * sortArray            数组排序
 * getLastTime          获取前、后 几天 日期
 * getDateOfWeek        获取该日期所在周，周一到周天的日期
 * */ 
// 
/**
* 手机号前三后四显示
* @param tel: 手机号
*/
export function telFormat(tel: string): string {
  tel = String(tel);
  const phoneReg: RegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!phoneReg.test(tel)) {
    return '格式化内容不符合手机号规则请检查';
  } 
  return `${tel.slice(0, 3)}****${tel.slice(7)}`;
}

/**
* 字符串首字母大写
* @param str
*/
export function firstLetterUpper(str: string): string {
  // 将字符串的第一个字母转换为大写，然后与剩余的字符串连接
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
* 格式化日期
* @param fmt：格式YYYY-mm-dd HH:MM:SS等
* @param date 日期
*/
export function dateFormat(fmt: string, date: any): string {
  let ret: RegExpExecArray | null;
  const newDate = new Date(date);
  const opt: { [key: string]: string } = {
    "Y+": newDate.getFullYear().toString(), // 年
    "m+": (newDate.getMonth() + 1).toString(), // 月
    "d+": newDate.getDate().toString(), // 日
    "H+": newDate.getHours().toString(), // 时
    "M+": newDate.getMinutes().toString(), // 分
    "S+": newDate.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  let k: string;
  for (k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}


/**
* 判断时间过去了多久
* @param date 日期
* @returns 刚刚、几天前、几个月前、几年前
*/
export function beforeDateFormat(date: string | Date | number | undefined): string | undefined {
  if (!date) {
    return undefined;
  }
  // 将输入转换为日期对象
  let timePublish: Date = new Date(date);
  let timeNow: Date = new Date();
  let minute: number = 1000 * 60;
  let hour: number = minute * 60;
  let day: number = hour * 24;
  let month: number = day * 30;
  let year: number = month * 12;
  let diffValue: number = timeNow.getTime() - timePublish.getTime();
  let diffMonth: number = diffValue / month;
  let diffWeek: number = diffValue / (7 * day);
  let diffDay: number = diffValue / day;
  let diffHour: number = diffValue / hour;
  let diffMinute: number = diffValue / minute;
  let diffYear: number = diffValue / year;
  let result: string;

  if (diffValue < 0) {
    result = "刚刚";
  } else if (diffYear > 1) {
    result = Math.floor(diffYear) + "年";
  } else if (diffMonth > 1) {
    result = Math.floor(diffMonth) + "月";
  } else if (diffWeek > 1) {
    result = Math.floor(diffWeek) + "周";
  } else if (diffDay > 1) {
    result = Math.floor(diffDay) + "天";
  } else if (diffHour > 1) {
    result = Math.floor(diffHour) + "小时";
  } else if (diffMinute > 1) {
    result = Math.floor(diffMinute) + "分钟";
  } else {
    result = "刚刚";
  }
  return result;
}


/**
* 时间差
* @param startTime 开始时间
* @param endTime 结束时间
* @param type 类型， 非必填
* @returns **年**月**日 时分秒
*/
export function calculateDiffTime(startTime: string | number | Date, endTime: string | number | Date, type?: number): string {
  let startTimeDate: Date = new Date(startTime);
  let endTimeDate: Date = new Date(endTime);
  let runTime: number = Math.floor((endTimeDate.getTime() - startTimeDate.getTime()) / 1000);
  runTime = runTime < 0 ? -runTime : runTime;
  if (runTime === 0) { return '时间无差别'; }
  let year: number = Math.floor(runTime / 86400 / 365);
  runTime %= 86400 * 365;
  let month: number = Math.floor(runTime / 86400 / 30);
  runTime %= 86400 * 30;
  let day: number = Math.floor(runTime / 86400);
  runTime %= 86400;
  let hour: number = Math.floor(runTime / 3600);
  runTime %= 3600;
  let minute: number = Math.floor(runTime / 60);
  let second: number = runTime % 60;
  const defaultType: number = 4;
  const resultType: number = type || defaultType;
  let str: string = '';
  switch (resultType) {
    case 1: // 返回相差年数
      str = year + '年';
      break;
    case 2: // 返回相差年数月数
      if (year > 0) { str += year + '年'; }
      str += month + '月';
      break;
    case 3: // 返回相差年数月数天数
      if (year > 0) { str += year + '年'; }
      if (month > 0) { str += month + '月'; }
      str += day + '日';
      break;
    default: // 返回相差年数月数天数时分秒
      if (year > 0) { str += year + '年'; }
      if (month > 0) { str += month + '月'; }
      if (day > 0) { str += day + '日'; }
      if (hour > 0) { str += hour + '时'; }
      if (minute > 0) { str += minute + '分'; }
      if (second > 0) { str += second + '秒'; }
      break;
  }
  return str;
}


/**
* 星期几
* @param current 日期
* @returns 星期一 到 星期日
*/
export function getWeek(current?: string | number | Date): string {
  const week: number = current ? new Date(current).getDay() : new Date().getDay();
  const map: { [key: number]: string } = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  };
  return map[week];
}


/**
* 数字 逢三一断
* @param value 数字
*/
export function numFilterThreeCut(value: string | number | null): string {
  if (!value) return '0.00';
  if (value === '-') {
    return value.toString();
  }
  
  let saveFort: string = '';
  let valueString: string;
  
  if (typeof value !== 'string') {
    valueString = JSON.stringify(value);
  } else {
    valueString = value;
  }
  
  if (valueString.indexOf('.') !== -1) {
    saveFort = valueString.split('.')[1];
  }
  
  valueString = Number(valueString).toFixed(2);
  const intPart: number = Math.trunc(Number(valueString)); // 获取整数部分
  const intPartFormat: string = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  
  if (saveFort) {
    return `${intPartFormat}.${saveFort}`;
  }
  
  return intPartFormat;
}


/**
* 数字转为大写金额
* @param value 数字
*/
export function digitUppercase(n: number): string {
  const fraction: string[] = ['角', '分'];
  const digit: string[] = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  const unit: string[][] = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  n = Math.abs(n);
  let s: string = '';

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p: string = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


/**
* 将阿拉伯数字翻译成中文的大写数字
* @param value 数字
*/
export function changeToChinese(num: number): string {
  const AA: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  const BB: string[] = ["", "十", "百", "千", "万", "亿", "点", ""];
  let a: string[] = ("" + num).replace(/(^0*)/g, "").split("."),
    k: number = 0,
    re: string = "";

  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0') re = AA[0] + re;
    if (a[0].charAt(i) !== '0') re = AA[parseInt(a[0].charAt(i))] + BB[k % 4] + re;
    k++;
  }

  if (a.length > 1) {
    re += BB[6];
    for (let i = 0; i < a[1].length; i++) re += AA[parseInt(a[1].charAt(i))];
  }

  if (re === '一十') re = "十";
  if (re.match(/^一/) && re.length === 3) re = re.replace("一", "");

  return re;
}


/**
* 获取链接参数
* @param str
*/
export function urlToObject(url?: string): { [key: string]: string } {
  const result: { [key: string]: string } = {};
  if (url) {
    const testArray = url.split('&');
    for (let i = 0; i < testArray.length; i++) {
      const attr = testArray[i].split('=');
      if (attr[0] && !result[attr[0]]) {
        result[attr[0]] = attr[1];
      }
    }
    return result;
  } else {
    return result;
  }
}


/**
* 数组去重
* @param 数组
*/
export interface UniqueOptions<T> {
  key?: keyof T; // 可选的键，用于数组对象的去重
}
export function uniqueArrayAndObject<T>(arr: T[], options?: UniqueOptions<T>): T[] {
  // 复制原数组
  // const uniqueArray: T[] = [...arr];
  var uniqueArray = arr.slice();
  // 用于跟踪已存在的值
  const seen = new Map<any, boolean>();
  // 如果指定了去重的键，则按对象的键去重
  if (options?.key !== undefined) {
    return uniqueArray.filter((item:any) => {
      const value:any = item[options.key];
      if (!seen.has(value)) {
        seen.set(value, true);
        return true;
      }
      return false;
    });
  } else {
    // 如果没有指定键，则按普通数组去重
    return uniqueArray.filter((item: T, index: number, self: T[]) => {
      return self.indexOf(item) === index;
    });
  }
}
export function uniqueArray<T>(arr: T[]): T[] {
  const seen = new Map<T, boolean>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.set(item, true);
      result.push(item);
    }
  }
  return result;
}
// 对象数组去重
/**
 * T是数组中对象的类型，
 * K是对象属性的类型，它必须是T的键。
 * property 参数是我们要基于去重的属性名
 */
export function uniqueArrayByProperty<T, K extends keyof T>( arr: T[], property: K): T[] {
  const result: T[] = [];
  const seen = new Map<T[K], boolean>();

  for (const item of arr) {
    if (!seen.has(item[property])) {
      seen.set(item[property], true);
      result.push(item);
    }
  }

  return result;
}


/**
* 数组排序
* @param 数组
* 兼容： 数组、数组对象、升序、降序
*/
export interface SortOptions<T> {
  key?: keyof T; // 可选的键，用于数组对象的排序
  order: 'asc' | 'desc'; // 排序方向：升序或降序
}
export function sortArray<T>(arr: T[], options: SortOptions<T>): T[] {
  // 复制原数组
  // const sortedArray = [...arr];
  var sortedArray = arr.slice();

  // 如果指定了排序的键，则按对象的键排序
  if (options.key !== undefined) {
    sortedArray.sort((a:any, b: any) => {
      const valA = (a[options.key] as any);
      const valB = (b[options.key] as any);
      if (options.order === 'asc') {
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      } else {
        return valA > valB ? -1 : valA < valB ? 1 : 0;
      }
    });
  } else {
    // 如果没有指定键，则按普通数组排序
    sortedArray.sort((a: any, b: any) => {
      if (options.order === 'asc') {
        return a < b ? -1 : a > b ? 1 : 0;
      } else {
        return a > b ? -1 : a < b ? 1 : 0;
      }
    });
  }

  return sortedArray;
}


/**
 * 获取前、后 几天 日期
 * @param date
 * @param day
 * @param type
 * @returns {string}
 */
export function getLastTime(date: string | Date, day: number, type?:string): string {
  let dateString: string;
  if (typeof date === 'string') {
    dateString = date;
  } else if(JSON.stringify(date).indexOf('T') != -1 && JSON.stringify(date).indexOf('Z') != -1){
    dateString = dateFormat("YYYY-mm-dd HH:MM:SS", date)
  } else {  // 当date是Date对象时，转换为ISO字符串再替换掉T和Z
    dateString = date.toISOString().replace('T', ' ').replace('Z', '');
  }
  let newDate = new Date(dateString.replace(/-/g, '/'));
  let dd = new Date(newDate);
  dd.setDate(dd.getDate() + day);
  let y:string | number = dd.getFullYear();
  let m:string | number = (dd.getMonth() + 1).toString().padStart(2, '0');
  let d:string | number = dd.getDate().toString().padStart(2, '0');
  let hh:string | number = dd.getHours();
  let mm:string | number = dd.getMinutes();
  let ss:string | number = dd.getSeconds();
  if(type){
    hh = (Number(hh) < 10) ? '0'+ hh : hh;
    mm = (mm < 10) ? '0'+ mm : mm;
    ss = (ss < 10) ? '0'+ ss : ss;
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  }
  return `${y}-${m}-${d}`;
}


// 获取该日期所在周，周一的日期
export function getDateOfWeek(date: string | Date, week:number) {
  // 当前日期是周几
  // 0: '星期日', 1: '星期一', 2: '星期二', 3、4、5、6、7
  var weekData: number = date ? new Date(date).getDay() : new Date().getDay();
  weekData = (weekData == 0) ? 7 : weekData
  // 当前日期满足所需的周几
  if(weekData == week){
    return getLastTime(date, 0);
  }
  // 获取当前日期所在周一日期
  var perDay = -weekData+1;
  var MondayDate = getLastTime(date, perDay);
  // 当前 大于 所需的
  return getLastTime(MondayDate, (week-1));
}
