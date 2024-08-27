export function convertToUrl(inputStr : string) {
    let unescapedStr = inputStr.replace(/&quot;/g, '"');
    let cleanedStr = unescapedStr.replace(/\{&/g, '{').replace(/&\}/g, '}');
    let encodedStr = cleanedStr.replace(/ /g, '%20');
    return encodedStr;
}