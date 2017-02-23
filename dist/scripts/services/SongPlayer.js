(function() {
    function SongPlayer() {
        console.log("SongPlayer loaded");
    var SongPlayer = {};
        
    var currentSong = null;
    var currentBuzzObject = null;
    
    /**
     * @function setSong
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
        
     SongPlayer.play = function(song) {
         console.log(song.title);
         console.log("SongPlayer.play called");
         if (currentSong !== song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;
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