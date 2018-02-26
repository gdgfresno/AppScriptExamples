
function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Square Game')
      .addItem('Fill Square', 'fillSquare')
      .addItem('Get Winners', 'getWinners')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function fillSquare() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var participants = ss.getSheets()[0];
  var players = [];
  var player = " ";
  var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var index = 1;
  while(player && player.length > 0) {
    player = participants.getRange(index, 1).getValue();
    if (player && player.length > 0) {
      players.push(player);
    }
    index++;
  }
  var square = ss.getSheets()[2];
  var nPlayers = players.length;
  for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      square.getRange(row + 2, col + 2).setValue(players[(row * 10 + col) % nPlayers]);
    }
  }
}

function getWinners() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var results = ss.getSheets()[1];
  var square = ss.getSheets()[2];
  var colIndexing = {};
  var rowIndexing = {};
  for (var ind = 2; ind <= 11; ind++) {
    colIndexing[square.getRange(1, ind).getValue()] = ind;
    rowIndexing[square.getRange(ind, 1).getValue()] = ind;
  }
  console.log(colIndexing);
  console.log(rowIndexing);
  for (var quarter = 3; quarter < 7; quarter++) {
    var colInd = colIndexing[results.getRange(quarter, 6).getValue()];
    var rowInd = rowIndexing[results.getRange(quarter, 7).getValue()];
    results.getRange(quarter, 8).setValue(square.getRange(rowInd, colInd).getValue());
  }
}
