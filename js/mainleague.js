
//fixture
var process = null
var teamAOdds = 0;
var teamBOdds = 0;
var strongerTeam = 13;

var teams = {}

//Process Form Inputs
function process_result() {
    let teamASkills = 0;
    let teamBSkills = 0;

    if (teamAOdds <= teamBOdds) {
        teamASkills = strongerTeam;
        teamBSkills = teamASkills * teamAOdds / teamBOdds;

    } else {
        teamBSkills = strongerTeam;
        teamASkills = (teamBSkills * teamBOdds / teamAOdds) - 2;
    }
    teams = {
        "Home": {
            "goals": 0,
            "skills": Math.round(teamASkills),
            "won": 0,
            "draw": 0,
        },
        "Away": {
            "goals": 0,
            "skills": Math.round(teamBSkills),
            "won": 0,
            "draw": 0,
        }

    }
}
//show if a button had already being clicked

var message = document.getElementById("error_msg");
var err = document.getElementById("alert");
var close_button = document.getElementById("btn-close")
var home_input = document.getElementById('home-odd')
var away_input = document.getElementById("away-odd")

let predict_button = document.getElementById("predButton")

close_button.onclick = function() {
    err.style.display = "none"
}

predict_button.onclick = function() {
    counter = 0;
    results = [];
    teamAOdds = home_input.value;
    teamBOdds = away_input.value;
    err.style.display = "none";
    clearInterval(process);
    matchesCompleted = false

    if (teamAOdds < 1 || teamAOdds == "") {
        message.innerHTML = " Home Team Odds Empty"
        err.style.display = "block"
    } else if (teamBOdds < 1 || teamBOdds == "") {
        message.innerHTML = " Away Team Odds Empty"
        err.style.display = "block"
    } else {
        process_result()
        rendering_odds()
        process = setInterval(game_interval, 1);
    }
}

home_input.oninput = function() {
    if (home_input.value > 10) {
        home_input.value = home_input.value / 10
    }
}

away_input.oninput = function() {
    if (away_input.value > 10) {
        away_input.value = away_input.value / 10
    }
}
//EDIT STARTED


let odds_array = []

function odds_making_algo() {
    
    odds_array = []
        
        let home_name = "Home"
        let away_name = "Away"
        let match_name = `${home_name} - ${away_name}`

        let home_chance = teams.Home.skills
        let away_chance = teams.Away.skills
        let stronger_team = Math.max(home_chance, away_chance)
        let weaker_team = Math.min(home_chance, away_chance)
            // console.log("Home: " + home_chance + " away: " + away_chance)
            // alert(weaker_team)
            // console.log(stronger_team)
        let home_odds = [1 + (away_chance / home_chance), "home", `${home_name}, ${away_name}`]
        let away_odds = [1 + (home_chance / away_chance), "away", `${home_name}, ${away_name}`]
        let draw_odds = [1.5 + (stronger_team / weaker_team), "draw", `${home_name}, ${away_name}`]
        
        odds_array.push([match_name, home_odds, draw_odds, away_odds])
    
}

// odds_making_algo()
var oddshtml = document.getElementById("odds")

function rendering_odds() {
    while (oddshtml.rows.length > 1) {
        oddshtml.deleteRow(1);
    }
    odds_making_algo()
    for (let i = 0; i < odds_array.length; i++) {
        // var odd_render = document.getElementById("oddRender")
        //below match name is the render match name
        var matchName = document.createElement("td")
        var home_button = document.createElement("td")
        var draw_button = document.createElement("td")
        var away_button = document.createElement("td")
            // var tb7= document.createElement("td")
            // var tb8 = document.createElement("td")
        var each_row = document.createElement("tr")
        matchName.innerHTML = odds_array[i][0]
        home_button.innerHTML = odds_array[i][1][0].toFixed(2)
        draw_button.innerHTML = odds_array[i][2][0].toFixed(2)
        away_button.innerHTML = odds_array[i][3][0].toFixed(2)

        home_button.style.color = "white"
        draw_button.style.color = "white"
        away_button.style.color = "white"

        matchName.style.backgroundColor = "#F0FFF0"
        home_button.style.backgroundColor = "#2F4F4F"
        draw_button.style.backgroundColor = "#2F4F4F"
        away_button.style.backgroundColor = "#2F4F4F"

        home_button.stylepadding = "5px"
        draw_button.stylepadding = "5px"
        away_button.stylepadding = "5px"

        matchName.style.textAlign = "center"
        home_button.style.textAlign = "center"
        draw_button.style.textAlign = "center"
        away_button.style.textAlign = "center"

        each_row.append(matchName)
        each_row.append(home_button)
        each_row.append(draw_button)
        each_row.append(away_button)
        oddshtml.append(each_row)
    }
}

var counter = 0
var matchesCompleted = false;

// Fetch average game results 
function game_interval() {
    counter++
    if (counter > 999) {
        matchesCompleted = true;
        clearInterval(process);
    }
    match()
}

