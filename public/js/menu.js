/**
 * Created by djz on 09.08.2018.
 */


function getGames() {
    if ($ === undefined) return;

    $.ajax({
        url: '/games/list',
        type: 'GET',
        contentType: "application/json",
        success: function (res) {
            if (!res.games) return;

            var gamesArr = res.games;
            var cards = '';

            for(var i=0; i < gamesArr.length; i++) {
                cards += createCard(gamesArr[i]);
            }

            $(".games-table").append(cards);
        }
    })
}

function createGame(userName, fieldSize) {
    $.ajax({
        url: "/games/new",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            userName: userName,
            size: fieldSize
        }),
        success: function (res) {
            // reset();
            // $("table tbody").append(row(user));
            console.log(res);
            // window.location.href = "http://www.google.com";
        }
    })
}




var createCard = function (game) {
    var gameToken = game.gameToken;
    var owner = game.owner;             // автор игры
    var opponent = game.opponent;       // присоединенный игрок
    var gameDur = game.gameDuration;    // сколько уже идет игра в миллисекундах
    var gameResult = game.gameResult;   // "” || "owner” || "opponent” || "draw” // кто выиграл партию
    var state = game.state;             // "ready” || "playing” || "done” // статус игры, "ready” – готов, "playing” – идет игра, "done” - завершена

    var returnHtml = '';

    if (state === 'ready') {

        returnHtml = '' +
            '<div class="game-card card-ready" data-gametoken=""' + gameToken + '">' +
                '<table class="gamecard-table">' +
                    '<tbody>' +
                        '<tr class="gamecard-top">' +
                            '<td class="player-name">' + owner + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr class="gamecard-middle">' +
                            '<td class="player-name">' + opponent + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="gamecard-time" colspan="2">' + millisecondsToTime(gameDur) + '</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>'

    } else if (state === 'playing') {

        returnHtml = '' +
            '<div class="game-card card-inprogress" data-gametoken=""' + gameToken + '">' +
                '<table class="gamecard-table">' +
                    '<tbody>' +
                        '<tr class="gamecard-top">' +
                            '<td class="player-name">' + owner + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr class="gamecard-middle">' +
                            '<td class="player-name">' + opponent + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="gamecard-time" colspan="2">' + millisecondsToTime(gameDur) + '</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div> '

    } else {

        var ownerWinner = opponentWinner = 'gamecard-winner';
        if (gameResult !== 'owner') ownerWinner = '';
        if (gameResult !== 'opponent') opponentWinner = '';

        returnHtml = '' +
            '<div class="game-card card-completed" data-gametoken=""' + gameToken + '">' +
                '<table class="gamecard-table">' +
                    '<tbody>' +
                        '<tr class="gamecard-top ' + ownerWinner + '">' +
                            '<td class="player-name">' + owner + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr class="gamecard-middle ' + opponentWinner + '">' +
                            '<td class="player-name">' + opponent + '</td>' +
                            '<td class="gamecard-tick"><span>✓</span></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="gamecard-time" colspan="2">' + millisecondsToTime(gameDur) + '</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>'
    }

    return returnHtml;
};


$("#new-game").click(function (e) {
    e.preventDefault();
    createGame('Aaa Bbb', 3);
});


getGames();
