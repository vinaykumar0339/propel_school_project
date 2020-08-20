function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data);
  return;
}

function visualizeMatchesPlayedPerYear(data) {
  const seriesData1 = [];
  const seriesData2 = [];
  const seriesData3 = [];
  const seriesData4 = [];
  for (let year in data.matchesPlayedPerYear) {
    seriesData1.push([year, data.matchesPlayedPerYear[year]]);
  }

  for (let winner in data.matchesWonByEachTeam) {
    seriesData2.push({name:winner, y:data.matchesWonByEachTeam[winner]})
  }

  for (let runs in data.extraRunsConcededByEachteam) {
    seriesData3.push([runs, data.extraRunsConcededByEachteam[runs]]);
  }

  for (let economyRate in data.topTenEconomicalBowlers) {
    seriesData4.push([economyRate, data.topTenEconomicalBowlers[economyRate]]);
  }


  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData1
      }
    ]
  });


  Highcharts.chart('matches-won-by-each-team', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Matches Won By Each Team, 2016'
    },
    subtitle: {
          text:
            'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
         },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'No. of Matched Won By Each Team',
        colorByPoint: true,
        data: seriesData2
    }]
});
       

  Highcharts.chart("extra-runs-conceded-by-each-team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Runs Conceded By Each Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Team Played in 2016",
        data: seriesData3
      }
    ]
  });

  Highcharts.chart("top-ten-economical-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top Ten Economical Bowlers"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Bowler Economical Rate"
      }
    },
    series: [
      {
        name: "Top Ten Economical Bowlers in 2015",
        data: seriesData4
      }
    ]
  });
}
