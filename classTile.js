
function Tile (args) {

  var args = args || {};
  this.id = args.id || 'tile-' + Math.floor(Math.random() * 1000000);
  this.letter = args.letter || '';

  this.wordIndex = -1;
  this.selected = false;
  this.active = true;

  this.clickMe = function () {

    if (this.active) {

      this.selected = !this.selected;

      if (this.selected) {
        $('#' + this.id).addClass('tileSelected');
        checkWord(this);
      } else {
        $('#' + this.id).removeClass('tileSelected');
      }

    }

  }

}
