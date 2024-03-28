
<!DOCTYPE HTML>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Intranet</title>

    <link rel="stylesheet" href="./_content/_css/stylesadmin.css">
    <link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.min.css">

</head>

<body style="background-color: azul">
    <div id="topbar">

    </div>


    <div class="container">
        <div id="sideBar" data-margen="oculto">

        </div>
        <div class="workspace">
           <main id="app">
           <div class="ctn_configimages" id="configImages">
                <div class="titleDiv">
                    <span>Cargar imagenes</span>
                </div>
                <div class="ctn_uploadimages">
                    <div class="ctn_uploadimages_btn">
                        <button id="btn_addimage">Añadir imagenes</button>
                    </div>
                     <div id="areaimages" class="areaimages">
                       
                    </div>
                </div>
            </div>


           </main>
        </div>

    </div>
    <input type="hidden" name="cpUser" id="cpUser" value="<?php echo $_SESSION['usuario']; ?>">
    <input type="hidden" name="cpCenter" id="cpCenter" value="<?php echo $_SESSION['centroid']; ?>">


    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/client/app.js"></script>



</body>

</html>