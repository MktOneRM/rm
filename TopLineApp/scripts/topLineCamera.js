document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
	cameraApp = new cameraApp();
    cameraApp.run();
}

function cameraApp(){}

cameraApp.prototype={
    _pictureSource: null,
    
    _destinationType: null,
    
    run: function(){
        var that=this;
	    that._pictureSource = navigator.camera.PictureSourceType;
	    that._destinationType = navigator.camera.DestinationType;
	    id("capturePhotoEditButton").addEventListener("click", function(){
            that._capturePhotoEdit.apply(that,arguments)
        });
	    id("getPhotoFromLibraryButton").addEventListener("click", function(){
            that._getPhotoFromLibrary.apply(that,arguments)
        });
	 },
    
   _capturePhoto: function() {
        var that = this;
        
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        },function(){
            that._onFail.apply(that,arguments);
        },{
            quality: 20,
            destinationType: that._destinationType.DATA_URL
        });
    },
    
     _capturePhotoEdit: function() {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        }, function(){
            that._onFail.apply(that,arguments);
        }, {
            quality: 20, 
            allowEdit: true,
            destinationType: cameraApp._destinationType.DATA_URL,
            targetWidth: 50,
            targetHeight: 50
        });
    },
    
   _getPhotoFromLibrary: function() {
        var that= this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);         
    },
    
    _getPhotoFromAlbum: function() {
        var that= this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },
    
   _getPhoto: function(source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function(){
            that._onPhotoURISuccess.apply(that,arguments);
        }, function(){
            cameraApp._onFail.apply(that,arguments);
        }, {
            quality: 20,
            destinationType: cameraApp._destinationType.DATA_URL,
            targetWidth: 50,
            targetHeight: 50,
            sourceType: source
        });
    },
    
    _onPhotoDataSuccess: function(imageData) {
        var smallImage = document.getElementById('ImgPequena');
        smallImage.style.display = 'block';
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
        viewModel.colaboradorSelecionado.set("ColFoto", smallImage.src);
    },
    
    _onPhotoURISuccess: function(imageURI) {
        var smallImage = document.getElementById('ImgPequena');
        smallImage.style.display = 'block';
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageURI;
        viewModel.colaboradorSelecionado.set("ColFoto", smallImage.src);
    },
    
    _onFail: function(message) {
        alert('Failed! Error: ' + message);
    }
}