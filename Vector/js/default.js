(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var _settings = {
        smallLogo: false,
        storeLogo: true,
        logo: true,
        badgeLogo: false,
        wideLogo: true,
        splashScreen: true,
        exportBackdrop: false,
        smallTileLogo: false,
        largeLogo: true,
        square44x44logo: true,
        square71x71logo: true,
        phoneSplashScreen: false,
        canvasColor: { r: 132, g: 14, b: 14 },
        exportWindows8Scales: false,
        exportWindowsPhoneScales: false,
        exportWindows10Scales: true,
    };
    var _imagePadding = 80;
    var _bottomPadding = 30;
    var _folderName = "AppImages";
    var _imagePath = "/images/widelogo.svg";
    var _manifestScaleReleaseMap = {
        "80": "windows8",
        "100": "all",
        "125": "windows10",
        "140": "windows8",
        "150": "windows10",
        "180": "windows8",
        "200": "windows10",
        "240": "windowsphone8",
        "400": "windows10"
    };
    var _manifestImages = [
        {
            title: "smalllogo",
            type: "square",
            release: "windows8",
            scaleToMask: 30 / 300,
            sizes: [
                { width: 24, height: 24, scale: "80" },
                { width: 30, height: 30, scale: "100" },
                { width: 42, height: 42, scale: "140" },
                { width: 54, height: 54, scale: "180" }]
        }, {
            title: "smalltilelogo",
            type: "square",
            release: "windows8",
            scaleToMask: 70 / 300,
            sizes: [
                { width: 56, height: 56, scale: "80" },
                { width: 70, height: 70, scale: "100" },
                { width: 98, height: 98, scale: "140" },
                { width: 126, height: 126, scale: "180" }]
        }, {
            title: "logo",
            type: "square",
            release: "all",
            scaleToMask: 150 / 300,
            sizes: [
                { width: 120, height: 120, scale: "80" },
                { width: 150, height: 150, scale: "100" },
                { width: 188, height: 188, scale: "125" },
                { width: 210, height: 210, scale: "140" },
                { width: 225, height: 225, scale: "150" },
                { width: 270, height: 270, scale: "180" },
                { width: 300, height: 300, scale: "200" },
                { width: 360, height: 360, scale: "240" },
                { width: 600, height: 600, scale: "400" }]
        }, {
            title: "badgelogo",
            type: "square",
            release: "all",
            scaleToMask: 24 / 300,
            sizes: [
                { width: 24, height: 24, scale: "100" },
                { width: 30, height: 30, scale: "125" },
                { width: 33, height: 33, scale: "140" },
                { width: 36, height: 36, scale: "150" },
                { width: 43, height: 43, scale: "180" },
                { width: 48, height: 48, scale: "200" },
                { width: 58, height: 58, scale: "240" },
                { width: 96, height: 96, scale: "400" }]
        }, {
            title: "widelogo",
            type: "wide",
            release: "all",
            scaleToMask: 150 / 300,
            sizes: [
                { width: 248, height: 120, scale: "80" },
                { width: 310, height: 150, scale: "100" },
                { width: 388, height: 188, scale: "125" },
                { width: 434, height: 210, scale: "140" },
                { width: 465, height: 225, scale: "150" },
                { width: 558, height: 270, scale: "180" },
                { width: 620, height: 300, scale: "200" },
                { width: 744, height: 360, scale: "240" },
                { width: 1240, height: 600, scale: "400" }]
        }, {
            title: "largelogo",
            type: "square",
            release: "all",
            scaleToMask: 310 / 300,
            sizes: [
                { width: 248, height: 248, scale: "80" },
                { width: 310, height: 310, scale: "100" },
                { width: 388, height: 388, scale: "125" },
                { width: 434, height: 434, scale: "140" },
                { width: 465, height: 465, scale: "150" },
                { width: 558, height: 558, scale: "180" },
                { width: 620, height: 620, scale: "200" },
                { width: 1240, height: 1240, scale: "400" }]
        }, {
            title: "splashscreen",
            type: "wide",
            release: "all",
            scaleToMask: 300 / 300,
            sizes: [
                { width: 620, height: 300, scale: "100" },
                { width: 775, height: 375, scale: "125" },
                { width: 868, height: 420, scale: "140" },
                { width: 930, height: 450, scale: "150" },
                { width: 1116, height: 540, scale: "180" },
                { width: 1240, height: 600, scale: "200" },
                { width: 2480, height: 1200, scale: "400" }]
        }, {
            title: "storelogo",
            type: "square",
            release: "all",
            scaleToMask: 50 / 300,
            sizes: [
                { width: 50, height: 50, scale: "100" },
                { width: 63, height: 63, scale: "125" },
                { width: 70, height: 70, scale: "140" },
                { width: 75, height: 75, scale: "150" },
                { width: 90, height: 90, scale: "180" },
                { width: 100, height: 100, scale: "200" },
                { width: 120, height: 120, scale: "240" },
                { width: 200, height: 200, scale: "400" }]
        }, {
            title: "square44x44logo",
            type: "square",
            release: "all",
            scaleToMask: 44 / 300,
            sizes: [
            { width: 44, height: 44, scale: "100" },
            { width: 55, height: 55, scale: "125" },
            { width: 62, height: 62, scale: "140" },
            { width: 66, height: 66, scale: "150" },
            { width: 88, height: 88, scale: "200" },
            { width: 106, height: 106, scale: "240" },
            { width: 176, height: 176, scale: "400" }]
        }, {
            title: "square71x71logo",
            type: "square",
            release: "all",
            release: "all",
            scaleToMask: 71 / 300,
            sizes: [
                { width: 71, height: 71, scale: "100" },
                { width: 89, height: 89, scale: "125" },
                { width: 99, height: 99, scale: "140" },
                { width: 107, height: 107, scale: "150" },
                { width: 142, height: 142, scale: "200" },
                { width: 170, height: 170, scale: "240" },
                { width: 284, height: 284, scale: "400" }]
        }, {
            title: "phonesplashscreen",
            type: "tall",
            release: "windowsphone8",
            scaleToMask: 480 / 300,
            sizes: [
            { width: 480, height: 800, scale: "100" },
            { width: 672, height: 1120, scale: "140" },
            { width: 1152, height: 1920, scale: "240" }]
        }];

    app.onactivated = function (args) {
        if (window.localStorage.settings) {
            _settings = JSON.parse(window.localStorage.settings);

            // bring forward previous versions
            if (_settings.exportAllScales) {
                _settings.exportWindows8Scales = true;
                _settings.exportWindowsPhoneScales = true;
                _settings.exportWindows10Scales = true;
                _settings.exportAllScales = null;
            }
        }

        args.setPromise(WinJS.UI.processAll().then(initUI));
    };

    app.oncheckpoint = function (args) {
        window.localStorage.settings = JSON.stringify(_settings);
    };

    function onMouseWheel(e) {
        e.pointerId = 1;
        downHandler(e);
    }

    function onGestureEnd(e) {
        var target = getManipulationElement(e.target);
        target.gestureObject.pointerType = null;
    }

    function initUI() {
        // init touch handlers
        document.getElementById("squareImage").addEventListener("MSGestureChange", touchHandler);
        document.getElementById("squareImage").addEventListener("pointerdown", downHandler);
        document.getElementById("squareImage").addEventListener("wheel", onMouseWheel, false);
        document.getElementById("squareImage").addEventListener("MSGestureEnd", onGestureEnd, false);
        document.getElementById("squareImage").addEventListener("dragstart", function (e) { e.preventDefault(); }, false);
        document.getElementById("wideImage").addEventListener("MSGestureChange", touchHandler);
        document.getElementById("wideImage").addEventListener("pointerdown", downHandler);
        document.getElementById("wideImage").addEventListener("wheel", onMouseWheel, false);
        document.getElementById("wideImage").addEventListener("MSGestureEnd", onGestureEnd, false);
        document.getElementById("wideImage").addEventListener("dragstart", function (e) { e.preventDefault(); }, false);

        // init Settings
        imagesSettings.winControl.onbeforeshow = function (e) {
            document.getElementById('imagesSettings').scrollTop = 0;
        }

        imagesSettings.winControl.onafterhide = function (e) {
            window.localStorage.settings = JSON.stringify(_settings);
        }

        toggleWindows10Scale.winControl.checked = _settings.exportWindows10Scales;
        toggleWindows8Scale.winControl.checked = _settings.exportWindows8Scales;
        toggleWindowsPhone8Scale.winControl.checked = _settings.exportWindowsPhoneScales

        toggleBackdrop.winControl.checked = _settings.exportBackdrop;
        toggleSmallLogo.winControl.checked = _settings.smallLogo;
        toggleLogo.winControl.checked = _settings.logo;
        toggleStoreLogo.winControl.checked = _settings.storeLogo;
        toggleBadgeLogo.winControl.checked = _settings.badgeLogo;
        toggleSplash.winControl.checked = _settings.splashScreen;
        toggleWideLogo.winControl.checked = _settings.wideLogo;
        toggleSmallTileLogo.winControl.checked = _settings.smallTileLogo;
        toggleLargeLogo.winControl.checked = _settings.largeLogo;
        toggleSquare44x44Logo.winControl.checked = _settings.square44x44logo;
        toggleSquare71x71Logo.winControl.checked = _settings.square71x71logo;
        togglePhoneSplashScreen.winControl.checked = _settings.phoneSplashScreen;

        toggleWindows10Scale.addEventListener("change", function (e) {
            _settings.exportWindows10Scales = e.currentTarget.winControl.checked;
        });
        toggleWindows8Scale.addEventListener("change", function (e) {
            _settings.exportWindows8Scales = e.currentTarget.winControl.checked;
        });
        toggleWindowsPhone8Scale.addEventListener("change", function (e) {
            _settings.exportWindowsPhoneScales = e.currentTarget.winControl.checked;
        });
        toggleBackdrop.addEventListener("change", function (e) {
            _settings.exportBackdrop = e.currentTarget.winControl.checked;
        });
        toggleSmallLogo.addEventListener("change", function (e) {
            _settings.smallLogo = e.currentTarget.winControl.checked;
        });
        toggleLogo.addEventListener("change", function (e) {
            _settings.logo = e.currentTarget.winControl.checked;
        });
        toggleStoreLogo.addEventListener("change", function (e) {
            _settings.storeLogo = e.currentTarget.winControl.checked;
        });
        toggleBadgeLogo.addEventListener("change", function (e) {
            _settings.badgeLogo = e.currentTarget.winControl.checked;
        });
        toggleSplash.addEventListener("change", function (e) {
            _settings.splashScreen = e.currentTarget.winControl.checked;
        });
        toggleWideLogo.addEventListener("change", function (e) {
            _settings.wideLogo = e.currentTarget.winControl.checked;
        });
        toggleSmallTileLogo.addEventListener("change", function (e) {
            _settings.smallTileLogo = e.currentTarget.winControl.checked;
        });
        toggleLargeLogo.addEventListener("change", function (e) {
            _settings.largeLogo = e.currentTarget.winControl.checked;
        });
        toggleSquare44x44Logo.addEventListener("change", function (e) {
            _settings.square44x44logo = e.currentTarget.winControl.checked;
        });
        toggleSquare71x71Logo.addEventListener("change", function (e) {
            _settings.square71x71logo = e.currentTarget.winControl.checked;
        });
        togglePhoneSplashScreen.addEventListener("change", function (e) {
            _settings.phoneSplashScreen = e.currentTarget.winControl.checked;
        });

        // init appbar
        document.getElementById("cmdOpen").addEventListener("click", pickSVG);
        document.getElementById("cmdExport").addEventListener("click", pickExportFolder);
        document.getElementById("cmdAutoSize").addEventListener("click", function () {
            zoomAndCenterImage(document.getElementById("squareImage"), document.getElementById("squareMask"));
            WinJS.UI.Animation.fadeIn(document.getElementById("squareImage"));
            zoomAndCenterImage(document.getElementById("wideImage"), document.getElementById("wideMask"));
            WinJS.UI.Animation.fadeIn(document.getElementById("wideImage"));
        });

        initColorPicker(_settings.canvasColor, colorChanged);
    }

    function pickExportFolder() {
        if (document.getElementById("cmdExport").winControl.disabled) {
            return;
        }

        // Create the picker object and set options
        var folderPicker = new Windows.Storage.Pickers.FolderPicker;
        folderPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.desktop;
        folderPicker.fileTypeFilter.replaceAll([".svg", ".jpg", ".png"]);

        folderPicker.pickSingleFolderAsync().then(function (folder) {
            if (folder) {
                folder.createFolderAsync(_folderName, Windows.Storage.CreationCollisionOption.generateUniqueName).then(function (newFolder) {
                    exportImages(newFolder, _imagePath);
                });
            } else {
            }
        });
    }

    function pickSVG() {
        // Create the picker object and set options
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.list;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.desktop;
        openPicker.fileTypeFilter.replaceAll([".svg"]);

        // Fade out the old image
        WinJS.UI.Animation.fadeOut([squareImage, wideImage]);

        // Open the picker for the user to pick a file
        openPicker.pickSingleFileAsync().then(addPickedImageToCanvas);
    }

    function addPickedImageToCanvas(file) {
        if (file) {

            _folderName = file.displayName;
            _imagePath = URL.createObjectURL(file);
            resetImageTransformations();

            squareImage.onload = function (e) {
                zoomAndCenterImage(e.currentTarget, squareMask);
                WinJS.UI.Animation.fadeIn(e.currentTarget);

            }
            wideImage.onload = function (e) {
                zoomAndCenterImage(e.currentTarget, wideMask);
                WinJS.UI.Animation.fadeIn(e.currentTarget);
            }

            wideImage.src = _imagePath;
            squareImage.src = _imagePath;

            var appbar = document.getElementById("commandsAppBar").winControl;
            cmdExport.winControl.disabled = '';
        } else {
            WinJS.UI.Animation.fadeIn([squareImage, wideImage]);
        }
    }

    function resetImageTransformations() {
        squareImage.translationX = 0;
        wideImage.translationX = 0;
        squareImage.translationY = 0;
        wideImage.translationY = 0;
        squareImage.scale = 1;
        wideImage.scale = 1;
        squareImage.style.transform = "";
        wideImage.style.transform = "";
    }

    function zoomAndCenterImage(image, elementToCenter) {
        var imagePosition = WinJS.Utilities.getPosition(image);
        var elementToCenterPosition = WinJS.Utilities.getPosition(elementToCenter);

        var widthScale = ((elementToCenterPosition.width - _imagePadding) / imagePosition.width);
        var heightScale = ((elementToCenterPosition.height - _imagePadding) / imagePosition.height);
        image.scale = widthScale < heightScale ? widthScale : heightScale;

        image.translationX = ((elementToCenterPosition.width / 2) + elementToCenterPosition.left) - ((imagePosition.width / 2) + imagePosition.left);
        image.translationY = ((elementToCenterPosition.height / 2) + elementToCenterPosition.top) - ((imagePosition.height / 2) + imagePosition.top);

        image.style.transform = "translate(" + image.translationX + "px," + image.translationY + "px)" + " scale(" + image.scale + ")";

    }

    function exportImages(exportFolder, imageToExport) {
        var saveProgress = document.getElementById("saveProgress");
        WinJS.Utilities.addClass(saveProgress, "showing");
        var promises = [];

        var img = new Image();   // Create new img element
        img.onload = function (e) {
            _manifestImages.forEach(function (manifestImage) {
                if (isSelected(manifestImage.title)) {
                    var sizesToExport = getSizesToExport(manifestImage.sizes);
                    sizesToExport.forEach(function (size) {
                        var promise = exportSize(e.currentTarget, exportFolder, manifestImage, size);
                        promises.push(promise);
                    });
                }
            });

        }; img.src = imageToExport;

        WinJS.Promise.join(promises).then(function () {
            setTimeout(function () {
                WinJS.Utilities.removeClass(saveProgress, "showing");
            }, 2000);
        });
    }

    function exportSize(img, exportFolder, manifestImage, size, retryForFloatingPoint) {
        var outScale = size.scale / 100 * manifestImage.scaleToMask;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = size.width;
        canvas.height = size.height;

        if (manifestImage.title === "storelogo" && _settings.exportBackdrop) {
            ctx.save();
            ctx.fillStyle = rgbToHex(_settings.canvasColor.r, _settings.canvasColor.g, _settings.canvasColor.b);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }

        var image;
        var mask;

        switch (manifestImage.type) {
            case "square":
                image = document.getElementById("squareImage");
                mask = document.getElementById("squareMask");
                break;
            case "wide":
                image = document.getElementById("wideImage");
                mask = document.getElementById("wideMask");
                break;
            case "tall":
                image = document.getElementById("squareImage");
                mask = document.getElementById("squareMask");
                break;
            default:
                throw "Unhandled image type";
                break;
        }

        var maskPos = WinJS.Utilities.getPosition(mask);
        var imagePos = WinJS.Utilities.getPosition(image);
        imagePos.top += image.translationY;
        imagePos.left += image.translationX;
        var coordinates = computeCoordinates(maskPos, imagePos, image.scale);

        // we dont have a mask for tall splash screen, so we use square
        if (manifestImage.type == "tall") {
            coordinates.dy += 150 / manifestImage.scaleToMask;
        }

        try {
            ctx.drawImage(img,
                coordinates.sx,
                coordinates.sy,
                coordinates.sWidth - (retryForFloatingPoint === true ? 1 : 0),
                coordinates.sHeight - (retryForFloatingPoint === true ? 1 : 0),
                (coordinates.dx * outScale),
                (coordinates.dy * outScale),
                (coordinates.dWidth * outScale),
                (coordinates.dHeight * outScale));


            var fileName = manifestImage.title;
            if (_settings.exportWindows10Scales || _settings.exportWindows8Scales || _settings.exportWindowsPhoneScales) {
                fileName = fileName + ".scale-" + size.scale + ".png";
            } else {
                fileName = fileName + ".png";
            }

            return exportFolder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.generateUniqueName).then(function (file) {
                return file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (stream) {
                    return writePngAsync(stream, ctx).then(function () {
                        stream.close();
                        ctx.fill();
                        ctx = null;
                        canvas = null;

                    });
                });
            });
        } catch (ex) {

            //shave a pixel to handle floating point sized SVGs
            if (ex.message === "IndexSizeError" && !retryForFloatingPoint) {
                return exportSize(img, exportFolder, manifestImage, size, true)
            } else {
                // invalid placement, do not save file
                // todo, non-modal error text
                debugger;
            }
        }
    }


    function computeCoordinates(maskPos, imagePos, scale) {
        var scaledHeight = imagePos.height * scale;
        var scaledWidth = imagePos.width * scale;
        var scaledLeft = imagePos.left + (imagePos.width - scaledWidth) / 2;
        var scaledTop = imagePos.top + (imagePos.height - scaledHeight) / 2;

        var sx = Math.max(0, Math.min(scaledWidth, maskPos.left - scaledLeft));
        var sy = Math.max(0, Math.min(scaledHeight, maskPos.top - scaledTop));
        var sWidth = scaledWidth - sx - Math.max(0, Math.min(scaledWidth - sx, (scaledLeft + scaledWidth) - (maskPos.left + maskPos.width)));
        var sHeight = scaledHeight - sy - Math.max(0, Math.min(scaledHeight - sy, (scaledTop + scaledHeight) - (maskPos.top + maskPos.height)));

        var dx = Math.max(0, Math.min(maskPos.width, scaledLeft - maskPos.left));
        var dy = Math.max(0, Math.min(maskPos.height, scaledTop - maskPos.top));
        var dWidth = Math.min(maskPos.width - dx, sWidth);
        var dHeight = Math.min(maskPos.height - dy, sHeight);


        sx /= scale;
        sy /= scale;
        sWidth /= scale;
        sHeight /= scale;

        var coordinates = { sx: sx, sy: sy, sWidth: sWidth, sHeight: sHeight, dx: dx, dy: dy, dWidth: dWidth, dHeight: dHeight };
        return coordinates;
    }

    // Writes to png file
    function writePngAsync(stream, context) {
        var inputStream = context.canvas.msToBlob().msDetachStream().getInputStreamAt(0);
        var outputStream = stream.getOutputStreamAt(0);
        return Windows.Storage.Streams.RandomAccessStream.copyAndCloseAsync(inputStream, outputStream);
    }

    function writeJpgAsync(stream, context) {
        var encoderId = Windows.Graphics.Imaging.BitmapEncoder.jpegEncoderId;
        return Windows.Graphics.Imaging.BitmapEncoder.createAsync(encoderId, stream).then(function (encoder) {
            var canvas = context.canvas;
            var outputPixelData = context.getImageData(0, 0, canvas.width, canvas.height);

            encoder.setPixelData(
                        Windows.Graphics.Imaging.BitmapPixelFormat.bgra8,
                        Windows.Graphics.Imaging.BitmapAlphaMode.straight,
                        canvas.width,
                        canvas.height,
                        96, // Horizontal DPI
                        96, // Vertical DPI
                        outputPixelData.data);

            // Return Promise
            return encoder.flushAsync().then(function () {
                stream.close();
            });
        });
    }

    function getManipulationElement(element) {
        var retValue = element;
        while (!WinJS.Utilities.hasClass(retValue, "ManipulationElement")) {
            retValue = retValue.parentNode;
        }

        // Now that we found the correct element, ensure that it has 
        // been initialized.
        if (retValue.scale === null || typeof retValue.scale === "undefined") {
            retValue.scale = 1;
        }
        if (retValue.translationX === null || typeof retValue.translationX === "undefined") {
            retValue.translationX = 0;
        }
        if (retValue.translationY === null || typeof retValue.translationY === "undefined") {
            retValue.translationY = 0;
        }

        if (retValue.gestureObject === null || typeof retValue.gestureObject === "undefined") {
            retValue.gestureObject = new MSGesture();
            retValue.gestureObject.target = retValue;
        }
        return retValue;
    };


    function touchHandler(eventObject) {
        var target = getManipulationElement(eventObject.target);
        target.translationX += eventObject.translationX * target.scale;
        target.translationY += eventObject.translationY * target.scale;
        target.scale *= eventObject.scale;
        target.style.transform = "translate(" + target.translationX + "px," + target.translationY + "px) scale(" + target.scale + ")";


        // draft snapping code
        //var image = document.getElementById("squareImage");
        //var mask = document.getElementById("squareMask");
        //var maskPos = WinJS.Utilities.getPosition(mask);
        //var imagePos = WinJS.Utilities.getPosition(image);
        //imagePos.top += image.translationY;
        //imagePos.left += image.translationX;

        //var sqareSpew = document.getElementById("sqareSpew");
        //sqareSpew.innerText = Math.round(imagePos.top) + " x " + Math.round(imagePos.left);

        //var transX = eventObject.translationX;
        //var transY = eventObject.translationY;
        //if ((Math.abs((imagePos.left + imagePos.width / 2) - (maskPos.left + maskPos.width / 2)) < 10) && Math.abs(transX) < 2) {
        //    transX = 0;
        //}
        //if (Math.abs((imagePos.top + imagePos.height / 2) - (maskPos.top + maskPos.height / 2)) < 1) {
        //    transY = 0;
        //}


        //var target = getManipulationElement(eventObject.target);
        //target.translationX += transX * target.scale;
        //target.translationY += transY * target.scale;
        //target.scale *= eventObject.scale;
        //target.style.transform = "translate(" + target.translationX + "px," + target.translationY + "px) scale(" + target.scale + ")";
    }

    // Function is responsible for associating contacts with a gesture object.
    function downHandler(eventObject) {
        var target = getManipulationElement(eventObject.target);
        target.gestureObject.addPointer(eventObject.pointerId);
        target.gestureObject.pointerType = eventObject.pointerType;
    }

    function colorChanged(e) {
        _settings.canvasColor = e;
        var colorString = "rgb(" + e.r + "," + e.g + "," + e.b + ")";
        var squareMask = document.getElementById("squareMask");
        var wideMask = document.getElementById("wideMask");
        squareMask.style.backgroundColor = colorString;
        wideMask.style.backgroundColor = colorString;
    }

    function getSizesToExport(sizes) {
        var sizesToExport = [];
        if (!sizes || !sizes.length) {
            sizesToExport = sizesToExport;
        } else {
            for (var i = 0; i < sizes.length; i++) {
                if (_manifestScaleReleaseMap[sizes[i].scale] === "all") {
                    sizesToExport.push(sizes[i]);
                } else if (_settings.exportWindows8Scales &&
                    _manifestScaleReleaseMap[sizes[i].scale] === "windows8") {
                    sizesToExport.push(sizes[i]);
                } else if (_settings.exportWindowsPhone8Scales &&
                    _manifestScaleReleaseMap[sizes[i].scale] === "windowsphone8") {
                    sizesToExport.push(sizes[i]);
                } else if (_settings.exportWindows10Scales &&
                    _manifestScaleReleaseMap[sizes[i].scale] === "windows10") {
                    sizesToExport.push(sizes[i]);
                }
            }
        }
        return sizesToExport;
    }

    function isSelected(image) {
        var value = false;
        switch (image) {
            case "smalllogo":
                value = _settings.smallLogo;
                break;
            case "storelogo":
                value = _settings.storeLogo;
                break;
            case "logo":
                value = _settings.logo;
                break;
            case "badgelogo":
                value = _settings.badgeLogo;
                break;
            case "widelogo":
                value = _settings.wideLogo;
                break;
            case "splashscreen":
                value = _settings.splashScreen;
                break;
            case "smalltilelogo":
                value = _settings.smallTileLogo;
                break;
            case "largelogo":
                value = _settings.largeLogo;
                break;
            case "square44x44logo":
                value = _settings.square44x44logo;
                break;
            case "square71x71logo":
                value = _settings.square71x71logo;
                break;
            case "phonesplashscreen":
                value = _settings.phoneSplashScreen;
                break;
            default:
                break;
        }

        return value;
    }

    // ****************** //
    // ** Color Picker ** //
    // ****************** //


    function initColorPicker(startColor, colorChanged) {
        var container = document.querySelector(".colorPicker"),
            canvas = document.querySelector(".colorPicker canvas"),
            wrapper = document.querySelector(".colorPicker .colorWrapper"),
            indicator = document.querySelector(".colorPicker .colorIndicator"),
            darkImage = document.querySelector(".colorPicker img.dark"),
            lightImage = document.querySelector(".colorPicker img.light"),
            brightnessSelector = document.querySelector(".colorPicker input"),
            pointer,
            currentColor,
            currentCoordinates;

        function brightnessChange(e) {
            var opacity = e.target.value / 100;
            darkImage.style.opacity = opacity;
            setColorFromPoint(currentCoordinates);
        }

        function setColorFromPoint(coordinates) {
            var opacity = darkImage.style.opacity;
            var data = canvas.getContext("2d").getImageData(coordinates.x, coordinates.y, 1, 1).data;
            var r = Math.round(data[0] * (1 - opacity));
            var g = Math.round(data[1] * (1 - opacity));
            var b = Math.round(data[2] * (1 - opacity));
            updateColor({ r: r, g: g, b: b });
            updateCoordinates({ x: coordinates.x, y: coordinates.y });
        }

        function updateColor(rgb) {
            var r = rgb.r;
            var g = rgb.g;
            var b = rgb.b;
            currentColor = { r: r, g: g, b: b };
            indicator.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
            document.getElementById("hexColor").innerText = rgbToHex(rgb.r, rgb.g, rgb.b);

            colorChanged(currentColor);
        }

        function updateCoordinates(coordinates) {
            indicator.style.left = (coordinates.x - 7) + "px";
            indicator.style.top = (coordinates.y - 7) + "px";
            currentCoordinates = { x: coordinates.x, y: coordinates.y };
        }

        function onHexColorChange() {
            var hexColorResult = document.getElementById("hexColor").value;
            var currentColor = hexToRgb(hexColorResult);

            if (currentColor) {
                setColor(currentColor);
            }
        }

        function setColor(rgb) {
            var r = rgb.r / 255;
            var g = rgb.g / 255;
            var b = rgb.b / 255;
            var maxRGB = Math.max(r, g, b);
            var minRGB = Math.min(r, g, b);

            var brightness = maxRGB;

            brightnessSelector.value = Math.round((1 - brightness) * 100);
            darkImage.style.opacity = brightnessSelector.value / 100;
            updateColor(rgb);

            if (maxRGB === minRGB) { // black-gray-white are at the bottom
                updateCoordinates({ x: 255, y: 255 });
            } else { // Colors other than black-gray-white:
                var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
                var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
                var hue = 60 * (h - d / (maxRGB - minRGB));
                var saturation = (maxRGB - minRGB) / maxRGB;
                updateCoordinates({ x: 255 * hue / 360, y: 255 * (1 - saturation) });
            }

            document.getElementById("hexColor").innerText = rgbToHex(rgb.r, rgb.g, rgb.b);

        }

        canvas.width = 256;
        canvas.height = 256;
        var context = canvas.getContext("2d");
        context.drawImage(lightImage, 0, 0, 256, 256);
        container.onclick = function (e) {
            e.stopPropagation();
        };
        darkImage.onpointerdown = function (e) {
            e.preventDefault(); // prevent native drag/drop
        };

        document.getElementById("hexColorRegion").addEventListener("submit", onHexColorChange);
        document.getElementById("hexColor").addEventListener("blur", onHexColorChange);

        // Pointer event handlers
        wrapper.onclick = function (e) {
            e.stopPropagation();
            if (e.target.className != "colorIndicator") {
                setColorFromPoint({ x: e.offsetX, y: e.offsetY });
            }
        };
        wrapper.onpointerdown = function (e) {
            e.stopPropagation();
            if (e.isPrimary) {
                //if (pointer) {
                //    // crap previous pointer missed up event
                //    // reset it it.
                //    try {
                //        wrapper.releasePointerCapture(pointer)
                //    } catch (err) {
                //        // swallow and forget this finger
                //    }
                //}

                try {
                    wrapper.setPointerCapture(e.pointerId);
                    if (e.target.className != "colorIndicator") {
                        setColorFromPoint({ x: e.offsetX, y: e.offsetY });
                    }
                } catch (err) {
                    // swallow and forget this finger
                    return;
                }
                pointer = e.pointerId;
            }
        }
        wrapper.onpointermove = function (e) {
            var x, y;
            if (e.pointerType === 'touch' || e.currentPoint.isInContact) {
                var wrapperPosition = WinJS.Utilities.getPosition(darkImage);
                x = e.clientX - wrapperPosition.left;
                y = e.clientY - wrapperPosition.top;

                if (x > 255) {
                    x = 255;
                } else if (x < 0) {
                    x = 0
                }

                if (y > 255) {
                    y = 255;
                } else if (y < 0) {
                    y = 0;
                }

                setColorFromPoint({ x: x, y: y });
                e.stopPropagation();
            }
        };
        function cancel(e) {
            if (e.pointerId === pointer) {
                try {
                    wrapper.releasePointerCapture(pointer.pointerId)
                } catch (err) {
                    // swallow and forget this finger
                }
                pointer = null;
            }
        };
        wrapper.onpointerup = cancel;
        wrapper.onpointercancel = cancel;
        wrapper.onpointerleave = cancel;
        brightnessSelector.onchange = brightnessChange;

        // Default color
        setColor(startColor);


    }



    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    var helpAndTipsArray = [
    { id: 0 , type: "item", title: "Step 1", subtitle: "Choose an SVG to scale", picture: "/images/tip1-still.png", video: "/images/tip1.gif"},
    { id: 1, type: "item", title: "Step 2", subtitle: "Position your image", picture: "/images/tip2-still.png", video: "/images/tip2.gif" },
    { id: 2, type: "item", title: "Step 3", subtitle: "Preview different colors", picture: "/images/tip3-still.png", video: "/images/tip3.gif"},
    { id: 3, type: "item", title: "Step 4", subtitle: "Choose export image sizes", picture: "/images/tip4-still.png", video: "/images/tip4.gif" },
    { id: 4, type: "item", title: "Step 5", subtitle: "Export your images to a folder", picture: "/images/tip5-still.png", video: "/images/tip5.gif" }
    ];
    var bindingList = new WinJS.Binding.List(helpAndTipsArray);

    WinJS.Namespace.define("HelpAndTips", {
        bindingList: bindingList,
        array: helpAndTipsArray
    });

    app.start();
})();
