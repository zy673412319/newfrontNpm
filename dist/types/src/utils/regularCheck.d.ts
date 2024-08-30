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
export declare function routineChecker(value: string, type?: string): {
    res: boolean;
    msg: string;
};
/**
* 是否车牌号
* @param value: 需要检验的内容
*/
export interface CarNoValidationResult {
    res: boolean;
    msg: string;
}
export declare function carNoQChecker(value: string): CarNoValidationResult;
/**
* 身份证号校验
* @param card: 需要检验的内容
*/
export declare const idCardChecker: (card: string) => {
    res: boolean;
    msg: string;
};
/**
* 银行卡号码校验（luhn算法）
* @param cardNumber: 需要检验的内容
*/
export declare const bankCardChecker: (cardNumber: string) => {
    res: boolean;
    msg: string;
};
/**
* 是否包含中文的字符串
* @param s: 需要检验的内容
* @param num: 需要检验的内容长度
*/
export declare const cnChecker: (s: string, num?: number) => {
    res: boolean;
    msg: string;
};
/**
*  判断是否是数字
* @param {Number} data
* @param num: 需要检验的内容长度
*/
export declare const numChecker: (value: number, num?: number) => {
    res: boolean;
    msg: string;
};
/**
* 验证护照（包含香港、澳门）
* @param passportNumber: 需要检验的内容
* @param country: china、international、us
*/
export declare const passportChecker: (passportNumber: string, country?: string) => {
    res: boolean;
    msg: string;
};
