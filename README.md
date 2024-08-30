# winner-front(函数库)

## 概述
前端开发常用到的一下弹框、校验（手机号、姓名、身份证、车牌号等）、方法（获取参数对象、获取具体参数值）、格式化（时间、星期几、）等。 封装成npm包，引用使用，不需要重复造轮子，把精力放在业务逻辑上！

## Install(安装)

npm install newfrontnpm --save

## 使用
#### import { routineChecker, passportChecker } from 'newfrontnpm';
> import 方法名，目前包含21个，如：
> 1、routineChecker   校验常规数据
> 2、carNoQChecker   是否车牌号
> 3、idCardChecker  身份证号校验
> 4、bankCardChecker   银行卡号码校验（luhn算法）
> 5、cnChecker      是否包含中文的字符串
> 6、numChecker  是否是数字
> 7、passportChecker      验证护照（包含香港、澳门）
> 8、telFormat  手机号前三后四显示
> 9、firstLetterUpper  字符串首字母大写
> 10、dateFormat    格式化日期
> 11、beforeDateFormat    刚刚、几天前、几个月前、几年前
> 12、calculateDiffTime   时间差
> 13、getWeek   星期几
> 14、numFilterThreeCut    数字 逢三一断
> 15、digitUppercase       数字转为大写金额
> 16、changeToChinese      将阿拉伯数字翻译成中文的大写数字
> 17、urlToObject          获取链接参数  根据&划分
> 18、uniqueArrayAndObject 数组去重
> 19、sortArray            数组排序
> 20、getLastTime          获取前、后 几天 日期
> 21、getDateOfWeek        获取该日期所在周，周一到周天的日期

<br><br>

## 说明：正则校验

### 1、routineChecker(val,type)常规校验，包括email、 phone 、weixin、qq、url
#### 调用：routineChecker(校验值，校验类型type)
```javascript
routineChecker("932647051@qq.com", 'email'); >>> { res: true, msg: '' } 
routineChecker("ssdddv", 'email'); >>> { res: false, msg: '邮箱格式不正确' }
routineChecker("17791430698", 'phone'); >>> { res: true, msg: '' } 
routineChecker("27791430698", 'phone'); >>> { res: false, msg: '手机号码格式不正确' }
routineChecker("linsanxin885577", 'weixin'); >>> { res: true, msg: '' }
routineChecker("我的vx", 'weixin'); >>> { res: false, msg: '微信号格式不正确' }
routineChecker("932647051", 'qq'); >>> { res: true, msg: '' }
routineChecker("191580163333", 'qq'); >>> { res: false, msg: 'QQ号码格式不正确' }
routineChecker("http://haha.sunshine.com/xxx/xxx", 'url'); >>> { res: true, msg: '' }
routineChecker("httpw://haha.sunshine.com/xxx/xxx", 'url'); >>> { res: false, msg: 'URL地址格式不正确' }
routineChecker("linsanxin885577") >>> { res: false, msg: '未指定要校验内容的格式' }
routineChecker("linsanxin885577", 'sds') >>> { res: false, msg: '目前无法校验该类型格式' }
```
#### 返回格式 
```javascript
{ res: true, msg: '' }
{ res: false, msg: 错误提示 }
```
#### msg错误提示如下：
> 未指定要校验内容的格式；
邮箱格式不正确；
手机号码格式不正确；
微信号格式不正确；
QQ号码格式不正确；
URL地址格式不正确；
目前无法校验该类型格式；
#### 正则说明
##### email校验： /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
> (字母大小写+数字)@(字母大小写+数字).(2到4位大小写字母)
##### phone校验：/^ [1][3,4,5,6,7,8,9][0-9]{9}$/
> 1(3,4,5,6,7,8,9)9位数字
##### weixin校验：/^ [ a-zA-Z ] ([-_a-zA-Z0-9]{5,19})+$/
> (大小写字母)(5-19位包括-_大小写字母数字)
> 1.长度要求：微信号的长度必须为6-20个字符。
2.字符允许：微信号只能包含字母、数字、下划线。
3.数字要求：微信号必须包含数字，但不能是纯数字。
4.字母要求：微信号必须包含字母，但不能全部是字母。
5.下划线要求：微信号不能以下划线开头和结尾。
##### qq校验：/^ [1-9][0-9]{4,10}$/
> (1-9)(4-10位0-9)
> 规则：5-11位数字，0不能开头
##### url校验： /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
> - ((https?|ftp|file):\/\/)?：匹配协议部分，可以是 http, https, ftp, 或 file，后面跟着 : //。这部分是可选的。
> - (https?)：匹配 http 或 https。
> - :\/\/：匹配 : //。
> - ?：表示前面的协议部分是可选的。
> - ([\da-z\.-]+)：匹配域名部分，包括数字、字母、点号和连字符。
> - [\da-z\.-]：匹配数字、小写字母、点号和连字符。
> - +：表示前面的字符集可以出现一次或多次。
> - \.：匹配点号。
> - ([a-z\.]{2,6})：匹配顶级域名，通常是两到六个字母或点号。
> - ([\/\w \.-]*)：匹配路径部分，包括斜杠、字母、数字、下划线、空格、点号和连字符。 *：表示前面的字符集可以出现零次或多次。
> - \/?：匹配可选的结尾斜杠。
> - $：匹配字符串的结束。

