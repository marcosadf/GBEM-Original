matriz = [];
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "; Set-Cookie: flavor=choco; SameSite=None; Secure; path=/";
}

function getCookie(cname, confir) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            if(confir)
                alert(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    if (confir)
        alert("Ausente");
    return "";
}
var userAtual = "";
function buscarPosicao(){
    userAtual = getCookie("usuario", false);
    // alert(userAtual);
    matrizCookie = getCookie("ranking", false);
    if(matrizCookie){
        matriz = JSON.parse(matrizCookie);
        if(matriz){
            for (var i = 0; i < matriz.length; i++) {
                if(matriz[i][0] == userAtual){
                    userAtualx = [i + 1, matriz[i][0], matriz[i][1]];
                }
            }
            tabelaRankA =  '<button onclick="buscarPosicao()" style="width: 100%">Atualizar</button><table border="1" id="tabelaRank" style="width: 100%;"><tr><td style="text-align: center;">Posi.</td><td style="text-align: center;">Usuario</td><td style="text-align: center;">Pontos</td></tr>';
            tabelaRankA += '<tr><td style="text-align: center;">' + userAtualx[0] + '</td><td style="text-align: center;">' + userAtualx[1] + '</td><td style="text-align: center;">' + userAtualx[2] + '</td></tr>';
            document.body.innerHTML = tabelaRankA;
        }
    }
}