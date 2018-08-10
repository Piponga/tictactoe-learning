/**
 * Created by djz on 10.08.2018.
 */

var thisGame = {
    gameToken: '0',
    owner: 'Anton',
    opponent: 'Jonny',
    size: 3,
    gameDuration: 0,
    gameResult: '',
    state: 'playing'
};

var gameState = {
    status: 'ok',
    code: 0,
    youTurn: true,
    gameDuration: 0,
    field: [
        '???',
        '???',
        '???'
    ],
    winner: ''
};
var currentPlayer = ['owner','opponent'][Math.round(Math.random())];
var startTime, startDuration;
var timerMain, timerDelayStep, timerGameUpdate;


function gameInit() {
    clean();

    setPlayersName(thisGame.owner, thisGame.opponent);
    setPlayerTurn(currentPlayer);
    buildField(thisGame.size);

    renderState(gameState, currentPlayer);
    renderTimer(gameState.gameDuration);

    startTime = new Date().getTime();
    startDuration = gameState.gameDuration;

    timerMain = setInterval(function () {
        gameState.gameDuration = new Date().getTime() - startTime + startDuration;
        renderTimer(gameState.gameDuration);
    }, 1000);

    // timerGameUpdate = setTimeout(function () {
    //     renderState(gameState, currentPlayer);
    // }, 2000);

}

function setPlayersName(owner, opponent) {
    $("#owner-name > .game-player-name").text(owner + ' (you)');
    $("#opponent-name > .game-player-name").text(opponent);
}

// 'owner' or 'opponent'
function setPlayerTurn(ownerOrOpponent) {
    $("#owner-name").attr('active', 'false');
    $("#opponent-name").attr('active', 'false');

    if (ownerOrOpponent === 'opponent') {
        $("#opponent-name").attr('active', 'true');
    } else {
        $("#owner-name").attr('active', 'true');
    }
}

function buildField(size) {
    if (!!$.trim($(".field-cells-cont").html())) return;    //is field container not empty

    size = Math.min(Math.max(size, 3), 10);

    var cellWidth = 100;
    var cellMargin = 3;
    var marginCoeff = cellMargin / cellWidth;
    var bgSizeCoeff = 0.9533;   // if cell = 100px, then 3 cells = 300px and yellow background will be Math.round(300 * 0.9533) = 286px
    var iconPadding = 18;
    var iconPaddingCoeff = iconPadding / cellWidth;

    var maxWidth = $(".game-field").width();
    var fieldHtml = '', stateFieldLine = '';

    cellWidth = Math.min(cellWidth, maxWidth / size);
    cellMargin = Math.round(cellWidth * marginCoeff);
    iconPadding = Math.round(cellWidth * iconPaddingCoeff);

    for(var r = 0; r < size; r++) {
        for(var c = 0; c < size; c++) {
            fieldHtml += createCell(r, c, cellWidth - cellMargin*2, cellMargin, iconPadding);
            if (gameState.field.length < size) {
                stateFieldLine += '?';
            }
        }
        fieldHtml += '<br>';
        if (gameState.field.length < size) {
            gameState.field[r] = stateFieldLine;
        }
        stateFieldLine = '';
    }

    $(".field-cells-cont").append(fieldHtml);
    $(".field-cells-cont").css('background-size', Math.round(cellWidth * size * bgSizeCoeff) + 'px');
}

