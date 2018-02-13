module.exports = (outd, ind) => {
  let outday = Math.floor(outd/(24*60*60*1000))  
  let inday = Math.floor(ind/(24*60*60*1000))

  return inday-outday
}