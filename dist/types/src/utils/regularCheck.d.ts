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
 * type: email、phone、weixin、qq、url
 * value: 需要检验的内容
 * */
export declare function routineChecker(value: string, type?: string): {
    res: boolean;
    msg: string;
};
export interface CarNoValidationResult {
    res: boolean;
    msg: string;
}
export declare function carNoQChecker(value: string): CarNoValidationResult;
export declare const idCardChecker: (card: string) => {
    res: boolean;
    msg: string;
};
export declare const bankCardChecker: (cardNumber: string) => {
    res: boolean;
    msg: string;
};
export declare const cnChecker: (s: string, num?: number) => {
    res: boolean;
    msg: string;
};
/**
*  判断是否是数字
* @param {Number} data
*/
export declare const numChecker: (value: number, num?: number) => {
    res: boolean;
    msg: string;
};
export declare const passportChecker: (passportNumber: string, country?: string) => {
    res: boolean;
    msg: string;
};