<br>

### 2、carNoQChecker(val)车牌号校验
根据车牌号长度兼容新能源车牌和普通车牌
```javascript
// 新能源
let xny = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([A-HJ-K][A-HJ-NP-Z0-9][0-9]{4}$))/;
// 燃油车
let ryc = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
```
普通车牌：汉字 + A-Z + 4位A-HJ-NP-Z0-9 + 1位A-HJ-NP-Z0-9挂学警港澳 (车牌号不存在字母I和O防止和1、0混淆)
#### 调用
```javascript
var CarNo = carNoQChecker("粤A12345");  >>> { res: true, msg: '' }
var CarNo2 = carNoQChecker("广东A12345");  >>> { res: false, msg: '车牌号格式不正确' }
```
#### 返回格式
```javascript
{ res: false, msg: '车牌号格式不正确' }
{ res: true, msg: '' }
```
#### msg错误提示如下：
> 1、车牌号格式不正确
2、车牌号长度不正确

<br>

### 3、idCardChecker(val)身份证号校验
15\18位
15位为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位）
18位为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位）
#### 调用
```javascript
var isCard = idCardChecker("415106199801012130"); >>> { res: false, msg: '身份证号格式不正确请检查' }
var isCard2 = idCardChecker("612442180306240924"); >>> { res: false, msg: '身份证号生日格式错误请检查' }
```
#### 返回格式 
```javascript
{ res: false, msg: '身份证号生日格式错误请检查' }
{ res: true, msg: '' }
```
#### msg错误提示如下：
> 1、未发现需要校验的内容
2、身份证号长度为15、18位请检查
3、身份证位15、18位数字请检查
4、身份证号省份错误
5、身份证号生日格式错误请检查 如：415106200802292130 （08年2月没有30号）
6、身份证号格式不正确请检查 （多是因为后4位检验码错误）

> 前两位为省份代码
（ 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林",
  23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
  37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
  50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃",
  63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "）

<br>


### 4、bankCardChecker(val)银行卡号校验
#### 调用
```javascript 
var bandCard = bankCardChecker('6324125789654123698'); >>> { res: false, msg: '银行卡号格式错误请检查' }
```
#### 返回格式 
```javascript
{ res: false, msg: '银行卡号格式错误请检查' }
{ res: true, msg: '' }
```
#### 正则说明：
```javascript
/^(?:[1-9]\d{15}|[1-9]\d{17}|[1-9]\d{18})$/
先校验位数 和 是否是数字格式 
满足后通过具体 Luhn算法 再校验；
```

