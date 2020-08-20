const fs = require("fs");
const csv = require("csvtojson");
const matchesLib = require("./ipl/matchesPlayedPerYear");
const { match } = require("assert");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {

      let result1 = matchesLib.matchesPlayedPerYear(matches);
      let result2 = matchesLib.matchesWonByEachTeam(matches)
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
      
        let result3 = matchesLib.extraRunsConcededByEachteam(matches,deliveries)
        let result4 = matchesLib.TopTenEconomicalBowlers(matches,deliveries)
        
        saveMatchesPlayedPerYear(result1,result2,result3,result4);
      });
      
    });

    
}

function saveMatchesPlayedPerYear(result1,result2,result3,result4) {
  const jsonData = {
    matchesPlayedPerYear: result1,
    matchesWonByEachTeam: result2,
    extraRunsConcededByEachteam: result3,
    topTenEconomicalBowlers: result4
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
