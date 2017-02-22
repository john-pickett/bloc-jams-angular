(function (){
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum;
//        this.albumData.push(albumPicasso);
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();