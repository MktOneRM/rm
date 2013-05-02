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
            quality: 50,
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
            quality: 50, 
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
            quality: 50,
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
        viewModel.colaboradorSelecionado.set("ColFoto","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABbCAQAAABkbztKAAAAAXNSR0IArs4c6QAAAAJiS0dEAACqjSMyAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH2wQEFTgvaGyX4gAABD9JREFUaN7tmuty2zYQhb8FITmyFcmRa1uqk4k9bd//SfIGaTqdTHpz4tws60Zi+4MgQ9upBHBIuz9IzUgjiRAOds+eXSwkr5T/zWWgA9OB6cB0YDowHZgOTMNglDaSva0DRFAon6kAK97JQ4ERFONBORRwgCA4QDGIv0vaBwPgUARhzFMGDOj56TekLPnCnBWO5CHcBMKYCZPSUsXnFss+EzIy/uaybTCOhAUvmJbr1jvxoIDB8IIRb6KIbuLDb8U5UyzynQeePTmRRzyP4o2Jt8wFM29Q3epKEI75OcI2Jo4tG044xeF2Rov6x5BfyJoHowg9pjgEQ4oJWrNjxBGbNtw0xWIwCHarZQSD8a/KOb1mweQSN6gMkAB5LEK/F2TFSMsMcDUkUgLlL4ozSRm+j5y1pcw6dSzjgkaaGNwZUop/OBDKxNoggYub5fHd1F5JVRNMRhZk7gcAoygmkIp3s5QLKrUidaaeVULdG5mbtGZoa7OhLRF6cd8qrg3O1CVv1qxlUiw/BCa8+xP82CyYhJSX9Gu4CZQZg6Zzk6sVSXly3TSZDjIsn4OpeDujASya1BkDLGsEd2iSjEyUykcgiYSTc+aq6UrPskZr7KDBMA+q9SII7GpROHfsqtl6Jk927+60QEJGwQdugmQvMh1c8tWvVoNdZHgbuMsycQZX1iguovxUMrLAaaJLiHkJRAOXcBM8iYml46cy0CVwxHU7YATDDRs/LNRR79nggrY50W7q86sP823xoSgZDsdn1thAUYh2EyzZIDu0ON/yGeDPsu2oTYPJU+ZrryDbLJN/+4FrEjKSoBoxGowAH1ntZEwuBJdknuwtWcbRZ7kzmgyKssIgJO1sVYqYsjsGSvnjibeMNE/gYqIkcM+deLVuRfQKetpA0E/a22tXV6wBkGEQVRtGi56S0g/I2rlzBqQRcGw8X2ac7GwAqJe5CcLvwYc+kf0ZWDOjj5LsbDXnresj39hvwU0pCT0Es+MAR7y+KDAMdlTUXtsAY7+Rl62pT1EcDkUZsQmEY8MdBI6UcXnOlmxR1UKLQNnHeuDShGWKnpXjjMPyxCSMlMo+L9kPqg1teKfqORP2ojs0guOIZ3zlHYsdCwhwU8YBp4yxNdto+fQjDvnEHyy2OEy+/2+0b8fFQ844KKsXV6NLnpXlgwJL/uEL6S2g/2kZ9W35JXuccYxiKw3pxAONicHbSfWAc5Q5b1jeO/ipWKao+B0w4pQhhqzSq2qqM65+cde854pNBVIFjPPh9YwZT3wJbSp1W3NgiqLVkHLFXyxIMFU3KYaEE6a+YMwVtogdbfTEID9IS3AYjjlhzm95pOWWUQwXPK2UBlLqiTbqpNsBUvyuY83b3DLKmAvPebkTku2cotyXzD1+wsKQA85wPvc8zpWXJPaUI/YeFci3vGQPa/R227pEu/8Dd2A6MB2YDkwHhn8BXNB6BARw7GsAAAAASUVORK5CYII=");
    }
}