var resultsTable = document.getElementById("results")
var div = document.getElementById("res-div")
var tough = document.getElementById("unpredictable")
k = 0

var resultArray = [];
var results = [];

function match() {

    teamA = teams.Home
    teamB = teams.Away
    myteams = [teamA, teamB]
    team1 = 0;
    team2 = 0;
    goal = [team1, team2]

    while (k < 6) {
        var opportunity = Math.floor(Math.random() * 2);
            //console.log(players)
            // console.log(opportunity)
        var score = Math.floor(Math.random() * 18);
        if (myteams[opportunity].skills >= score) {
            goal[opportunity]++
        }
        k++
    }

    teams.Home.goals += goal[0]
    teams.Away.goals += goal[1]
    if (goal[0] === goal[1]) {
        teams.Home.draw++;
        teams.Away.draw++;
    } else if (goal[0] > goal[1]) {
        teams.Home.won++;
    } else {
        teams.Away.won++;
    }
    resultArray.push(goal[0], goal[1]);
    results.push(resultArray)
    
    k = 0
    

    if (matchesCompleted) {
        var most_freq = mostFrequent(results);
        
        div.style.display = "block"
        while (resultsTable.rows.length > 1) {
            resultsTable.deleteRow(1);
        }
        tough.innerHTML = "";

        var home_wins = teams.Home.won;
        var away_wins = teams.Away.won;
        var draws = teams.Home.draw;

        var scores = document.createElement("td");
        var prediction = document.createElement("td");
        var gg = document.createElement("td");
        var ov1 = document.createElement("td");
        var ov2 = document.createElement("td");
        var probability = document.createElement("td");

        var row1 = document.createElement("tr");

        scores.style.textAlign = "center"
        prediction.style.textAlign = "center"
        gg.style.textAlign = "center"
        ov1.style.textAlign = "center"
        ov2.style.textAlign = "center"
        probability.style.textAlign = "center"
        prediction.style.color = "#0000FF"

        row1.append(scores);
        row1.append(prediction);
        row1.append(gg);
        row1.append(ov1);
        row1.append(ov2);
        row1.append(probability)

        resultsTable.append(row1)

        if (most_freq[0] > most_freq[1]) {

            scores.innerHTML = most_freq[0] + " - " + most_freq[1];
            prediction.innerHTML = "Home";
            probability.innerHTML = ((home_wins / (counter + 1.1)) * 100).toFixed(2) + "% ";
            //console.log(mostFrequent(results));

        } else if (most_freq[1] > most_freq[0]) {

            scores.innerHTML = most_freq[0] + " - " + most_freq[1];
            prediction.innerHTML = "Away";
            probability.innerHTML = ((away_wins / (counter + 1.1)) * 100).toFixed(2) + "% ";
            //console.log(mostFrequent(results));


        } else if (most_freq[0] == most_freq[1]) {
            scores.innerHTML = most_freq[0] + " - " + most_freq[1];
            prediction.innerHTML = "  Draw";
            probability.innerHTML = ((draws / (counter + 1.2)) * 100).toFixed(2) + "% ";
            //console.log(mostFrequent(results));
        } else {
            if (resultsTable.rows.length > 1) {
                resultsTable.deleteRow(1);
            }
            return tough.innerHTML = "This Match was Tough. Try Again";
        }

        if (most_freq[0] > 0 && most_freq[1] > 0) {
            gg.innerHTML = '<i class="text-success font-bold fas fa-check" aria-hidden="true"></i>';
        } else {
            gg.innerHTML = '<i class="text-danger fa fa-times" aria-hidden="true"></i>';
        }
        if ((most_freq[0] + most_freq[1]) > 1) {
            ov1.innerHTML = '<i class="text-success font-bold fas fa-check" aria-hidden="true"></i>';
        } else {
            ov1.innerHTML = '<i class="text-danger fa fa-times" aria-hidden="true"></i>';
        }
        if ((most_freq[0] + most_freq[1]) > 2) {
            ov2.innerHTML = '<i class="text-success font-bold fas fa-check" aria-hidden="true"></i>';
        } else {
            ov2.innerHTML = '<i class="text-danger font-bold fas fa-times" aria-hidden="true"></i>';
        }

        if (home_wins > (counter * 3 / 4) || away_wins > (counter * 3 / 4) || draws > (counter * 3 / 4)) {
            probability.style.color = "green"
        } else if (home_wins < (counter / 2) && away_wins < (counter / 2) && draws < (counter / 2)) {
            probability.style.color = "red"
        } else {
            probability.style.color = "orange"
        }
    }
    home_wins = 0;
    away_wins = 0;
    draws = 0;
    team1_goals = 0;
    team2_goals = 0;
    resultArray = [];
}

function mostFrequent(array) {
    if (array.length == 0) return null;

    var modeMap = {},
        maxEl = array[0],
        maxCount = 1;

    for (var i = 0; i < array.length; i++) {
        var el = array[i];

        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;

        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        } else if (modeMap[el] == maxCount) {
            //maxEl += "&" + el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}