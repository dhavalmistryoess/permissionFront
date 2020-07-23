# Permission API

In the API Folder 

In the config 
$config['enable_hooks'] = TRUE;

copy the config/hook into your folder

copy the hooks/PermissionComponent into your folder

Add the $allowedWithOutLogin which function you want to add allow without login

Copy the modules/Assessment/controllers/SyncDetails.php

In the SyncDetails Controller getClassName() add the Your controller path

 $foldername = [
                "application/modules/Assessment/controllers/",
                "application/modules/Common/controllers/"
            ];


In the  if (!in_array($fileName, array('CronJobs.php', 'SyncDetails.php'))) 

Add the controller name You do not want to sync.

Run the http://PATH/Assessment/SyncDetails/getClassName


# Front Side API


In the global.ts file add the menuEntity Item Which are you have required


Copy the checkRoutePermission() in the global.ts file

In the Auth-Guard service Copy the below code
let permission = this.globals.checkRoutePermission();

if (route.data['permission'] != undefined && !permission[route.data['permission']]) {
    return this.router.navigate(["/pagenotfound/" + window.btoa("403")]);
}

These permission is used in the Html file LIKE  *ngIf ="globals.permissions['add-country']"

In the Routing File add the permission Key

  { path: 'country/list', component: CountryListComponent, canActivate: [AuthGuard] , data: {
                permission: 
                   'country-list'
            }},
    

In the common.service.ts file copy the below function
checkPermission()
hasAccess()


For the sidebar

Define the variables

menuDisplayEntity:any;
menuEntity:any;
listPermission;

Add the below Code on ngOnInit()

this.listPermission =[];
this.menuEntity = [{
    key : 'country-list',
    value : false
},
{
    key : 'emailtemplate-list',
    value : false
},
{
    key : 'state-list',
    value : false
}
];

this.CommonService.checkPermission()
.then((data) => {
    this.listPermission = data;
    this.menuEntity = this.CommonService.hasAccess(this.listPermission,this.menuEntity);
},
    (error) => {
    this.globals.isLoading = false;
    this.globals.pageNotfound(error.error.code);
});


In the HTML file

For the menu permission  *ngIf ="menuEntity['country-list']"


   










