
function showAllTime(){
    document.body.style.backgroundImage ="url('/static/images/pages/corkAerial.jpg')";
    //document.getElementById("leaderboard_name").innerHTML = "All time";
    var oldL = document.getElementById("leaderboard1");
    var easyL = document.getElementById("easyLeaderboard");
    var hardL = document.getElementById("HardLeaderboard");
    var retroL = document.getElementById("RetroLeaderboard");
    oldL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
    easyL.style.display = "none";
    hardL.style.display = "none";
    retroL.style.display = "none";
}
function showEasy(){
    document.body.style.backgroundImage ="url('/static/images/pages/corkAerial.jpg')";
    //document.getElementById("leaderboard_name").innerHTML = "Easy mode";
    var oldL = document.getElementById("leaderboard1");
    var easyL = document.getElementById("easyLeaderboard");
    oldL.style.display = "none";
    easyL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}

function showHard(){
    document.body.style.backgroundImage ="url('/static/images/pages/corkAerial.jpg')";
    //document.getElementById("leaderboard_name").innerHTML = "Hard mode";
    var oldL = document.getElementById("leaderboard1");
    var hardL = document.getElementById("HardLeaderboard");
    oldL.style.display = "none";
    hardL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}

function showRetro(){
    document.body.style.backgroundImage ="url('https://st.depositphotos.com/1022027/2484/i/950/depositphotos_24841573-stock-photo-old-newspaper-background.jpg')";
    //document.getElementById("leaderboard_name").innerHTML = "Retro mode";
    var oldL = document.getElementById("leaderboard1");
    var retroL = document.getElementById("RetroLeaderboard");
    oldL.style.display = "none";
    retroL.style.cssText = "display: grid; width: 80%; grid-area: footer; margin: auto; align-items: center; justify-items: center;"
}
