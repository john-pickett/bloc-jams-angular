(function() {
    function SongPlayer($rootScope, Fixtures) {
    
    // ////// Private Attributes //////
        
        // The SongPlayer object 
        var SongPlayer = {};
        
        // uses Fixtures .getAlbum function to set currentAlbum variable
        var currentAlbum = Fixtures.getAlbum();
    
        // This holds the current song
        var currentBuzzObject = null;
        
    // ////// Private Functions //////

        /**
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
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

             SongPlayer.currentSong = song;
         }
        
        /**
         * @function playSong
         * @desc Plays selected song and sets song.playing to true
         * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
//            SongPlayer.volume = currentBuzzObject.getVolume();
        }
        
        /**
         * @function getSongIndex
         * @desc Returns location/index of current song playing
         * @param {Object} song
        */
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
    // ////// Public Methods //////
        
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        // Volume attribute
        
        SongPlayer.volume = 80;

        /**
         * @function SongPlayer.play()
         * @desc Plays current song and changes playing attr to true
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

         }; // end of .play method
        
        /**
         * @function SongPlayer.pause
         * @desc Pauses currently playing song
         * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
         * @function SongPlayer.previous
         * @desc Gets index of current song, decrements it
         * @param {Object} song
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        /**
         * @function SongPlayer.next
         * @desc Gets index of current song, increments it
         * @param {Object} song
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex === currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
         * @function setVolume
         * @desc Set volume of currently playing song
         * @param {Number} volume
         */
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
    
        // only return SongPlayer below this line
         return SongPlayer;
    }

    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();