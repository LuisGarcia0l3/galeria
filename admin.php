
<!DOCTYPE HTML>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Intranet</title>

    <link rel="stylesheet" href="./_content/_css/stylesadmin.css">
    <link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css">
</head>

<body>
    <div id="topbar">

    </div>


    <div class="container">
        <div id="sideBar" data-margen="oculto">

        </div>
        <div class="workspace">
            <main id="app"></main>
            
        </div>

    </div>
    <input type="hidden" name="cpUser" id="cpUser" value="<?php echo $_SESSION['usuario']; ?>">
    <input type="hidden" name="cpCenter" id="cpCenter" value="<?php echo $_SESSION['centroid']; ?>">

    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/admin/Modal.js"></script>
    <script src="./_content/_js/admin/Notify.js"></script>
    <script src="./_content/_js/admin/CreateGallery.js"></script>
    <script src="./_content/_js/admin/ImageUploader.js"></script>
    <script src="./_content/_js/admin/app.js"></script>


    


</body>

</html>