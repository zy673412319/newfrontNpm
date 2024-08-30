// __tests__/myUtil.test.
import {
  routineChecker,
  carNoQChecker,
  idCardChecker,
  bankCardChecker,
  cnChecker,
  numChecker,
  passportChecker
} from '../src/utils/regularCheck';
import {
  telFormat,
  firstLetterUpper,
  dateFormat,
  beforeDateFormat,
  calculateDiffTime,
  getWeek,
  numFilterThreeCut,
  digitUppercase,
  changeToChinese,
  urlToObject,
  uniqueArray,
  uniqueArrayByProperty,
  uniqueArrayAndObject,
  sortArray,
  getLastTime,
  getDateOfWeek
} from '../src/utils/commonMethod';


test('adds 1 + 2 to equal 3', () => {

  var email1 = routineChecker("932647051@qq.com", 'email');
  var email2 = routineChecker("ssdddv", 'email');
  var email3 = routineChecker("932647051@epaynfc.com", 'email');
  var email4 = routineChecker("932647051@epaynfc.com de", 'email');
  // console.log(email1, '====email1')
  // console.log(email2, '====email2')
  // console.log(email3, '====email3')
  // console.log(email4, '====email4')
  // type: email、 phone 、weixin、qq、url

  // //手机号测试
  var phone = routineChecker("17791430698", 'phone');
  var phone2 = routineChecker("27791430698", 'phone');
  // console.log(phone,'====phone')
  // console.log(phone2,'====phone2')

  // //微信号测试
  var weiXin = routineChecker("linsanxin885577", 'weixin');
  var weiXin2 = routineChecker("我的vx", 'weixin');
  var weiXin3 = routineChecker("lisnx的n885577", 'weixin');
  // console.log(weiXin,'====weiXin')
  // console.log(weiXin2,'====weiXin2')
  // console.log(weiXin3,'====weiXin2')

  // //QQ号测试
  var QQ = routineChecker("932647051", 'qq');
  var QQ2 = routineChecker("191580163333", 'qq');
  // console.log(QQ,'====QQ')
  // console.log(QQ2,'====QQ2')

  // // 是否是url地址
  var url = routineChecker("https://haha.sunshine.com/xxx/xxx", 'url');
  var url2 = routineChecker("http://haha.sunshine.com/xxx/xxx", 'url');
  var url3 = routineChecker("httpw://haha.sunshine.com/xxx/xxx", 'url');
  var url4 = routineChecker("sss://haha.sunshine.com/xxx/xxx", 'url');
  // console.log(url,'====url')
  // console.log(url2,'====url2')
  // console.log(url3,'====url3')
  // console.log(url4,'====url4')
  

  // console.log(routineChecker("linsanxin885577"),'=====routineChecker')
  // console.log(routineChecker("lisnx的n885577",'routineChecker'),'======routineChecker是多少')

  //QQ号测试
  // var QQ = qqChecker("932647051");
  // var QQ2 = qqChecker("191580163333");
  // console.log(QQ, '====QQ')
  // console.log(QQ2, '====QQ2')

  // console.log(firstLetterUpper('18591784526'))
  // console.log(firstLetterUpper('a1859178456'))
  // console.log(firstLetterUpper('色sd1859178456'))

  var date:any = new Date();
  // console.log(dateFormat("YYYY MM", date))
  // console.log(dateFormat("YYYY-mm-dd HH:MM:SS", date))
  // var date2:any = 'Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)';
  // console.log(dateFormat("YYYY+mm*dd HH@MM#SS", date2))
  // var date3:any = new Date().getTime();
  // console.log(dateFormat("HH:MM:SS", date3),'====',date3)

  var cha1 = beforeDateFormat('2023-09-04 16:20:14')
  var cha2 = beforeDateFormat(new Date('2022-07-06 15:14:14').getTime())
  var cha3 = beforeDateFormat('Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)')
  // console.log(cha1,'====cha1')
  // console.log(cha2,'====cha2')
  // console.log(cha3,'====cha3')

  // console.log(urlToObject('appid=e5usbtdybudn83i'), '====urlToObject');
  var num = [1,2,3,4,5,6,7,8,9,10,12,45,12,13,48,89,62,1,2,3,9,8,15,25,69,78,69,12,0];
  var num1 = uniqueArray(num);
  // console.log(num,'====num')
  // console.log(num1,'====num1')
  var de = '2023-3-4 6:2:5';
  // console.log(de,'==de')
  var de2 = getLastTime(de,0, 'all');
  var de3 = getLastTime(de, 0);
  var de4 = getLastTime(de, 2, 'all');
  var de5 = getLastTime(de, 2);
  var de6 = getLastTime(de, -3);
  var de7 = getLastTime(de, -3, 'all');
  // console.log(de2,'====de2')
  // console.log(de3,'====de3')
  // console.log(de4,'====de4')
  // console.log(de5,'====de5')
  // console.log(de6,'====de6')
  // console.log(de7,'====de7')
  
  // var newD = '2024-08-16'
  var newD = new Date();
  var newD1 = getDateOfWeek(newD, 1);
  var newD2 = getDateOfWeek(newD, 2);
  var newD3 = getDateOfWeek(newD, 3);
  var newD4 = getDateOfWeek(newD, 4);
  var newD5 = getDateOfWeek(newD, 5);
  var newD6 = getDateOfWeek(newD, 6);
  var newD7 = getDateOfWeek(newD, 7);
  // console.log(newD1,'==== 周一')
  // console.log(newD2,'==== 周二')
  // console.log(newD3,'==== 周三')
  // console.log(newD4,'==== 周四')
  // console.log(newD5,'==== 周五')
  // console.log(newD6,'==== 周六')
  // console.log(newD7,'==== 周天')

  // const items = [
  //   { id: 1, name: 'Item 1' },
  //   { id: 2, name: 'Item 2' },
  //   { id: 1, name: 'Item 1 (duplicate)' },
  //   { id: 3, name: 'Item 2' },
  //   { id: 4, name: 'Item 2' },
  //   { id: 5, name: 'Item 2' },
  //   { id: 6, name: 'Item 2' },
  //   { id: 5, name: 'Item 2' },
  //   { id: 8, name: 'Item 2' },
  //   { id: 2, name: 'Item 2' },
  // ];
  // const uniqueItems = uniqueArrayByProperty(items, 'id');
  // // console.log(items,'====items')
  // // console.log(uniqueItems,'====uniqueItems')

  // // 数字数组去重
  // let numbers = [1, 2, 2, 3, 4, 4, 5];
  // let uniqueNumbers = uniqueArrayAndObject(numbers);
  // console.log(uniqueNumbers); // 输出: [1, 2, 3, 4, 5]
  // console.log(numbers); // 原数组不变

  // // 对象数组基于 name 属性去重
  // interface Person {
  //   name: string;
  //   age: number;
  // }

  // let people: Person[] = [
  //   { name: 'Alice', age: 40 },
  //   { name: 'Bob', age: 30 },
  //   { name: 'Alice', age: 25 },
  //   { name: 'Carol', age: 50 }
  // ];

  // let uniquePeople = uniqueArrayAndObject(people, { key: 'name' });
  // console.log(uniquePeople); // 输出: [{ name: 'Alice', age: 40 }, { name: 'Bob', age: 30 }, { name: 'Carol', age: 50 }]
  // console.log(people); // 原数组不变
  // let uniquePeople2 = uniqueArrayAndObject(people);
  // console.log(uniquePeople2,'=====uniquePeople2'); // 原数组不变

  
  // 示例使用：
  // 数字数组升序排序
  let numbers = [10, 5, 3, 8, 2, 4];
  var numbers1 = sortArray(numbers, { order: 'asc' });
  console.log(numbers, '====numbers'); // 输出: [2, 3, 5, 8, 10]
  console.log(numbers1, '====numbers1'); // 输出: [2, 3, 5, 8, 10]
  // 数字数组降序排序
  numbers = sortArray(numbers, { order: 'desc' });
  console.log(numbers); // 输出: [10, 8, 5, 3, 2]

  // 对象数组基于年龄属性升序排序
  interface Person {
    name: string;
    age: number;
  }

  let people: Person[] = [
    { name: 'Alice', age: 40 },
    { name: 'Bob', age: 30 },
    { name: 'Carol', age: 50 }
  ];

  var people1 = sortArray(people, { key: 'age', order: 'asc' });
  console.log(people1); // 输出: [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 40 }, { name: 'Carol', age: 50 }]

  // 对象数组基于年龄属性降序排序
  var people2 = sortArray(people, { key: 'age', order: 'desc' });
  console.log(people2); // 输出: [{ name: 'Carol', age: 50 }, { name: 'Alice', age: 40 }, { name: 'Bob', age: 30 }]
  var people3 = sortArray(people, { order: 'desc' });
  console.log(people3); 
  

  // console.log(calculateDiffTime('2024-08-07 16:33:14', '2023-08-10 16:33:25'), '====说到底')
  // console.log(calculateDiffTime('2024-08-07 16:33:14', '2024-08-07 16:33:14'), '====说到底')
  // console.log(calculateDiffTime(new Date('2024-08-06 15:14:14').getTime(), '2024-08-10 16:33:25'), '====是发的')
  // console.log(calculateDiffTime('Wed Aug 07 2024 14:48:32 GMT+0800 (中国标准时间)', '2024-08-10 16:33:25'), '====刚好有机会')

  // console.log(getWeek('2024-08-20'))
  // console.log(getWeek(new Date()))
  // console.log(getWeek(1645414395327))

  // console.log(numFilterThreeCut(145899),'======numFilterThreeCut11111')
  // console.log(numFilterThreeCut(2569.369),'======numFilterThreeCut11111')
  // console.log(numFilterThreeCut(12589654.368),'======numFilterThreeCut11111')
  // console.log(numFilterThreeCut(257129),'======numFilterThreeCut11111')

  // console.log(digitUppercase(145899))
  // console.log(digitUppercase(2569.36))
  // console.log(digitUppercase(12589654.36))
  // console.log(digitUppercase(257129))

  // console.log(changeToChinese(145899))
  // console.log(changeToChinese(2569.36))
  // console.log(changeToChinese(12589654.36))
  // console.log(changeToChinese(257129))
});
