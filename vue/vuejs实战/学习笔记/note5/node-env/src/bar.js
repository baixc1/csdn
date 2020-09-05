export default function bar () {
  console.log(process.env.NODE_ENV) // build
  console.log(BROWSER_SUPPORTS_HTML5) // true
  console.log(typeof window) // 哈哈
  console.log(TWO)  // 2
}