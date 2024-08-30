
/***
 * routineChecker   校验常规数据
 * carNoQChecker   是否车牌号
 * idCardChecker  身份证号校验
 * bankCardChecker   银行卡号码校验（luhn算法）
 * cnChecker      是否包含中文的字符串
 * numChecker  是否是数字
 * passportChecker      验证护照（包含香港、澳门）
 * */
/**
* 校验常规数据格式
* @param type: email、phone、weixin、qq、url
* @param value: 需要检验的内容
*/
export function routineChecker(value: string, type?: string): { res: boolean; msg: string } {
  var allReg: RegExp | string = '';
  var backVal:string = '';
  if(!type){
    backVal = '未指定要校验内容的格式';
  } else if(type == 'email'){
    allReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    backVal = allReg.test(value) ? '' : '邮箱格式不正确';
  } else if(type == 'phone'){
    allReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    backVal = allReg.test(value) ? '' : '手机号码格式不正确';
  } else if(type == 'weixin'){
    allReg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    backVal = allReg.test(value) ? '' : '微信号格式不正确';
  } else if(type == 'qq'){
    allReg = /^[1-9][0-9]{4,10}$/;
    backVal = allReg.test(value) ? '' : 'QQ号码格式不正确';
  } else if(type == 'url'){
    allReg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    backVal = allReg.test(value) ? '' : 'URL地址格式不正确';
  } else {
    backVal = '目前无法校验该类型格式';
  }
  const data: { res: boolean; msg: string } = {
    res: backVal == '',
    msg: backVal
  };
  return data;
}


