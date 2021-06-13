function useString(str) {
  var ans = "";
  var l = str.length;
  for (let i = 0; i < l; i++) {
    if (str.charAt(i) === " ") {
      ans += "+";
    } else {
      ans += str.charAt(i);
    }
  }
  return ans;
}

export default useString;
