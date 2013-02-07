/**
 * Created with JetBrains WebStorm.
 * User: junichihonda
 * Date: 2013/02/07
 * Time: 12:11
 *
 * @author Junichi Honda
 *
 * This is a Class of converting images to Base64.
 */

var Base64Converter = function(){
    var _this = this;
    _this.loadBinaryResource = function(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.overrideMimeType('text/plain; charset=x-user-defined');
        req.send(null);
       //if (req.status != 200) return '';
        return req.responseText;
    }

    _this.convertBinaryFile = function(url) {
        var _fileStream = _this.loadBinaryResource(url);
        var _ba = [];
        var _i, _num = _fileStream.length;
        for(_i = 0; _i < _num; _i++) {
            _ba[_i] = _fileStream.charCodeAt(_i) & 0xff;
        }
        return String.fromCharCode.apply(String, _ba);
    }

    _this.convertImgDataURL = function(url) {
        var _bin = _this.convertBinaryFile(url);
        var _base64 = btoa(_bin);
        var _header = _bin.substring(0, 9);
        var _exe = _this.checkExe(_header);

        return 'data:image/' + _exe + ';base64,' + _base64;
    }

    _this.checkExe = function(head) {
        if (head.match(/^\x89PNG/)) {
            return 'png';
        } else if (head.match(/^BM/)){
            return 'bmp';
        } else if (head.match(/^GIF87a/) || head.match(/^GIF89a/)) {
            return 'gif';
        } else if (head.match(/^\xff\xd8/)) {
            return 'jpeg';
        } else {
            return false;
        }
    }
};