var createCell = function (row, col, width, margin, iconPadding) {
    return '' +
        '<div class="field-cell" style="width: ' + width + 'px; height: ' + width + 'px; margin: ' + margin + 'px;" row="' + row + '" col="' + col + '" enabled="false">' +
            '<div id="cell-circle" class="field-icon" style="padding: ' + iconPadding + 'px" data-visible="false" colored="false">' +
                '<svg version="1.1" id="Selected_Items" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"' +
                'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"' +
                'x="0px" y="0px" width="100%" height="100%" viewBox="0 0 68 68" enable-background="new 0 0 68 68" xml:space="preserve">' +
                    '<path fill-rule="evenodd" clip-rule="evenodd" fill="#2d9cdb" d="M34,0c9.389-0.004,17.414,3.321,24.075,9.975' +
                'C64.695,16.602,68.003,24.61,68,34c0.003,9.38-3.306,17.396-9.925,24.05l-0.025,0.025C51.396,64.694,43.38,68.002,34,68' +
                'c-9.346,0.003-17.346-3.305-24-9.925H9.976C3.321,51.414-0.004,43.389,0,34c0.004-9.39,3.337-17.398,10-24.025H9.976' +
                'C16.637,3.32,24.646-0.005,34,0z M55.226,12.825C49.354,6.946,42.278,4.004,34,4c-8.245,0.005-15.304,2.946-21.175,8.825H12.8' +
                'C6.93,18.665,3.997,25.723,4,34c0.005,8.278,2.946,15.353,8.825,21.225H12.8C18.68,61.072,25.746,63.997,34,64' +
                'c8.275-0.002,15.35-2.919,21.226-8.75l0.024-0.025C61.081,49.35,63.998,42.275,64,34C63.997,25.723,61.072,18.665,55.226,12.825z"/>' +
                '</svg>' +
            '</div>' +
            '<div id="cell-cross" class="field-icon" style="padding: ' + iconPadding + 'px" data-visible="false" colored="false">' +
                '<svg version="1.1" id="Selected_Items" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"' +
                'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"' +
                'x="0px" y="0px" width="100%" height="100%" viewBox="0 0 68 68" enable-background="new 0 0 68 68" xml:space="preserve">' +
                    '<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#dd4979" points="34,31.15 59.575,5.575 62.425,8.425 36.851,34 ' +
                '62.425,59.575 59.575,62.425 34,36.85 8.425,62.425 5.575,59.575 31.15,34 5.575,8.425 8.425,5.575 "/>' +
                '</svg>' +
            '</div>' +
        '</div>'
};


function renderTimer(duration) {
    $(".field-time").text(millisecondsToTime(duration));
}

function renderState(state, player) {
    var sRows   = 0 || state.field.length;
    var sCols   = 0 || state.field[0].length;

    for (var r = 0; r < sRows; r++) {
        for (var c = 0; c < sCols; c++) {
            showCellFigure(r, c, state.field[r][c], player);
        }
    }
}

var showCellFigure = function (r, c, figure, player) {
    var cell = $(".field-cell[row='" + r + "'][col='" + c + "']");
    var circle = cell.children("#cell-circle");
    var cross = cell.children("#cell-cross");

    cell.attr('enabled', 'false');
    circle.attr('data-visible', 'false');
    cross.attr('data-visible', 'false');
    circle.attr('colored', 'false');
    cross.attr('colored', 'false');

    if (figure === 'X') {
        cross.attr('data-visible', 'true');
    } else if (figure === 'O') {
        circle.attr('data-visible', 'true');
    } else {
        cell.attr('enabled', 'true');   //for cursor: pointer;
    }

    if (player === 'owner') {
        cross.attr('colored', 'true');
    } else if (player === 'opponent') {
        circle.attr('colored', 'true');
    }
};


function clean() {
    $("#owner-name > .game-player-name").text('');
    $("#opponent-name > .game-player-name").text('');

    $("#owner-name").attr('active', 'false');
    $("#opponent-name").attr('active', 'false');

    $(".field-cells-cont").empty();

    $(".field-time").text(millisecondsToTime(0));
}

