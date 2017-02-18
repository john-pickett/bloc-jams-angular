(function (){
    function AlbumCtrl() {
        this.albumData = []
        this.albumData.push(albumPicasso);
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();