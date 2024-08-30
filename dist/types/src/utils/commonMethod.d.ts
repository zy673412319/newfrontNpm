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
export declare function telFormat(tel: string): string;
export declare function firstLetterUpper(str: string): string;
export declare function dateFormat(fmt: string, timeStamp: any): string;
export declare function beforeDateFormat(current: string | Date | number | undefined): string | undefined;
export declare function calculateDiffTime(startTime: string | number | Date, endTime: string | number | Date, type?: number): string;
export declare function getWeek(current?: string | number | Date): string;
export declare function numFilterThreeCut(value: string | number | null): string;
export declare function digitUppercase(n: number): string;
export declare function changeToChinese(num: number): string;
export declare function urlToObject(url?: string): {
    [key: string]: string;
};
interface UniqueOptions<T> {
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
 * 兼容： 数组、数组对象
 * 升序、降序
 * */
interface SortOptions<T> {
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
export {};
