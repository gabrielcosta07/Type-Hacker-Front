<?php
    $json_das_palavras = file_get_contents("palavras.json");
    $lista_de_palavras_php = json_decode($json_das_palavras);
    $tamanho_inicial_fonte = 20;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Zero-day</title>
    <link rel="stylesheet" href="Corpo Css Jogo.css">
</head>
<body>

    <h1 id="palavraAnimada"
        data-velocidade="2"
        style="font-size: <?php echo $tamanho_inicial_fonte; ?>px;">
    </h1>

    <div class="container-input">
        <input type="text" id="campoControle" placeholder="Quebre o Codigo!" autofocus>
    </div>

    <script>
        const listaDePalavras = <?php echo json_encode($lista_de_palavras_php); ?>;
    </script>
    <script src="Corpo Javascript.js" defer></script>

</body>
</html>