<br>

### 5、cnChecker(val, num)判断中文字符、及位数
```javascript
/[\u4E00-\u9FA5]/
```
#### 调用
```javascript
var cn = cnChecker("我是是林三心", 6); >>> { res: true, msg: '' }
var cn3 = cnChecker("我是林三", 6); >>> { res: false, msg: '校验内容长度不正确请检查' }
var cn2 = cnChecker("我林三心"); >>> { res: true, msg: '' }
参数一： 校验内容
参数二： 位数(number)  非必传，默认为4
```
#### 返回格式 
```javascript
{ res: false, msg: '校验内容长度不正确请检查' }
{ res: true, msg: '' }
```
#### msg错误提示如下：
> 1、未发现需检测内容请检查
2、校验内容长度不正确请检查
3、校验内容格式不正确请检查

<br>

### 6、numChecker(val, num)判断数字、及位数
```javascript
/^\d+$/
```
#### 调用
```javascript
var num = numChecker(1578); >>> { res: true, msg: '' }
var num2 = numChecker(12369, 5); >>> { res: true, msg: '' }
参数一： 校验内容
参数二： 位数(number)  非必传，默认为4
```
#### 返回格式 
```javascript
{ res: false, msg: '校验内容长度不正确请检查' }
{ res: true, msg: '' }
```
#### msg错误提示如下：
> 1、未发现需检测内容请检查
2、校验内容长度不正确请检查
3、校验内容格式不正确请检查

<br>

### 7、passportChecker(val, type)护照格式校验
#### 调用
```javascript
var passport1 = passportChecker("1234567cx89", "us");
var passport1 = passportChecker("G12345678", "china");
var passport1 = passportChecker("A123456789A","international");
参数一： 校验内容
参数二： 类型(number)  非必传，默认为china，  可选 us, international
```
#### 返回格式 
```javascript
{ res: false, msg: '护照号格式不正确请检查' }
{ res: true, msg: '' }
```
#### 正则说明：
```javascript
1、如果是国际护照： 通常为9位数字，最后一位可能是字母
   const internationalPassportRegex = /^[A-Z0-9<]{9}[0-9]{1}[A-Z<]$/;
2、如果是美国护照，通常为9位数字  const usPassportRegex = /^\d{9}$/;
3、默认国内护照，可能包含字母和数字，长度可能为9位 const chinaPassportRegex = /^[a-zA-Z]\d{7,8}$/
```
<br><br>


## 说明：常用方法

### 1、telFormat(val)手机号码前三后四显示
```javascript
telFormat('18591784526')
telFormat('1859178456')
会先检验手机号格式
```
#### 返回 
> 格式化内容不符合手机号规则请检查
转换后手机号，如：'185****4526'

<br>


### 2、firstLetterUpper(val)字符串首字母大写
```javascript
firstLetterUpper('a1859156') >>> A1859156
firstLetterUpper('的47859') >>> 的47859

首字母非拼音的不会报错，直接返回原内容；
```
<br>


### 3、日期格式化
```javascript
var date:any = new Date();
dateFormat("AAAA-dd", date); >>> AAAA-29
dateFormat("YYYY-mm-dd HH:MM:SS", date); >>> 2024-08-29 14:00:01
var date2:any = 'Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)';
dateFormat("YYYY+mm*dd HH@MM#SS", date2); >>> 2024+08*07 14@48#32
var date3:any = new Date().getTime();
dateFormat("HH:MM:SS", date3); >>> 14:00:01
```
#### 参数 
> 1、YYYY-mm-dd HH:MM:SS  日期格式， 拼接符-和: 可以根据自己需求修改
如： dateFormat("YYYY+mm*dd HH@MM#SS", new Date())  >>>  2024+08*07 14@48#32
2、字母 Y、m、d、H、M、S、 分别表示：年月日时分秒，不可以修改区别大小写， 可默认几个如： mm-dd、MM:SS，YYYY MM 等
3、date为需要格式化的日期，可以是时间戳格式、或 中国标准时间，如：Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)