function checkWinner(state) {
    var checkCount = 5;
    var rows, cols;
    var isCompleted = false;
    var isHasEmpty = false;
    var resultArray = [];

    rows = state.field.length;
    cols = state.field[0].length;
    checkCount = Math.min(checkCount, rows);

    var checkLine = function (row, col, count, way) {
        var first = state.field[row][col];
        if (first === '?') return ['?'];

        var result = '';
        var resultArr = [[row,col]];
        var rr=row, cc=col, rrIncr, ccIncr;
        var equal = true;

        switch (way) {
            case '-':
                rrIncr = 0;
                ccIncr = 1;
                break;
            case '\\':
                rrIncr = 1;
                ccIncr = 1;
                break;
            case '|':
                rrIncr = 1;
                ccIncr = 0;
                break;
            case '/':
                rrIncr = 1;
                ccIncr = -1;
        }

        count = Math.max(0, count-1);

        for (var k = 0; k < count; k++) {
            rr += rrIncr;
            cc += ccIncr;

            var cellVal = state.field[rr][cc];
            if (cellVal === '?') return ['?'];

            if (equal) {
                equal = first === cellVal;
                resultArr.push([rr,cc]);
            }
            // console.log(66, first, row, col, way, row + rr, col + cc, cellVal, equal);
        }

        if (equal) {
            // console.log(77, resultArr)
            // result = first === 'X' ? 'owner' : 'opponent';
            return resultArr;
        }

        return [];
    };

    var checkCompleted = function (res) {
        if (res[0] === '?') {
            isHasEmpty = true;
            res = [];
            return false;
        }
        return res.length > 0;
    };

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var cMax = c + checkCount;
            var rMax = r + checkCount;


            if (!isCompleted && cMax <= cols) {
                resultArray = checkLine(r, c, checkCount, '-');
                isCompleted = checkCompleted(resultArray);
            }
            if (!isCompleted && cMax <= cols && rMax <= rows) {
                resultArray = checkLine(r, c, checkCount, '\\');
                isCompleted = checkCompleted(resultArray);
            }
            if (!isCompleted && rMax <= rows) {
                resultArray = checkLine(r, c, checkCount, '|');
                isCompleted = checkCompleted(resultArray);
            }
            if (!isCompleted && rMax <= rows && c >= checkCount-1) {
                resultArray = checkLine(r, c, checkCount, '/');
                isCompleted = checkCompleted(resultArray);
            }
        }
    }

    // console.log(222, isCompleted, isHasEmpty, resultArray)

    if (isCompleted || !isHasEmpty) {
        runEndGame(state, resultArray);

        return true;
    }

    return false;
}

//--------------------------------------------------------------FINISH------------------------------
function runEndGame(state, resArr) {
    clearTimeout(timerMain);
    clearTimeout(timerDelayStep);
    $(".field-cell").attr('enabled', 'false');

    var gameResult = 'draw';

    if (resArr.length > 0) {
        var winIcon = state.field[resArr[0][0]][resArr[0][1]];

        gameResult = winIcon === 'X' ? 'owner' : 'opponent';
    }

    if (gameResult === 'draw') {
        // turn colors to grayscale
        $(".field-icon").attr('colored', 'false');
        $(".field-cells-cont").css('opacity', '0.4');
    } else {
        // make a line under completed cells
        for (var i = 0; i < resArr.length; i++) {
            var r = resArr[i][0];
            var c = resArr[i][1];
            $(".field-cell[row='" + r + "'][col='" + c + "']").css('background-color', '#f3c94d');
        }
    }

    console.log(gameResult);
}

//--------------------------------------------------------------------------------------
$("#surrender").click(function (e) {
    e.preventDefault();
    console.log('surrender');
});


readUrlParams();
gameInit();

$(".field-cell").click(function (e) {
    e.preventDefault();

    var row = Number(e.currentTarget.attributes.row.value);
    var col = Number(e.currentTarget.attributes.col.value);
    var enabled = e.currentTarget.attributes.enabled.value === 'true';


    if (!enabled) return;

    var playerIcon = currentPlayer === 'owner' ? 'X' : 'O';

    var arr = gameState.field[row].split('');
    arr[col] = playerIcon;
    gameState.field[row] = arr.join('');

    gameState.field[row][col] = playerIcon;
    renderState(gameState, currentPlayer);

    if (checkWinner(gameState)) return;

    timerDelayStep = setTimeout(function () {
        currentPlayer = currentPlayer === 'owner' ? 'opponent' : 'owner';
        setPlayerTurn(currentPlayer);
        renderState(gameState, currentPlayer);


    }, 100);
});

//--------------------------------------------------------------------------------------
function readUrlParams() {
    try {
        var varName='', varValue=0;
        var url_string = location.href;
        var url = new URL(url_string);
        var paramsArr = url.search.replace(/\?/,'').split(/[\?\&]/g);
        if (paramsArr.length > 0) {
            for (var k = 0; k < paramsArr.length; k++) {
                if (paramsArr[k] !== '') {
                    var arr = paramsArr[k].split('=');

                    window.thisGame.size = Number(arr[1]);
                }
            }
        }
    } catch (err) {

    }
}
