(function() {

  /*
  * @function songPlayer
  * @desc function that will be passed to factory service
  * @returns {Object} SongPlayer
  */
    function SongPlayer(Fixtures) {
/*
* @desc object for playing or pausing a song
* @type {Object}
*/
      var SongPlayer = {};
/*
  @desc private variable to store current album info
  @type {Object}
*/
      var currentAlbum = Fixtures.getAlbum();

/*
* @desc Buzz object audio file
* @type {Object}
*/
      var currentBuzzObject = null;
/*
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
      var setSong = function(song) {
        if (currentBuzzObject) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
        });

      };
/*
* @function playSong
* @desc plays current buzzObject audio file and sets current song object property
* @param {Object} song
*/
      var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
      };


      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      };

/*
* @desc var set to song object
* @type {Object}
*/
      SongPlayer.currentSong = null;

/*
* @function play and pause
* @desc logic for playing or pausing a song based on click
* @param {Object} song
*/

      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);

          playSong(song);

        } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        }
    };

      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
