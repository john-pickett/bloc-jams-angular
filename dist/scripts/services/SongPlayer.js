(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
        var currentBuzzObject = null;

        /**
         * @function setSong, private function
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
        */
        var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
         }
        
        /**
         * @function playSong, private function
         * @desc Plays selected song and sets song.playing to true
         * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

        /**
         * @function SongPlayer.play(), public method
         * @desc Plays current song and changes playing attr to true
         * @param {Object} song
        */
        
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                setSong(song);
                playSong(song);
                console.log("Is a song playing? A song should be playing!");

             } else if (currentSong === song) {
                console.log("line 33");
                if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }

             } else {
                console.log("line 37");

             } // end of last else 

         }; // end of .play method
        
        /**
         * @function SongPlayer.pause, public method
         * @desc Pauses currently playing song
         * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            console.log("Song is now paused.");
            currentBuzzObject.pause();
            song.playing = false;

        }; //end of .pause method

         return SongPlayer;
    }

    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();