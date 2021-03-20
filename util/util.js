
function sleep(seconds = 1000) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      resolve()
      clearTimeout(timer)
    }, seconds)
  })
}
module.exports = {
  sleep
}