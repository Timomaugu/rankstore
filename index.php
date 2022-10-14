<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maugu VFL</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="css/all.css">
    <link rel="stylesheet" href="css/tailwind.css">
</head>

<style type="text/css">
    #odds td {
        border: 1px solid #7E7A6E;
    }
    
    #odds th {
        font-size: 12px;
    }
    
    #results td {
        border: 1px solid #D1D1D1;
        background-color: #F9F7F7
    }
    
    #results th {
        font-size: 12px;
    }
    
    i {
        background-color: #F9F7F7 !important;
        border: none;
    }
    #exp-text {
        margin: 20px 35px;
        color: red;
    }
</style>

<body>
    <div class="flex p-2 px-3 mb-2 bg-green-900 justify-between">
        <p class="text-white font-bold">VFL PREDICTOR</p>
        <div class="flex">
            <span class="font-bold text-white">LOGIN </span>
            <p class="text-white" id="login"></p>
        </div>
    </div>

    <!-- Errors -->
    <div class="container-fluid">
        <div class="row">
            <div class="ml-8 col-10 alert alert-danger alert-dismissible fade show" id="alert" role="alert" style="display: none;">
                <strong>Fix!</strong>&nbsp;<span id="error_msg"></span>
                <button type="button" class="btn-close" id="btn-close" aria-label="Close"></button>
            </div>
        </div>
    </div>
    <!-- starts here -->
    <div class="container-fluid">
        <div class="row">
            <div class="m-4 col">
                <table class="table table-warning table-bordered" id="odds">
                    <tr class="text-center">
                        <th>MATCH</th>
                        <th>HOME (1)</th>
                        <th>DRAW (x)</th>
                        <th>AWAY (2)</th>
                    </tr>
                </table>
            </div>
            <div class="col">
                <div class="ml-2 mr-2 form-group row">
                    <div class="mb-3 col-md-3">
                        <label class="font-bold" for="home">Home</label>
                        <input class="form-control border-2 border-green-900" step="0.22" min="1" type="number" placeholder="Home Team Odds" id="home-odd">
                    </div>
                    <div class="col-md-3">
                        <label class="font-bold" for="away">Away</label>
                        <input class="form-control border-2 border-green-900" step="0.22" min="1" type="number" placeholder="Away Team Odds" id="away-odd">
                    </div>
                    <div class="col">
                        <div class="">&nbsp;</div>
                        <button class="px-3 py-2 bg-green-900 text-white" id="predButton">PREDICT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="ml-6 mt-4 font-bold text-md">MATCH RESULTS :</div>
    </div>
    <div class="container-fluid">
        <div class="row" style="margin-top: -20px;">
            <div class="m-4 col-4" id="res-div" style="display: none;">
                <table class="table table-success table-bordered" id="results">
                    <tr class="text-center">
                        <th>GOALS</th>
                        <th>WON</th>
                        <th>G/G</th>
                        <th>OV(1.5)</th>
                        <th>OV(2.5)</th>
                        <th>PROB.</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="ml-6 font-bold text-danger text-sm" id="unpredictable"></div>
    </div>
    <div id="exp-text">Results = Average for a simulation of 1000 matches by the teams.</div>
    <script src="js/mainleague.js"></script>
</body>

</html>