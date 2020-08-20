function matchesPlayedPerYear(matches) {
  const result = {};
  for (let match of matches) {
    const season = match.season;
    if (result[season]) {
      result[season] += 1;
    } else {
      result[season] = 1;
    }
  }
  
  return result;
}

function matchesWonByEachTeam(matches) {
  const result = {};
  for (let match of matches) {
    const winner = match.winner;
    
      if (result[winner]) {
        result[winner] += 1;
      } else {
        result[winner] = 1;
      }
    
  }
  
  return result;
}


function extraRunsConcededByEachteam(matches,deliveries){
  const result = {}
  for (let match of matches) {
    if (match.season == '2016') {
      
      id = match.id

      for (let delivery of deliveries){
        if (delivery.match_id == id) {
          result[delivery.batting_team] = 0
        }
      }

      for (let delivery of deliveries){
        if (delivery.match_id == id) {
          result[delivery.batting_team] += parseInt(delivery.extra_runs)
        }
      }
    }
  }

  return result;

}

function TopTenEconomicalBowlers(matches,deliveries) {

  const result = {}
  const finalresult = {}
  const totalResult = {}

  for (let match of matches) {
    if (match.season == '2015') {
      id = match.id 
      for (let delivery of deliveries) {
        if (delivery.match_id == id) {
          if (result[delivery.bowler]) {
            result[delivery.bowler] += 1
            result['total_score_' + delivery.bowler] += parseInt(delivery.total_runs)
            
          }
          else {
            result[delivery.bowler] = 1
            result['total_score_' + delivery.bowler] = parseInt(delivery.total_runs)
          }
        }
      }

    }
  }

  const keys = Object.keys(result).filter(function(prop){
    return !prop.startsWith('total')
  })


  for (let key of keys) {
    const round = Math.floor((result[key])/6)
    const mod = (result[key])%6
    const overs = parseFloat((round.toString() + "." + mod.toString()))
    
    result[key] = overs
  }

  for (let key of keys) {
    const economyRate = (result['total_score_' + key] / result[key])
    finalresult[key] = economyRate
  }

  const sortedEconomyRate = Object.values(finalresult)
                                .sort(function(a, b){return a - b})
                                .slice(0,10) 

  for (let EconomyRate of sortedEconomyRate) {
    for (let key of keys) {
      if (finalresult[key] == EconomyRate) {
        totalResult[key] = EconomyRate
      }
    }
  }

  return totalResult

}

  




module.exports = {
  matchesPlayedPerYear,
  matchesWonByEachTeam,
  extraRunsConcededByEachteam,
  TopTenEconomicalBowlers
}
