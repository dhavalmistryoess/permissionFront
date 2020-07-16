import { Component, OnInit } from '@angular/core';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {
  isfullscreen;
  constructor() { }

  ngOnInit() {

   // console.log($('.abc').length)
    let self=this;


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
   
      if(self.isfullscreen==true){        
        e.preventDefault();
        return false;
      }
      
    }

//      $(document).on('keypress','.abc',function(e)
//   //  $('.abc').keydown(function(e) 
// { 
  
//     var key = e.charCode || e.keyCode;
//     debugger;
   
//     e.preventDefault();
// });
  }
  openfullscreen() {
    // Trigger fullscreen
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
  
    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    this.isfullscreen = true;

  }
 
  closefullscreen(){
    debugger;
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isfullscreen = false;
  }
}
