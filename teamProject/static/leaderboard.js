function showAllTime(){
    document.getElementById("leaderboard_name").innerHTML = "All time";
    var oldL = document.getElementById("leaderboard1");
    oldL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}
function showEasy(){
    document.getElementById("leaderboard_name").innerHTML = "Easy mode";
    var oldL = document.getElementById("leaderboard1");
    var easyL = document.getElementById("easyLeaderboard");
    oldL.style.display = "none";
    easyL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}

function showHard(){
    document.getElementById("leaderboard_name").innerHTML = "Hard mode";
    var oldL = document.getElementById("leaderboard1");
    var hardL = document.getElementById("HardLeaderboard");
    oldL.style.display = "none";
    hardL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}

function showRetro(){
    document.getElementById("leaderboard_name").innerHTML = "Retro mode";
    var oldL = document.getElementById("leaderboard1");
    var retroL = document.getElementById("RetroLeaderboard");
    oldL.style.display = "none";
    retroL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}

