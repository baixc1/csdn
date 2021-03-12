// 第 4 题：字符串出现的不重复最长长度
function lengthOfLongestSubstring(s) {
  let max = 0; // 最长长度
  let dict = {}; // 纪录当前字符串的下标位置
  let i = 0; // 遍历 字符串s 的指针
  let cur = 0; // 当前无重复字符串的指针
  while (i < s.length) {
    if (!dict[s[i]]) {
      dict[s[i]] = String(i); // 再次遍历, i 在 字符串s 的位置
      i++;
      cur++;
    } else {
      i = dict[s[i]] + 1;
      cur = 0;
      dict = {};
    }
    if (cur > max) {
      max = cur;
    }
  }
  return max;
}
console.log(lengthOfLongestSubstring("loddktdji"));
console.log(lengthOfLongestSubstring("dvdf"));
console.log(lengthOfLongestSubstring("adfafwefffdasdcx"));
