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
function criarRanking10(){
    tabelaRank = document.getElementById('tabelaRank');
    matriz = [];
    var matrizCookie = getCookie("ranking", false);
    var nomeUser = getCookie("usuario", false);
    // alert(matrizCookie);
    if(matrizCookie){
        matriz = JSON.parse(matrizCookie);
        // alert(matriz);
        if(matriz){
            if(tabelaRank != null && tabelaRank != undefined)
                tabelaRank.remove();
            tabelaRank =  '<button onclick="criarRanking10()" style="width: 100%">Atualizar</button><table border="1" id="tabelaRank" style="width: 100%;"><tr><td>Posi.</td><td>Usuario</td><td>Pontos</td></tr>';
            for (var i = 0; i < matriz.length; i++) {
                if(nomeUser != matriz[i][0])
                    tabelaRank += '<tr><td style="text-align: center;">' + (i+1) + '</td>';
                else{
                    tabelaRank += '<tr style="background-color: rgb(200,50,50);" ><td style="text-align: center;">' + (i+1) + '</td>';
                }
                    linha = matriz[i];
                for (var i2 = 0; i2 < linha.length; i2++) {
                    tabelaRank += '<td style="text-align: center;">' + linha[i2] + '</td>';
                }
                tabelaRank += '</tr>'
            }
            tabelaRank += '</table>';
            document.body.innerHTML = tabelaRank;
        }
    }
}