/**
* 是否车牌号
* @param value: 需要检验的内容
*/
export interface CarNoValidationResult {
  res: boolean;
  msg: string;
}
export function carNoQChecker(value: string): CarNoValidationResult {
  // 新能源
  const xny: RegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([A-HJ-K][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 燃油车
  const ryc: RegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  let isValid: string = '';

  if (value.length === 7) {
    if (!ryc.test(value)) isValid = '车牌号格式不正确';
  } else if (value.length === 8) {
    if (!xny.test(value)) isValid = '车牌号格式不正确';
  } else {
    isValid = '车牌号长度不正确';
  }
  const data: CarNoValidationResult = {
    res: isValid === '',
    msg: isValid
  };
  return data;
};


/**
* 身份证号校验
* @param card: 需要检验的内容
*/
export const idCardChecker = (card: string): { res: boolean; msg: string } => {
  let pass = true;
  let sex = '';
  let text:any = '';

  // 是否为空
  if (card === '') {
    text = '未发现需要校验的内容';
  }

  // 校验长度，类型
  if (IdentityCode_isCardNo(card)) {
    text = IdentityCode_isCardNo(card);
  } else if (IdentityCode_checkProvince(card)) {
    // 检查省份
    text = IdentityCode_checkProvince(card);
  } else if (IdentityCode_checkBirthday(card)) {
    // 校验生日
    text = IdentityCode_checkBirthday(card);
  } else if (IdentityCode_checkParity(card)) {
    // 检验位的检测
    text = IdentityCode_checkParity(card);
  }

  const data = {
    res: text === '',
    msg: text
  };

  return data;
};
//检查号码是否符合规范，包括长度，类型  
function IdentityCode_isCardNo(card:string) {
  if(card.length !=15 && card.length !=18){
    return '身份证号长度为15、18位请检查';
  }
  var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; 
  if (reg.test(card) === false) {
    return '身份证位15、18位数字请检查';
  }
  return '';
}
//取身份证前两位，校验省份 
function IdentityCode_checkProvince(card:string) {   
  const province = card.slice(0, 2); // 使用 slice 替代 substr
  const aIdentityCode_City: { [key: string]: string } = {
    // 城市代码列表
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林",
    23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
    37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  };
  if (aIdentityCode_City[province] == undefined) {
    return '身份证号省份错误';
  }
  return '';
}
//检查生日是否正确，15位以'19'年份来进行补齐。  
function IdentityCode_checkBirthday(card:string) { 
  var len:number | string = card.length;
  //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字    
  if (len == 15) {
    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    var arr_data:any = card.match(re_fifteen); // 正则取号码内所含出年月日数据  
    var year = arr_data[2];
    var month = arr_data[3];
    var day = arr_data[4];
    var birthday = new Date('19' + year + '/' + month + '/' + day);
    return IdentityCode_verifyBirthday('19' + year, month, day, birthday);
  }
  //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X    
  if (len == 18) {
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    var arr_data:any = card.match(re_eighteen); // 正则取号码内所含出年月日数据  
    var year = arr_data[2];
    var month = arr_data[3];
    var day = arr_data[4];
    var birthday = new Date(year + '/' + month + '/' + day);
    return IdentityCode_verifyBirthday(year, month, day, birthday);
  }
  return false;
}
//校验日期 ，15位以'19'年份来进行补齐。
function IdentityCode_verifyBirthday(year:any, month:any, day:any, birthday:any) {
  var now = new Date();
  var now_year = now.getFullYear();
  //年月日是否合理    
  if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
    //判断年份的范围（3岁到150岁之间)    
    var time = now_year - year;
    if (time >= 3 && time <= 150) {
      return '';
    }
    return '身份证号生日格式错误请检查';
  }
  return '身份证号生日格式错误请检查';
}
//校验位的检测 
function IdentityCode_checkParity(card:string) {  
  // 15位转18位
  card = IdentityCode_changeFivteenToEighteen(card);     
  var len = card.length;
  if (len == 18) {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var cardTemp = 0, i, valnum;
    for (i = 0; i < 17; i++) {
      const char = card.slice(i, i + 1); // 使用 slice 代替 substr
      cardTemp += parseInt(char) * arrInt[i];
    }
    valnum = arrCh[cardTemp % 11];
    if (valnum == card.charAt(17)) {
      return '';
    }
    return '身份证号格式不正确请检查';
  }
  return '身份证号格式不正确请检查';
}
function IdentityCode_changeFivteenToEighteen(card:string) {  //15位转18位身份证号   
  if (card.length == 15) {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var cardTemp = 0, i;
    card = card.slice(0, 6) + '19' + card.slice(6);
    for (i = 0; i < 17; i++) {
      const char = card.slice(i, i + 1); // 使用 slice 代替 substr
      cardTemp += parseInt(char) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
    return card;
  }
  return card;
}


/**
* 银行卡号码校验（luhn算法）
* @param cardNumber: 需要检验的内容
*/
export const bankCardChecker = (cardNumber: string): { res: boolean; msg: string } => {
  let msgBankCard = '';
  const pattern: RegExp = /^(?:[1-9]\d{15}|[1-9]\d{17}|[1-9]\d{18})$/;
  if (pattern.test(cardNumber)) {
    let sum = 0;
    let shouldDouble = false;
    // 从字符串的末尾开始遍历每个数字
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    // 如果总和能被10整除，则号码有效
    if (sum % 10 === 0) {
      msgBankCard = '';
    } else {
      msgBankCard = '银行卡号格式错误请检查';
    }
  } else {
    msgBankCard = '银行卡号格式错误请检查';
  }
  const data = {
    res: msgBankCard === '',
    msg: msgBankCard
  };
  return data;
};


/**
* 是否包含中文的字符串
* @param s: 需要检验的内容
* @param num: 需要检验的内容长度
*/
export const cnChecker = (s: string, num?: number): { res: boolean; msg: string } => {
  let msgCn = '';
  const count: number = num || 4;
  const cnReg: RegExp = /[\u4E00-\u9FA5]/;
  if (!s) {
    msgCn = '未发现需检测内容请检查';
  } else if (s.length !== count) {
    msgCn = '校验内容长度不正确请检查';
  } else if (!cnReg.test(s)) {
    msgCn = '校验内容格式不正确请检查';
  }
  const data = {
    res: msgCn === '',
    msg: msgCn
  };
  return data;
};

/**
*  判断是否是数字
* @param {Number} data
* @param num: 需要检验的内容长度
*/
export const numChecker = (value: number, num?: number): { res: boolean; msg: string } => {
  let msgNum = '';
  const count: number = num || 4;
  const numReg: RegExp = /^\d+$/;
  if (!value) {
    msgNum = '未发现需检测内容请检查';
  } else if (typeof value !== 'number' || !numReg.test(value.toString())) {
    msgNum = '校验内容格式不正确请检查';
  } else if (String(value).length !== count) {
    msgNum = '校验内容长度不正确请检查';
  }
  const data: { res: boolean; msg: string } = {
    res: msgNum === '',
    msg: msgNum
  };
  return data;
};


/**
* 验证护照（包含香港、澳门）
* @param passportNumber: 需要检验的内容
* @param country: china、international、us
*/
export const passportChecker = (passportNumber: string, country?: string): { res: boolean; msg: string } => {
  let regex: RegExp;
  const value: string = country || 'china';

  switch (value.toLowerCase()) {
    case 'international':
      regex = /^[A-Z0-9<]{9}[0-9]{1}[A-Z<]$/;
      break;
    case 'us':
      regex = /^\d{9}$/;
      break;
    case 'china':
      // regex = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
      regex = /^[a-zA-Z]\d{7,8}$/;
      break;
    default:
      return { res: false, msg: '不支持的国家代码，请检查' }; // 如果国家不在列表中，则返回错误信息
  }

  const data: { res: boolean; msg: string } = {
    res: regex.test(passportNumber),
    msg: regex.test(passportNumber) ? '' : '护照号格式不正确请检查'
  };

  return data;
};
