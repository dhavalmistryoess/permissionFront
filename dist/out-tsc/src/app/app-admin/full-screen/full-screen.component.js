import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var FullScreenComponent = /** @class */ (function () {
    function FullScreenComponent() {
    }
    FullScreenComponent.prototype.ngOnInit = function () {
        // console.log($('.abc').length)
        var self = this;
        //   $(document).bind('keydown', function(e) {
        //     debugger;
        //     e.preventDefault();
        //     if (e.keyCode === 27) { // Escape key
        //         // Other code goes here    
        //     }
        // });
        // $(window).on("keydown", function(e) {
        //   $(document).on('keypress','.abc',function(e){ 
        //     var code = (e.keyCode ? e.keyCode : e.which);
        //     e.preventDefault();
        //     debugger;
        //     if (code == 27) {
        //       e.preventDefault();
        //       return false;
        //     }
        // });
        document.onkeydown = function (e) {
            // console.log(e);
            var code = (e.keyCode ? e.keyCode : e.which);
            if (self.isfullscreen == true) {
                e.preventDefault();
                return false;
            }
        };
        //      $(document).on('keypress','.abc',function(e)
        //   //  $('.abc').keydown(function(e) 
        // { 
        //     var key = e.charCode || e.keyCode;
        //     debugger;
        //     e.preventDefault();
        // });
    };
    FullScreenComponent.prototype.openfullscreen = function () {
        // Trigger fullscreen
        var docElmWithBrowsersFullScreenFunctions = document.documentElement;
        if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
        }
        else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
        }
        else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
        }
        else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
        }
        this.isfullscreen = true;
    };
    FullScreenComponent.prototype.closefullscreen = function () {
        debugger;
        var docWithBrowsersExitFunctions = document;
        if (docWithBrowsersExitFunctions.exitFullscreen) {
            docWithBrowsersExitFunctions.exitFullscreen();
        }
        else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
            docWithBrowsersExitFunctions.mozCancelFullScreen();
        }
        else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        }
        else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
            docWithBrowsersExitFunctions.msExitFullscreen();
        }
        this.isfullscreen = false;
    };
    FullScreenComponent = tslib_1.__decorate([
        Component({
            selector: 'app-full-screen',
            templateUrl: './full-screen.component.html',
            styleUrls: ['./full-screen.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FullScreenComponent);
    return FullScreenComponent;
}());
export { FullScreenComponent };
//# sourceMappingURL=full-screen.component.js.map