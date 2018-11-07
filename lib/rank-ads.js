const calcRank = (item, conditions) => {
  let rank = 0
  const { amount, shouldEquals } = conditions

  // Amount in target currency, i.e. we sell 2BTC -> calc it in Roubles or in Wechat
  const amountInTarget = +(Number(item.temp_price) * amount).toFixed(2)

  if(amountInTarget > Number(item.max_amount)) return 0
  rank++

  if(amountInTarget > Number(item.max_amount_available)) return 0
  rank++

  // Check every `equal` condition to be exact equals to
  if(shouldEquals) {
    if(!Object.entries(shouldEquals).every( ([key, value]) => item[key] === value )) return 0
  }
  rank++

  return rank
}


/**
 * 1. sort all Ads by `profile.feedback_score`
 * 2. attach a `rank` for each ad in list and sort by rank after
 *
 * @param ads
 * @returns {*}
 */
const rankAds = (ads, conditions) => {
  let ranked = ads
    .sort((x, z) => x.data.profile.feedback_score - z.data.profile.feedback_score)
    .reverse()
    .map(item => {
      return {
        ...item,
        rank: calcRank(item.data, conditions)
      }
    })
    .sort((x, z) => x.rank - z.rank)
    .reverse()

  return ranked
}

module.exports = rankAds