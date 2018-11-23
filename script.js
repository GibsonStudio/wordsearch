
var tilesX = 10;
var tilesY = 10;
var tileSize = 40;
var letters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnoprstuyaeilmnostaeioue';
var grid = [];
var words = [];

var possibleWords = ['gibson', 'fender', 'sea', 'cat', 'guitar', 'house', 'mouse', 'car', 'tree', 'first', 'blue', 'metal', 'black', 'master', 'puppet', 'load', 'magnetic', 'printer', 'alice', 'computer', 'phone', 'fish', 'chips', 'sauce', 'florence', 'football', 'water', 'bird', 'inbox', 'email', 'radio', 'warrior', 'desk', 'bottle', 'justice', 'jelly', 'stick', 'nail', 'tooth', 'pen', 'table', 'playstation', 'donkey', 'marshall', 'pedal', 'speaker', 'potter', 'harry', 'moorlands'];
var wordCount = 12;


iniWords();
ini_grid();
add_words_to_grid();
fill_grid_with_random();


function iniWordsearch ()
{
  addWordsToScreen();
}


function iniWords ()
{

  words = [];

  for (var i = 0; i < wordCount; i++) {

    var thisWord = possibleWords.splice(Math.floor(Math.random() * possibleWords.length), 1);
    words.push(new Word({ text:thisWord[0] }));

  }

}






function start_grid_container ()
{

  var html = '<div id="grid_container" style="';
  html += 'width:' + ((tilesX * tileSize) + 2) + 'px; height:' + ((tilesY * tileSize) + 2) + 'px;';
  html += '">';

  document.write(html);

}



function end_grid_container ()
{
  var html = '</div>';
  document.write(html);
}



function addWordsToScreen ()
{

  var html = '';

  for (var i = 0; i < words.length; i++) {

    if (words[i].inGrid) {
      html += '<div id="word-' + i + '" class="word-in-list">' + words[i].text + '</div>';
    }

  }

  $('#words-list').html(html);

}




function checkWord (tileObject)
{
  //console.dir(tileObject);
  for (var x = 0; x < grid.length; x++) {

    for (var y = 0; y < grid[x].length; y++) {

      if (grid[x][y].wordIndex == tileObject.wordIndex && !grid[x][y].selected) {
        return false;
      }

    }

  }

  // found word
  console.log(words[tileObject.wordIndex].text + ' FOUND!');
  words[tileObject.wordIndex].found = true;

  //change class on tiles and deactivate tile
  for (var x = 0; x < grid.length; x++) {

    for (var y = 0; y < grid[x].length; y++) {

      grid[x][y].selected = false;
      $('#' + grid[x][y].id).removeClass('tileSelected');

      if (grid[x][y].wordIndex == tileObject.wordIndex) {
        $('#' + grid[x][y].id).addClass('tile-found');
        grid[x][y].active = false;
      }
    }

  }

  //cross out word in list
  $('#word-' + tileObject.wordIndex).addClass('word-found');

}



function ini_grid ()
{

  grid = [];

  for (var c = 0; c < tilesX; c++) {

    var col = [];

    for (var r = 0; r < tilesY; r++) {
      col[r] = new Tile();
    }

    grid[c] = col;

  }

}




function fill_grid_with_random ()
{

  for (var c = 0; c < grid.length; c++) {

    for (var r = 0; r < grid[0].length; r++) {

      if (grid[c][r].letter == '') {
        grid[c][r].letter = get_random_letter().toUpperCase();
      }

    }

  }

}




function add_words_to_grid ()
{

  for (var i = 0; i < words.length; i++) {

    var result = add_word_to_grid(words[i]);
    if (result) {
      words[i].inGrid = true;
    }

  }

}






function clickTile (x, y)
{
  grid[x][y].clickMe();
}








function add_word_to_grid (w)
{

  var validPosition = false;
  var loopCount = 0;

  while ( (!validPosition) && (loopCount < 1000) ) {

    var startX = Math.floor(Math.random() * grid.length);
    var startY = Math.floor(Math.random() * grid[0].length);
    var direction = get_direction(startX, startY);

    validPosition = isValidPosition(w.text, startX, startY, direction);

    loopCount++;

  }

  if (validPosition) {

    for (var i = 0; i < w.text.length; i++) {
      var thisLetter = w.text.charAt(i);
      grid[startX + (i * direction[0])][startY + (i * direction[1])].letter = thisLetter.toUpperCase();
      grid[startX + (i * direction[0])][startY + (i * direction[1])].wordIndex = getWordIndex(w);
    }

    return true;

  }

  return false;

}



function getWordIndex (w)
{

  for (var i = 0; i < words.length; i++) {

    if (words[i] == w) {
      return i;
    }

  }

  return -1;

}




function isValidPosition (w, startX, startY, direction)
{

  for (var i = 0; i < w.length; i++) {

    var thisLetter = w.charAt(i);
    var thisX = startX + (i * direction[0]);
    var thisY = startY + (i * direction[1]);

    if (thisX < 0 || thisX >= tilesX) {
      return false;
    }

    if (thisY < 0 || thisY >= tilesY) {
      return false;
    }

    if (grid[thisX][thisY].letter != '' && grid[thisX][thisY].letter != thisLetter) {
      return false;
    }

  }

  return true;

}








function get_direction (start_c, start_r)
{
  //TODO
  var valid_dirs = [];
  valid_dirs[0] = [0,-1];
  valid_dirs[1] = [1,-1];
  valid_dirs[2] = [1,0];
  valid_dirs[3] = [1,1];
  valid_dirs[4] = [0,1];
  valid_dirs[5] = [-1,1];
  valid_dirs[6] = [-1,0];
  valid_dirs[7] = [-1,-1];

  var direction = valid_dirs[Math.floor(Math.random() * 8)];
  return direction;
}





function populate_grid ()
{

  for (var c = 0; c < grid.length; c++) {

    for (var r = 0; r < grid[0].length; r++) {

      grid[c][r] = get_random_letter();

    }

  }

}









function add_tiles ()
{

  for (var c = 0; c < grid.length; c++) {

    var col_left = c * tileSize;

    for (var r = 0; r < grid[0].length; r++) {

      var thisTile = grid[c][r];
      var tile_top = r * tileSize;

      var html = '<div class="tile" ';
      html += 'id="' + thisTile.id + '" ';
      html += 'onclick="clickTile(' + c + ',' + r + ')" ';
      html += 'style="top:' + tile_top + 'px; left:' + col_left + 'px;width:' + tileSize + 'px;height:' + tileSize + 'px;">';
      html += thisTile.letter;
      html += '</div>';

      document.write(html);

    }

  }

}








function get_random_letter ()
{

  var lc = letters.length;
  var index = Math.floor(Math.random() * lc);
  return letters.charAt(index);

}