<br>


### 4、日期距离现在时间
```javascript
beforeDateFormat('2024-08-06 15:33:14')
beforeDateFormat(new Date('2024-08-06 15:14:14').getTime())
beforeDateFormat('Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)') 
```
#### 返回 
> 刚刚、**分钟、**小时（24小时内）、**天、**周、**月、**年、
按最大单位返回

<br>

### 5、两个时间差
```javascript
calculateDiffTime('2024-08-07 16:33:14', '2023-08-10 16:33:25') >>> 12月2日23时59分49秒
calculateDiffTime('2024-08-07 16:33:14', '2024-08-07 16:33:14') >>> 时间无差别
calculateDiffTime(new Date('2024-08-06 15:14:14').getTime(), '2024-08-10 16:33:25') >>> 4日19分11秒
calculateDiffTime('Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)', '2024-08-10 16:33:25') >>> 3日44分53秒
```
#### 传值
>  开始时间、结束时间、type
type:
 1： 几年
 2： 几年几月
 3： 几年几月几日
 不传默认： 年月日时分秒，根据实际情况返回
#### 返回
> 时间无差别、具体时间差
 
<br>

### 6、判断星期几
```javascript
console.log(getWeek('2024-08-20'))
console.log(getWeek(new Date()))
console.log(getWeek(1645414395327))
```
#### 返回
> 星期一、星期二、星期三、星期四、星期五、星期六、星期日
 
<br>

### 7、数字 逢三一断 格式化
```javascript
console.log(numFilterThreeCut(145899)) >>> 145,899
console.log(numFilterThreeCut(2569.369)) >>> 2,569.369
console.log(numFilterThreeCut(12589654.38)) >>> 12,589,654.38
console.log(numFilterThreeCut(257129)) >>> 257,129
```

<br>

### 8、数字转为大写金额
```javascript
console.log(digitUppercase(145899)) >>> 壹拾肆万伍仟捌佰玖拾玖元整
console.log(digitUppercase(2569.36)) >>> 仟伍佰陆拾玖元叁角陆分
console.log(digitUppercase(12589654.36)) >>> 壹仟贰佰伍拾捌万玖仟陆佰伍拾肆元叁角陆分
console.log(digitUppercase(257129)) >>> 贰拾伍万柒仟壹佰贰拾玖元整
```

<br>


### 9、将阿拉伯数字翻译成中文的大写数字(五仟二百二十二)
```javascript
console.log(changeToChinese(145899)) >>> 一十四万五千八百九十九
console.log(changeToChinese(2569.36)) >>> 二千五百六十九点三六
console.log(changeToChinese(12589654.36)) >>> 一千二百五十八万九千六百五十四点三六
console.log(changeToChinese(257129)) >>> 二十五万七千一百二十九
```

<br>

### 10、urlToObject(url?后内容)url链接参数获取
#### 使用
> urlToObject(window.location.href.split('?')[1]);
如： url: http://app.test.epaynfc.com/fueling/doorList?appid=e5usbtdybudn83i&t=1714097391498&encrypt=notEncrypt
调用导出：{ appid: 'e5usbtdybudn83i', t: '1714097391498', encrypt: 'notEncrypt' }

<br>

