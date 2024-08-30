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
/**
* 手机号前三后四显示
* @param tel: 手机号
*/
export declare function telFormat(tel: string): string;
/**
* 字符串首字母大写
* @param str
*/
export declare function firstLetterUpper(str: string): string;
/**
* 格式化日期
* @param fmt：格式YYYY-mm-dd HH:MM:SS等
* @param date 日期
*/
export declare function dateFormat(fmt: string, date: any): string;
/**
* 判断时间过去了多久
* @param date 日期
* @returns 刚刚、几天前、几个月前、几年前
*/
export declare function beforeDateFormat(date: string | Date | number | undefined): string | undefined;
/**
* 时间差
* @param startTime 开始时间
* @param endTime 结束时间
* @param type 类型， 非必填
* @returns **年**月**日 时分秒
*/
export declare function calculateDiffTime(startTime: string | number | Date, endTime: string | number | Date, type?: number): string;
/**
* 星期几
* @param current 日期
* @returns 星期一 到 星期日
*/
export declare function getWeek(current?: string | number | Date): string;
/**
* 数字 逢三一断
* @param value 数字
*/
export declare function numFilterThreeCut(value: string | number | null): string;
/**
* 数字转为大写金额
* @param value 数字
*/
export declare function digitUppercase(n: number): string;
/**
* 将阿拉伯数字翻译成中文的大写数字
* @param value 数字
*/
export declare function changeToChinese(num: number): string;
/**
* 获取链接参数
* @param str
*/
export declare function urlToObject(url?: string): {
    [key: string]: string;
};
/**
* 数组去重
* @param 数组
*/
export interface UniqueOptions<T> {
    key?: keyof T;
}
export declare function uniqueArrayAndObject<T>(arr: T[], options?: UniqueOptions<T>): T[];
export declare function uniqueArray<T>(arr: T[]): T[];
/**
 * T是数组中对象的类型，
 * K是对象属性的类型，它必须是T的键。
 * property 参数是我们要基于去重的属性名
 */
export declare function uniqueArrayByProperty<T, K extends keyof T>(arr: T[], property: K): T[];
/**
* 数组排序
* @param 数组
* 兼容： 数组、数组对象、升序、降序
*/
export interface SortOptions<T> {
    key?: keyof T;
    order: 'asc' | 'desc';
}
export declare function sortArray<T>(arr: T[], options: SortOptions<T>): T[];
/**
 * 获取前、后 几天 日期
 * @param date
 * @param day
 * @param type
 * @returns {string}
 */
export declare function getLastTime(date: string | Date, day: number, type?: string): string;
export declare function getDateOfWeek(date: string | Date, week: number): string;
