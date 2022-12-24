// matriz = [];
// function setCookie(cname,cvalue,exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname, confir) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     if (confir)
//         alert("Ausente");
//     return "";
// }

// function escreverCookie(nomeUser) {
//     var usuario = nomeUser;
//     var pontuacao = 0;
//     var matrizCookie = getCookie("ranking", false);
//     if(matrizCookie){
//         matriz = JSON.parse(matrizCookie);
//         if(matriz){
//             for (var i = 0; i < matriz.length; i++) {
//                 if(matriz[i][0] == usuario && pontuacao > matriz[i][1]){
//                     matriz.splice(i,1);
//                     verifUser = true;
//                 }
//                 else if(matriz[i][0] == usuario && (pontuacao <= matriz[i][1] || pontuacao == null || pontuacao == undefined)){
//                     verifUser = false;
//                 }
//             }
//         }
//     }
//     function ordenaMatriz() {
//         for(var i = 0; i < matriz.length - 1; i++){
//             for (var i2 = i + 1; i2 < matriz.length; i2++) {
//                 if (matriz[i][1] < matriz[i2][1]){
//                     ordMatrizA = matriz[i];
//                     ordMatrizB = matriz[i2];
//                     matriz.splice(i,1,ordMatrizB);
//                     matriz.splice(i2,1,ordMatrizA);
//                 }
//             }
//         }
//     }
//     if (verifUser) {
//         matriz.push([usuario, parseInt(pontuacao)]);
//         ordenaMatriz()
//     }
//     user = JSON.stringify(matriz);
//     setCookie("ranking", user, 0.1);
// }
// function criarRanking10(nomeUser){
//     tabelaRank = document.getElementById('tabelaRank');
    
//     if(tabelaRank != null && tabelaRank != undefined)
//         tabelaRank.remove();
    
//     tabelaRank =  '<button onclick="criarRanking10()" style="width: 100%">Atualizar</button><table border="1" id="tabelaRank" style="width: 100%;"><tr><td>Posi.</td><td>Usuario</td><td>Pontos</td></tr>';
//     var matrizCookie = getCookie("ranking", false);
//     if(matrizCookie){
//         matriz = JSON.parse(matrizCookie);
//         if(matriz){
//         for (var i = 0; i < matriz.length; i++) {
//             tabelaRank += '<tr><td>' + (i+1) + '</td>';
//             linha = matriz[i];
//             for (var i2 = 0; i2 < linha.length; i2++) {
//                 tabelaRank += '<td>' + matriz[i][i2] + '</td>';
//             }
//             tabelaRank += '</tr>'
//         }
//     tabelaRank += '</table>';
//     document.body.innerHTML = tabelaRank;
// }
// function buscarPosicao(nomeUser){
//     var userAtual = ['null', 'null', 'null'];
//     var matrizCookie = getCookie("ranking", false);
//     if(matrizCookie){
//         matriz = JSON.parse(matrizCookie);
//         if(matriz){
//             for (var i = 0; i < matriz.length; i++) {
//                 if(matriz[i][0] == usuario){
//                     userAtual = [i, matriz[i][0], matriz[i][1]];
//                 }
//             }
//         }
//     }
//     tabelaRankA =  '<button onclick="criarRanking10()" style="width: 100%">Atualizar</button><table border="1" id="tabelaRank" style="width: 100%;"><tr><td>Posi.</td><td>Usuario</td><td>Pontos</td></tr>';
//     tabelaRankA += '<tr><td>' + userAtual[0] + '</td><td>' + userAtual[1] + '</td><td>' + userAtual[2] + '</td></tr>'
//     document.body.innerHTML = tabelaRankA;
// }