### 11、uniqueArrayAndObject(数组,对象参数) 数组去重
##### 兼容：数组、对象数组
> 不会改变原始数据，return新的数组；
#### 对象参数说明
> { key: 'age' }
> - key：去重依据的key值， 可忽略不传，按普通数组处理
> - 如果是对象数组，没传key值，则返回原数值，无法实现去重
#### 使用示例
```javascript
// 数字数组去重
let numbers = [1, 2, 2, 3, 4, 4, 5];
let uniqueNumbers = uniqueArrayAndObject(numbers);
console.log(uniqueNumbers); >>> [1, 2, 3, 4, 5]
console.log(numbers); >>> [1, 2, 2, 3, 4, 4, 5]

// 对象数组基于 name 属性去重
let people = [
  { name: 'Alice', age: 40 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Carol', age: 50 }
];
let uniquePeople = uniqueArrayAndObject(people, { key: 'name' });
console.log(uniquePeople); >>> [{ name: 'Alice', age: 40 }, { name: 'Bob', age: 30 }, { name: 'Carol', age: 50 }]
console.log(people); // 原数组不变
```

<br>

### 12、sortArray(数组，对象参数) 数组排序
##### 兼容：数组、对象数组、升序、降序
> 不会改变原始数据，return新的数组；
#### 对象参数说明
> { order: 'asc' }、{ key: 'age', order: 'asc' }
> - order: asc 升序、desc降序
> - key：排序依据的key值， 可忽略不传，按普通数组处理
> - 如果是对象数组，没传key值，则返回原数值，无法实现排序
#### 使用示例
```javascript
let numbers = [10, 5, 3, 8, 2];
var numbers1 = sortArray(numbers, { order: 'asc' });
console.log(numbers, '====numbers');  >>>> [10, 5, 3, 8, 2]
console.log(numbers1, '====numbers1'); >>>> [2, 3, 5, 8, 10]
// 数字数组降序排序
numbers = sortArray(numbers, { order: 'desc' });
console.log(numbers); >>>> [10, 8, 5, 3, 2]

// 对象数组基于年龄属性升序排序
let people = [
  { name: 'Alice', age: 40 },
  { name: 'Bob', age: 30 },
  { name: 'Carol', age: 50 }
];
var people1 = sortArray(people, { key: 'age', order: 'asc' });
console.log(people1); >>> [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 40 }, { name: 'Carol', age: 50 }]
// 对象数组基于年龄属性降序排序
var people2 = sortArray(people, { key: 'age', order: 'desc' });
console.log(people2);
```

<br>

### 13、getLastTime(日期，num, type) 获取前、后 几天 日期
#### 对象参数说明
> num: number格式， 正数：几天后；负数：几天前
> type， 传“all”，非必传，可不传； 
> type 默认返回格式"yyyy-mm-dd"， 传"all"则返回完整时间“yyyy-mm-dd HH:MM:SS”
> 日期，可直接穿字符串，如：'2023-3-4 6:2:5'
#### 使用示例
```javascript
var de = new Date();
var de2 = getLastTime(de,0, 'all'); >>> 2024-08-29 16:58:20
var de3 = getLastTime(de, 0); >>> 2024-08-29
var de4 = getLastTime(de, 2, 'all'); >>> 2024-08-31 16:58:20
var de5 = getLastTime(de, 2); >>> 2024-08-31
var de6 = getLastTime(de, -3); >>> 2024-08-26
var de7 = getLastTime(de, -3, 'all'); >>> 2024-008-26 16:58:20 
```

<br>

### 14、getDateOfWeek(日期，num) 获取当前日期所在周，周一到周天的日期；
#### 对象参数说明
> 日期: '2024-08-16'、new Date()
> num: number格式，1-7，表示周一到周日
#### 使用示例
```javascript
var newD = '2024-08-16'
getDateOfWeek(newD, 1); >>> 2024-08-12
getDateOfWeek(newD, 2); >>> 2024-08-13
getDateOfWeek(newD, 3); >>> 2024-08-14
getDateOfWeek(newD, 4); >>> 2024-08-15
getDateOfWeek(newD, 5); >>> 2024-08-16
getDateOfWeek(newD, 6); >>> 2024-08-17
getDateOfWeek(newD, 7); >>> 2024-08-18
```


