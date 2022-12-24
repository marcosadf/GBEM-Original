//--------------------------------------------------------------------------------------------------------------------------------
window.onload = function(){
//Defini as Configurações Principais--------------------------------------------------------------------------------------------------------------------------------
	config = {
		audio: false,
		direcaoInic: 2,
		vivoInic: true,
		larguraInic: 500,
		alturaInic: 500,
		nQuadrados: 40,
		restar: false,
		FPS: 10
	}
//Define as Principais Variaveis--------------------------------------------------------------------------------------------------------------------------------
	var largura = parseInt(config.larguraInic / config.nQuadrados) * config.nQuadrados;
	var altura = parseInt(config.alturaInic / config.nQuadrados) * config.nQuadrados;
	
	var fecharTutorial = true;
	var confirLoading = false;

	var telaCheia = false;
		
	var FPS = config.FPS;
	
	var cresceBarra = 0;
	var valorBarra = 0;

	var direcao = config.direcaoInic;
	var ultimaDirecao = direcao;
	var jogando = false;
	var vivo = true;
	var reiniciar = false;
	
	var resultadosEquacao = [[,],[,],[,]];
	var auxiliaBuraco = false;
	var movimentoBuraco = false;
	var contador = 1;
	var paraLevel2 = 50;
	var paraLevel3 = 130;
	var paraLevel4 = 200;
	var auxiliaLevel = 1;
	var verificaEntrada = false;
	var level = 1;

	var auxiliaInicio = true;
	var auxiliaErro = true;

	var tamQuadrado = Math.max(Math.floor(largura/config.nQuadrados),Math.floor(altura/config.nQuadrados));

	var xFruta = -1;
	var yFruta = -1;
	var xBonus = -1;
	var yBonus = -1;
	var pontos = 0;
	var valorBonus = 10;
	var auxiliaAuxBonus = false;

	var cobra = [[parseInt((largura/tamQuadrado) * 0.1) + 3, parseInt((altura/tamQuadrado) * 0.1), 2],
		[parseInt((largura/tamQuadrado) * 0.1) + 2, parseInt((altura/tamQuadrado) * 0.1), 2],
		[parseInt((largura/tamQuadrado) * 0.1) + 1, parseInt((altura/tamQuadrado) * 0.1), 2],
		[parseInt((largura/tamQuadrado) * 0.1), parseInt((altura/tamQuadrado) * 0.1), 2]
	];
	var novaCobra = [];

	var telaQuestao = false;
	var verif1 = true;
	var verif2 = true;
	var verif3 = true;
	var verif4 = true;

	var rotacaoC = Math.PI / 180;
	var K = true;
	var auxiliaTecla = true;

	var auxiliaInserirUser = false;
	var auxiliaInserirUserX = false;
	var inseriPri = false;

	var cabecaImg = new Image();
	cabecaImg.src = "imagens/sprites/cinzaCabeca.png";
	var corpoImg1 = new Image();
	corpoImg1.src = "imagens/sprites/cinzaCorpo1.png";
	var corpoImg2 = new Image();
	corpoImg2.src = "imagens/sprites/cinzaCorpo2.png";

	var macaImg = new Image();
	macaImg.src = "imagens/fruta.png";
	var bonusImg = new Image();
	bonusImg.src = "imagens/bonus1.png";

	var bordaHC = new Image();
	bordaHC.src = "imagens/pedrasH.png";
	var bordaHB = new Image();
	bordaHB.src = "imagens/pedrasH.png";
	var bordaVE = new Image();
	bordaVE.src = "imagens/pedrasV.png";
	var bordaVD = new Image();
	bordaVD.src = "imagens/pedrasV.png";

	var tutorial = new Image();
	tutorial.src = "imagens/tutorial.png";

	var fundo = new Image();
	fundo.src = "imagens/fundo1.png";

	var canvas = document.getElementById('canvas');
	canvas.width = largura;
	canvas.height = altura;

	var ctx = canvas.getContext('2d');
	
	var divGame = document.getElementById('baseGame');
	divGame.style.width = largura * 1.56 +"px";
	divGame.style.height = altura * 1.1 + "px"; 
	divGame.style.backgroundColor = "#ccc";
	divGame.style.border = "solid "+1+"px #000"

	var tabelaGame = document.getElementById('painelGame');
	tabelaGame.style.border = "none";

	var trMenu = document.getElementById('trMenu');
	trMenu.width = largura * 1.5 + 'px';

	for (var i = 1; i < 6; i++) {
		var tdMenu = document.getElementById('tdMenu'+ i +'');
		tdMenu.width = largura / 5 +'px';
	}
	for (var i = 1; i < 6; i++) {
		botao = document.getElementById('botao'+ i +'');
		botao.style.fontSize = largura / 40 + 'px';
		botao.style.width = '100%';
		botao.style.height = '100%';
	}

	var tituloRank = document.getElementById('tituloRank');
	tituloRank.style.fontFamily = "Impact";
	tituloRank.style.fontSize =  ""+ largura / config.nQuadrados * 2 +"px",
	tituloRank.style.textAlign = "center";
	tituloRank.width = largura / 2 + "px";
	
	var painelRank = document.getElementById('painelRank');
	painelRank.width = largura / 2 + 'px';
	painelRank.height = altura + 'px';

	var telaGame = document.getElementById('telaGame');
	telaGame.width = largura + "px";
	telaGame.height = altura + "px";

	var posicaoAtual = document.getElementById('posicaoAtual');
	posicaoAtual.height = altura/3 + "px";
	var posicaoTop = document.getElementById('posicaoTop');
	posicaoTop.height = altura / 3 * 2 + "px";

//Restaura o Valor das Principais Variaveis Para Um Novo Jogo--------------------------------------------------------------------------------------------------------------------------------
	this.reset = function(){
		direcao = config.direcaoInic;
		ultimaDirecao = direcao;
		jogando = false;
		vivo = true;
		reiniciar = false;
		
		resultadosEquacao = [[,],[,],[,]];

		auxiliaBuraco = false;
		movimentoBuraco = false;
		contador = 1;
		auxiliaLevel = 1;
		verificaEntrada = false;
		level = 1;

		auxiliaInicio = true;
		auxiliaErro = true;

		tamQuadrado = Math.max(Math.floor(largura/config.nQuadrados),Math.floor(altura/config.nQuadrados));

		xFruta = -1;
		yFruta = -1;
		xBonus = -1;
		yBonus = -1;
		pontos = 0;
		valorBonus = 10;
		auxiliaAuxBonus = false;

		cobra = [[parseInt((largura/tamQuadrado) * 0.1) + 3, parseInt((altura/tamQuadrado) * 0.1), 2],
			[parseInt((largura/tamQuadrado) * 0.1) + 2, parseInt((altura/tamQuadrado) * 0.1), 2],
			[parseInt((largura/tamQuadrado) * 0.1) + 1, parseInt((altura/tamQuadrado) * 0.1), 2],
			[parseInt((largura/tamQuadrado) * 0.1), parseInt((altura/tamQuadrado) * 0.1), 2]
		];
		novaCobra = [];

		telaQuestao = false;
		verif1 = true;
		verif2 = true;
		verif3 = true;
		verif4 = true;

		rotacaoC = Math.PI / 180;
		K = true;
		auxiliaTecla = true;

		cabecaImg = new Image();
		cabecaImg.src = "imagens/sprites/cinzaCabeca.png";
		corpoImg1 = new Image();
		corpoImg1.src = "imagens/sprites/cinzaCorpo1.png";
		corpoImg2 = new Image();
		corpoImg2.src = "imagens/sprites/cinzaCorpo2.png";

		macaImg = new Image();
		macaImg.src = "imagens/fruta.png";
		bonusImg = new Image();
		bonusImg.src = "imagens/bonus1.png";

		bordaHC = new Image();
		bordaHC.src = "imagens/pedrasH.png";
		bordaHB = new Image();
		bordaHB.src = "imagens/pedrasH.png";
		bordaVE = new Image();
		bordaVE.src = "imagens/pedrasV.png";
		bordaVD = new Image();
		bordaVD.src = "imagens/pedrasV.png";

		tutorial = new Image();
		tutorial.src = "imagens/tutorial.png";

		fundo = new Image();
		fundo.src = "imagens/fundo1.png";
	}
//Gerencia audio--------------------------------------------------------------------------------------------------------------------------------
    this.mudo = function(){
		if(config.audio){
			audio.pause();
			config.audio = false;
		}else{
			audio.play();
			config.audio = true;
		}
    }
//Gerencia ranking--------------------------------------------------------------------------------------------------------------------------------
	var matriz = [];
	this.setCookie = function(cname,cvalue,exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + "; Set-Cookie: flavor=choco; SameSite=None; Secure; path=/";
	    // alert(cname,cvalue,exdays);
	}

	this.getCookie = function(cname, confir) {
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
	this.escreverCookie = function(nomeUser) {
	    var usuario = nomeUser;
	    var pontuacao = pontos;
	    var matrizCookie = getCookie("ranking", false);
	    var verifUserX = true;
	    var verifUser = true;
	    var matriz = [];
	    if(matrizCookie){
        	matriz = JSON.parse(matrizCookie);
	    }
        for (var i = 0; i < matriz.length; i++) {
            if(matriz[i][0] == usuario && pontuacao > matriz[i][1]){
                matriz.splice(i,1);
                verifUserX = false;
                verifUser = true;
            }
            else if(matriz[i][0] == usuario && (pontuacao <= matriz[i][1] || pontuacao == null || pontuacao == undefined)){
                verifUserX = false;
                verifUser = false;
            }
            else if(verifUserX){
            	verifUser = true;
            }
        }

	    this.setCookie("usuario", nomeUser, 100000);
	    ordenaMatriz = function(matriz) {
	        for(var i = 0; i < matriz.length - 1; i++){
	            for (var i2 = i + 1; i2 < matriz.length; i2++) {
	                if (matriz[i][1] < matriz[i2][1]){
	                    ordMatrizA = matriz[i];
	                    ordMatrizB = matriz[i2];
	                    matriz.splice(i,1,ordMatrizB);
	                    matriz.splice(i2,1,ordMatrizA);
	                }
	            }
	        }
	        return matriz;
	    }
	    if (verifUser) {
	        matriz.push([usuario, pontuacao]);
	        matriz = ordenaMatriz(matriz)
	        novaMatriz = JSON.stringify(matriz);
	        this.setCookie("ranking", novaMatriz, 100000);
	    }
	}
//Abre selecao de usuario--------------------------------------------------------------------------------------------------------------------------------
	this.inserirUsuario = function(){
		divUser = document.getElementById('divUser');
		if(auxiliaInserirUserX){
			inputUser = document.getElementById('inputUser').value;
			do{
				divUser.parentNode.removeChild( divUser );
			}while(document.getElementById('divUser'))
			auxiliaInserirUserX = false;
			if(inputUser != "" && inputUser != null && inputUser != undefined){
				nomeUser = inputUser;
				inseriPri = true;
				if(!confirLoading){
					auxiliaInserirUser = true;
					escreverCookie(nomeUser);
					loading();
				}
				if(jogando){
					var jogando = "pause";
				}
			}
		}else{
			auxiliaInserirUserX = true;
			var tamUserDivL = largura / 2;
			var tamUserDivA = largura / 4;
			var coordUseX = largura / 2 + canvas.getBoundingClientRect().left - tamUserDivL / 2;
			var coordUseY = altura * 0.45;

			divUser = document.createElement('div');
			divUser.id = "divUser";
			divUser.style.left = coordUseX + "px";
			divUser.style.top = coordUseY + "px";
			divUser.style.border = "solid 1px";
			divUser.style.backgroundColor = "rgb(150,150,150)";
			divUser.style.width = tamUserDivL + "px";
			divUser.style.height = tamUserDivA + "px";
			divUser.style.position = "absolute";

			textoP = document.createElement('p');
			textoP.style.textAlign = "center";
			textoP.style.fontFamily = "Impact";
			textoP.style.fontSize = "20px";

			pTexto = document.createTextNode("Seu usuario:");

			textoP.appendChild(pTexto); 

			inputUser = document.createElement('input');
			inputUser.type = "text";
			inputUser.id = "inputUser";
			inputUser.onkeyup = "limitarInput(this);";
			inputUser.style.marginLeft = "2%";

			var maxlength = document.createAttribute('maxlength');
		    maxlength.value = "6";
		    inputUser.setAttributeNode(maxlength);

		    var onkeypress = document.createAttribute('onkeypress');
		    onkeypress.value = "if ((window.event?event.keyCode:event.which) == 13) {inserirUsuario();}"
		    inputUser.setAttributeNode(onkeypress);

			botUser = document.createElement('input');
			botUser.type = "submit";
			botUser.value = "Enviar";

			divUser.appendChild(textoP);
			divUser.appendChild(inputUser);
			divUser.appendChild(botUser);
			document.body.appendChild(divUser);
			
			botUser.addEventListener('click',inserirUsuario);
		}
	}
	this.inserirUsuario();
//Ajustar Tamanho da Tela--------------------------------------------------------------------------------------------------------------------------------
	this.TelaCheia = function(){
		if (telaCheia == true){
			telaCheia = false;
			document.getElementById('body').scrolling = "yes";
		}else{
			telaCheia = true;
			document.getElementById('body').scrolling = "no";
		}
		this.ajustarCanvas(telaCheia);
	}
	this.ajustarCanvas = function(telaCheia){
		if(!telaCheia){
			largura = parseInt(config.larguraInic / config.nQuadrados) * config.nQuadrados;
			altura = parseInt(config.alturaInic / config.nQuadrados) * config.nQuadrados;	
			canvas.width = largura;
			canvas.height = altura;
			tamQuadrado = Math.max(Math.floor(largura/config.nQuadrados),Math.floor(altura/config.nQuadrados));
			divGame.style.position = "relative";
			divGame.style.margin = "0px 0px 0px 0px";
			divGame.style.width = largura * 1.57 +"px";
			divGame.style.height = altura * 1.12 + "px";
			tabelaGame.style.position = "absolute";
			tabelaGame.style.left= "0%";
			tabelaGame.style.marginLeft = "0px";
			tabelaGame.style.top = "0%";
			tabelaGame.style.marginTop = "0px";
		}
		else if(telaCheia){
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight; //O "10" serve para ajuste tecnico para evitar a barra de rolagem.
			if(WIDTH >= HEIGHT){
				canvas.width = parseInt(HEIGHT * 0.95 / config.nQuadrados) * config.nQuadrados;
				canvas.height = parseInt(HEIGHT * 0.95 / config.nQuadrados) * config.nQuadrados;
				porCenTelaAment = ((parseInt(HEIGHT / config.nQuadrados) * config.nQuadrados) * 100) / altura;
				cresceBarra = cresceBarra * (porCenTelaAment / 100);
				largura = parseInt(HEIGHT * 0.95 / config.nQuadrados) * config.nQuadrados;
				altura = parseInt(HEIGHT * 0.95 / config.nQuadrados) * config.nQuadrados;
				tamQuadrado = Math.max(Math.floor(largura/config.nQuadrados),Math.floor(altura/config.nQuadrados));
				tabelaGame.style.marginLeft = (WIDTH / 2) - (largura * 1.6 / 2) + "px";
				telaGame.style.marginTop = "100px";
				tabelaGame.style.top = "1%";
			}else if(WIDTH <= HEIGHT){
				canvas.width = parseInt(WIDTH / config.nQuadrados) * config.nQuadrados;
				canvas.height = parseInt(WIDTH / config.nQuadrados) * config.nQuadrados;
				porCenTelaAment = ((parseInt(WIDTH / config.nQuadrados) * config.nQuadrados) * 100) / largura;
				cresceBarra = cresceBarra * (porCenTelaAment / 100);
				largura = parseInt(WIDTH / config.nQuadrados) * config.nQuadrados;
				altura = parseInt(WIDTH / config.nQuadrados) * config.nQuadrados;
				tamQuadrado = Math.max(Math.floor(largura/config.nQuadrados),Math.floor(altura/config.nQuadrados));
				tabelaGame.style.marginTop = 10 + (HEIGHT / 2) - (altura * 1.1 / 2) + "px";
			}
			divGame.style.width = WIDTH + "px";
			divGame.style.height =  HEIGHT + "px";
			divGame.style.position = "absolute"; 
			divGame.style.margin = "-10px -10px -10px -10px";
		}
		telaGame.width = largura + "px";
		telaGame.altura = altura + "px";
		tituloRank.style.border = "1px solid #000";
		painelRank.width = largura / 2 + 'px';
		painelRank.height = altura + 'px';
		painelRank.style.border = "1px solid #000";
		posicaoAtual.style.width = largura / 2 + "px";
		posicaoTop.style.width = largura / 2 + "px";
		posicaoAtual.height = altura * 0.85 / 3 + "px";
		posicaoTop.height = altura * 0.85 / 3 * 2 + "px";
		for (var i = 1; i < 6; i++) {
			tdMenu = document.getElementById('tdMenu'+ i +'');
			tdMenu.width = largura / 5 + 'px';
		}
		for (var i = 1; i < 6; i++) {
			botao = document.getElementById('botao'+ i +'');
			botao.style.fontSize = largura * 1.6 / 65 + 'px';
			botao.style.width = '100%';
			botao.style.height = '100%';
		}
		divUser = document.getElementById('divUser');
		if(divUser){
			tituloRank.width = largura / 2 + "px";
			var tamUserDivL = largura / 2;
			var tamUserDivA = largura / 4;
			var coordUseX = largura / 2 + canvas.getBoundingClientRect().left - tamUserDivL / 2;
			var coordUseY = altura * 0.45;

			divUser.style.left = coordUseX + "px";
			divUser.style.top = coordUseY + "px";
			divUser.style.width = tamUserDivL + "px";
			divUser.style.height = tamUserDivA + "px";
		}
		buraco = {
	        x: parseInt(largura * 0.10 + (tamQuadrado / 2) + tamQuadrado),
	        y: parseInt(altura * 0.10 + (tamQuadrado / 2)), 
	        raio: tamQuadrado + tamQuadrado * 0.1    
	    }
	    dimenPainel = {
			largura: largura * 0.60,
			altura: altura * 0.40
		}
		posicaoPainel = {
			x: (largura - dimenPainel.largura) / 2,
			y: (altura / 2) - (dimenPainel.altura / 2)
		}
	    this.desenha();
	}
//Cria o Painel de Perguntas --------------------------------------------------------------------------------------------------------------------------------
	this.painelQuestoes = function(resultadosEquacao){
		this.desenha();
		ctx.fillStyle = "rgb(100, 100, 100)";
		ctx.fillRect(posicaoPainel.x, posicaoPainel.y, dimenPainel.largura, dimenPainel.altura);
		
		enunciado = {
			texto: "Qual é o valor de X?",
			fonte: ""+ largura / config.nQuadrados * 2 +"px Arial",
			cor: "black",
			x: posicaoPainel.x + (largura * 0.01),
			y: posicaoPainel.y + (largura / config.nQuadrados * 2)
		}
		ctx.font = enunciado.fonte;
		ctx.fillStyle = enunciado.cor;
		ctx.fillText(enunciado.texto, enunciado.x, enunciado.y);

		ctx.fillText(equacao, (largura / 2) - (equacao.length * (largura / config.nQuadrados) / 2), (altura / 2) - (((largura / config.nQuadrados) / 2) * 2) + (altura * 0.01));

		alternativas = {
			x1: posicaoPainel.x + (largura * 0.05),
			x2: (largura / 2) - ((("b) " + resultadosEquacao[1][0]).length * (largura / (config.nQuadrados * 2)) * 2) / 2),
			x3: posicaoPainel.x + dimenPainel.largura - (("b) " + resultadosEquacao[1][0]).length * (largura / (config.nQuadrados * 2) * 2)) - (largura * 0.05),
			y: posicaoPainel.y + dimenPainel.altura - altura * 0.05
		}			   
		ctx.fillText("a) " + resultadosEquacao[0][0], alternativas.x1, alternativas.y);
		ctx.fillText("b) " + resultadosEquacao[1][0], alternativas.x2, alternativas.y);
		ctx.fillText("c) " + resultadosEquacao[2][0], alternativas.x3, alternativas.y);
		// if()
			// setTimeout("painelQuestoes()", 1000 / FPS);
		posicaoObj = {
			xAlternativa1: alternativas.x1 + canvas.getBoundingClientRect().left,
			yAlternativa1: alternativas.y + canvas.getBoundingClientRect().top,
			larguraAlternativa1: ("a) "+resultadosEquacao[0][0]).length * (largura / config.nQuadrados),
			alturaAlternativa1: (largura / config.nQuadrados * 2) ,

			xAlternativa2: alternativas.x2 + canvas.getBoundingClientRect().left,
			yAlternativa2: alternativas.y + canvas.getBoundingClientRect().top,
			larguraAlternativa2: ("b) "+resultadosEquacao[1][0]).length * (largura / config.nQuadrados),
			alturaAlternativa2: (largura / config.nQuadrados * 2) ,

			xAlternativa3: alternativas.x3 + canvas.getBoundingClientRect().left,
			yAlternativa3: alternativas.y + canvas.getBoundingClientRect().top,
			larguraAlternativa3: ("c) "+resultadosEquacao[2][0]).length * (largura / config.nQuadrados),
			alturaAlternativa3: (largura / config.nQuadrados * 2)
		}
	}
//Cria Uma Tela de Loading --------------------------------------------------------------------------------------------------------------------------------
	this.loading = function() {
		if(auxiliaInserirUser){
			this.desenha();
			barraLoading = {
				largura1: largura * (1 / 3),
				altura1: altura * (1 / 20),
				x1: largura * (1 / 3),
				y1: (altura * (1 / 2)) - (altura * (1 / 20) / 2),
				largura2: largura * (1 / 3) - (altura * (1 / 100) * 2),
				altura2: altura * (1 / 20) - (altura * (1 / 100) * 2),
				x2: largura * (1 / 3) + altura * (1 / 100),
				y2: (altura * (1 / 2)) - (altura * (1 / 20) / 2) + altura * (1 / 100),
				texto1: "Carregando... ",
				texto2: valorBarra +"%",
				x_2: largura * (1 / 2),
				y_2: altura * (1 / 2)
			}
			ctx.fillStyle = 'rgb(100, 100, 100)';
			ctx.fillRect(0, 0, largura, altura);
			ctx.fillStyle = "black";
			ctx.fillRect(barraLoading.x1, barraLoading.y1, barraLoading.largura1, barraLoading.altura1);
			 if(cresceBarra < largura * (1 / 3) - (altura * (1 / 100)) && valorBarra <= 100 ){
				ctx.fillStyle = "blue";
				ctx.fillRect(barraLoading.x2, barraLoading.y2, cresceBarra, barraLoading.altura2);
				ctx.font = ""+ largura / config.nQuadrados +"px Arial";
				ctx.fillStyle = "black";
				ctx.fillText(barraLoading.texto1, barraLoading.x_2 - (barraLoading.texto1.length * 15 / 2) / 2, barraLoading.y_2 - 15 * 1.5);
				ctx.fillStyle = "rgb(100, 100, 100)";
				ctx.fillText(barraLoading.texto2, barraLoading.x_2 - (barraLoading.texto2.length * 15 / 2) / 2, barraLoading.y_2 + 15 / 3);
				cresceBarra += (largura * (1 / 3) - (altura * (1 / 100) * 2)) * 0.1;
				valorBarra += 10;
				setTimeout('this.loading();', 1000 * (1 / 3));
			}
			else{
				confirLoading = true;
				this.desenha();
			}
		}
	}
//Chama Tutorial--------------------------------------------------------------------------------------------------------------------------------
	this.ajuda = function(){
		fecharTutorial = true;
		jogando = 'pause';
		morri = true;
	}
//Desenha o Fundo e a Tela Tutorial--------------------------------------------------------------------------------------------------------------------------------
	this.desenha = function(){
		if(inseriPri){
	        ctx.drawImage(fundo, parseInt(config.nQuadrados * 0.05) * tamQuadrado, parseInt(config.nQuadrados * 0.05) * tamQuadrado,parseInt(config.nQuadrados * 0.95) * tamQuadrado, parseInt(config.nQuadrados * 0.95) * tamQuadrado);
	        ctx.drawImage(bordaHC, 0, 0, largura, parseInt(config.nQuadrados * 0.05) * tamQuadrado);
	        ctx.drawImage(bordaHB, 0, altura - parseInt(config.nQuadrados * 0.05) * tamQuadrado, largura, parseInt(config.nQuadrados * 0.05) * tamQuadrado);
	        ctx.drawImage(bordaVD, largura - parseInt(config.nQuadrados * 0.05) * tamQuadrado, 0, parseInt(config.nQuadrados * 0.05) * tamQuadrado, altura);
	        ctx.drawImage(bordaVE, 0, 0, parseInt(config.nQuadrados * 0.05) * tamQuadrado, altura);
	        ctx.fillStyle = "rgb(100, 100, 100)";
	        ctx.fillRect(0, 0, ('Pontos: ' + pontos).length * (largura / config.nQuadrados)/2, largura / config.nQuadrados);        
	        if(fecharTutorial){
	            ctx.drawImage(tutorial, largura * 0.2, altura * 0.1, largura * 0.6, altura * 0.8);
	        }
	        else if (fecharTutorial && auxiliaInicio){
	            //andar.anda();
	        }
	    }
    }
//Roda o Jogo--------------------------------------------------------------------------------------------------------------------------------
	this.anda = function(){
        if (jogando == "pause"){
            this.pause();
        }
        else{
            ctx.clearRect(0,0, largura, altura);
            ctx.font = ""+ largura / config.nQuadrados +"px Arial";
            ctx.font = ""+ largura / config.nQuadrados +"px Arial";
            ctx.fillText('Pontos: ' + pontos, 0, largura / config.nQuadrados);
            if(xFruta == cobra[0][0] && yFruta == cobra[0][1]){
                this.geraFruta();
                pontos += 1;
                cobra.push([cobra[cobra.length-1][0], cobra[cobra.length-1][1]]);
            }
            if(xBonus == cobra[0][0] && yBonus == cobra[0][1]){
                telaQuestao = true;
                auxiliaErro = true;
                this.IniciaPainel();
                yBonus = -1;
                xBonus = -1;
                jogando = "pause";
                this.anda();
            }
            else{
                ultimaDirecao = direcao;
                this.desenha();
                
                if(pontos >= paraLevel2 && auxiliaLevel == 1){
				    if(level == 1){
				        buraco = {
					        x: parseInt(largura * 0.10 + (tamQuadrado / 2) + tamQuadrado),
					        y: parseInt(altura * 0.10 + (tamQuadrado / 2)), 
					        raio: tamQuadrado + tamQuadrado * 0.1    
					    }
				        entraBuraco();
				    }else if(contador > -1 && buraco.x > 0){
				        contador -= 1;
				        entraBuraco();
				    }else{
				    	contado = 1;
				        auxiliaLevel = 2;
				        verificaEntrada = false;
				        buraco = {
				            x: 0,
				            y: 0,
				            raio: 0
				        }
				    }
				}
				// 
				else if(pontos >= paraLevel3 && auxiliaLevel == 2){
				    if(level == 2){
				        buraco = {
					        x: parseInt(largura * 0.10 + (tamQuadrado / 2) + tamQuadrado),
					        y: parseInt(altura * 0.10 + (tamQuadrado / 2)), 
					        raio: tamQuadrado + tamQuadrado * 0.1    
					    }
				        entraBuraco();
				    }else if(contador > 1 && buraco.x > 0){
				        contador -= 1;
				        entraBuraco();
				    }else{
				    	contado = 1;
				        auxiliaLevel = 3;
				        verificaEntrada = false;
				        buraco = {
				            x: 0,
				            y: 0,
				            raio: 0
				        }
				    }
				}
				else if(pontos >= paraLevel4 && auxiliaLevel == 3){
				    if(level == 3){
				        buraco = {
					        x: parseInt(largura * 0.10 + (tamQuadrado / 2) + tamQuadrado),
					        y: parseInt(altura * 0.10 + (tamQuadrado / 2)), 
					        raio: tamQuadrado + tamQuadrado * 0.1    
					    }
				        entraBuraco();
				    }else if(contador > 1 && buraco.x > 0){
				        contador -= 1;
				        entraBuraco();
				    }else{
				    	contado = 1;
				    	verificaEntrada = false;
				        auxiliaLevel = 4;
				        buraco = {
				            x: 0,
				            y: 0,
				            raio: 0
				        }
				    }
				}
                ctx.drawImage(macaImg, xFruta * tamQuadrado, yFruta * tamQuadrado, tamQuadrado, tamQuadrado);
                ctx.drawImage(bonusImg, xBonus * tamQuadrado, yBonus * tamQuadrado, tamQuadrado, tamQuadrado);
                if(jogando && xBonus == xFruta && yBonus == yFruta){
                    this.geraFruta();
                    this.geraBonus();
                }

                for(x = cobra.length -1; x > 0; x--){
                    cobra[x][0] = cobra[x-1][0];
                    cobra[x][1] = cobra[x-1][1];
                    cobra[x][2] = cobra[x-1][2];
                }
                if(!jogando) {
                    if(direcao == 1 && cobra[0][1] <= (altura * 0.1 / tamQuadrado))
                        direcao = 2;
                    else if(direcao == 2 && cobra[0][0] >= (largura * 0.9 / tamQuadrado - 1))
                        direcao = 3;
                    else if(direcao == 3 && cobra[0][1] >= (altura * 0.9 / tamQuadrado - 1))
                        direcao = 0;
                    else if(direcao == 0 && cobra[0][0] <= (largura * 0.1 / tamQuadrado))
                        direcao = 1;
        
                    ctx.font = ""+ largura / config.nQuadrados +"px Arial";
                    textoEnter = 'Precione "ENTER" para jogar!';
                    posicaoTextoX = (largura / 2) - (textoEnter.length * (largura / config.nQuadrados)/4);
                    posicaoTextoY = (altura / 2) - (config.nQuadrados/2);
                    larguraTexto = textoEnter.length * (largura / config.nQuadrados)/2;
                    alturaTexto = largura / config.nQuadrados;
                    
                    ctx.fillStyle = "rgb(100,100,100)";
                    ctx.fillRect(posicaoTextoX, posicaoTextoY, larguraTexto, alturaTexto);
                    ctx.fillStyle = "white";
                    ctx.fillText('Precione "ENTER" para jogar!', posicaoTextoX, posicaoTextoY + largura * 0.02);
                }
                else if(jogando) {
                    if(direcao == 1 && cobra[0][1] <= parseInt(config.nQuadrados * 0.05))
                        vivo = false;
                    else if(direcao == 2 && cobra[0][0] >= parseInt(config.nQuadrados * 0.95) - 1)
                        vivo = false;
                    else if(direcao == 3 && cobra[0][1] >= parseInt(config.nQuadrados * 0.95) - 1)
                        vivo = false;
                    else if(direcao == 0 && cobra[0][0] <= parseInt(config.nQuadrados * 0.05) )
                        vivo = false;
                }
                if(direcao == 0){
                    cobra[0][0]--;
                }
                if(direcao == 1){
                    cobra[0][1]--;
                }
                if(direcao == 2){
                    cobra[0][0]++;
                }
                if(direcao == 3){
                    cobra[0][1]++;
                }
                for(i = 1; i < cobra.length; i++){                    
                    if(xFruta == cobra[i][0] && yFruta == cobra[i][1]){
                        geraFruta();
                    }
                    if(cobra[0][0] == cobra[i][0] && cobra[0][1] == cobra[i][1]){
                        vivo = false;
                        reiniciar = true;
                    }
                }
                if(cobra[0][0] < 0 || cobra[0][1] < 0 || cobra[0][0] >=  largura/tamQuadrado || cobra[0][1] >= altura/tamQuadrado){
                    vivo = false;
                    reiniciar = true;
                }

                if (vivo == false){
                    reiniciar = true;
                    jogando = false;
                    morri = true;
                    config.resetar = true;
                    // this.resetVariavel();
                    this.escreverCookie(nomeUser, true);
                    this.reset();
                    this.anda();
                    alert('Fim de jogo');
                }
                else if(vivo == true){
                    ctx.fillStyle = "white";
                    ctx.fillText('Pontos: ' + pontos, 0, largura / config.nQuadrados);
                    setTimeout('this.anda()',1000/FPS);
                    cobra[0][2] = direcao;
                    for (var i = 0; i < cobra.length; i++) {
                        if (i > 0) {
                            switch(cobra[i][2]){
                                case 0:
                                    corpoImg = corpoImg1;
                                    break;
                                case 1:
                                    corpoImg = corpoImg2;
                                    break;
                                case 2:
                                    corpoImg = corpoImg1;
                                    break;
                                case 3:
                                    corpoImg = corpoImg2;
                            }
                            ctx.drawImage(corpoImg, cobra[i][0] * tamQuadrado, cobra[i][1] * tamQuadrado, tamQuadrado, tamQuadrado);
                        }
                        else if(!auxiliaBuraco){
                            ctx.save();
                            ctx.translate(cobra[0][0] * tamQuadrado + (tamQuadrado / 2), cobra[0][1] * tamQuadrado + (tamQuadrado / 2));
                            switch(direcao) {
                                case 0:
                                    rotacaoC = Math.PI / 180 * 180;
                                    break;
                                case 1:
                                    rotacaoC = Math.PI / 180 * 270;
                                    break;
                                case 2:
                                    rotacaoC = Math.PI / 180 * 1;
                                    break;
                                case 3:
                                    rotacaoC = Math.PI / 180 * 90;
                                    break;
                            }
                            ctx.rotate(rotacaoC);
                            ctx.drawImage(cabecaImg, -tamQuadrado / 2 , -tamQuadrado / 2, tamQuadrado, tamQuadrado);
                            ctx.restore();
                        }
                    }
                }
            }
        }
    }
//Cria as cordenadas Para a Fruta Normal--------------------------------------------------------------------------------------------------------------------------------
	this.geraFruta = function(){
		xFruta = parseInt((0.05 * config.nQuadrados) + Math.random() * (0.95 * config.nQuadrados - 2));
		yFruta = parseInt((0.05 * config.nQuadrados) + Math.random() * (0.95 * config.nQuadrados - 2));
	}
//Cria as cordenadas Para a Fruta Bonus--------------------------------------------------------------------------------------------------------------------------------
	this.geraBonus = function(){  
		if(!morri){
			if(jogando != 'pause'){
				xBonus = parseInt((0.05 * config.nQuadrados) + Math.random() * (0.95 * config.nQuadrados - 2));
				yBonus = parseInt((0.05 * config.nQuadrados) + Math.random() * (0.95 * config.nQuadrados - 2));
				setTimeout('this.auxiliaBonus();', 10000);
			}
			else{
				this.auxiliaBonus();
			}
		}
	}
	this.auxiliaBonus = function(){ 
		if(!morri){   
			if(jogando != 'pause'){
				if(xBonus < 0){
					setTimeout('this.geraBonus();', 10000);
				}else{
					xBonus = -1; yBonus = -1; 
					this.auxiliaBonus();
				}
			}
			else{
				setTimeout('this.auxiliaBonus();', 1000/FPS);       
			}
		}
	}
//Mantem Desenhando o Fundo Depois Que For Dado Pause--------------------------------------------------------------------------------------------------------------------------------
	this.pause = function(){
	    if(jogando == "pause"){
	        if(!telaQuestao){
	            verif1 = true;
	            verif2 = true;
	            verif3 = true;
	            verif4 = true;
	            ctx.clearRect(0,0, largura, altura);
	            this.desenha();
	            for (var i = 0; i < cobra.length; i++) {
	                if (i > 0) {
	                    switch(cobra[i][2]){
	                        case 0:
	                            corpoImg = corpoImg1;
	                            break;
	                        case 1:
	                            corpoImg = corpoImg2;
	                            break;
	                        case 2:
	                            corpoImg = corpoImg1;
	                            break;
	                        case 3:
	                            corpoImg = corpoImg2;
	                    }
	                    ctx.drawImage(corpoImg, cobra[i][0] * tamQuadrado, cobra[i][1] * tamQuadrado, tamQuadrado, tamQuadrado);
	                }
	                else {
	                    ctx.save();
	                    ctx.translate(cobra[0][0] * tamQuadrado + (tamQuadrado / 2), cobra[0][1] * tamQuadrado + (tamQuadrado / 2));
	                    ctx.rotate(rotacaoC);
	                    ctx.drawImage(cabecaImg, -tamQuadrado / 2 , -tamQuadrado / 2, tamQuadrado, tamQuadrado);
	                    ctx.restore();
	                }
	            }
	            ctx.drawImage(macaImg, xFruta * tamQuadrado, yFruta * tamQuadrado, tamQuadrado, tamQuadrado);
	            ctx.drawImage(bonusImg, xBonus * tamQuadrado, yBonus * tamQuadrado, tamQuadrado, tamQuadrado);
	            
	            ctx.font = ""+ largura / config.nQuadrados +"px Arial";
	            textoEnter = 'Precione "ENTER" para jogar!';
	            posicaoTextoX = (largura / 2) - (textoEnter.length * (largura / config.nQuadrados)/4);
	            posicaoTextoY = (altura / 2) - (config.nQuadrados/2);
	            larguraTexto = textoEnter.length * (largura / config.nQuadrados)/2;
	            alturaTexto = largura / config.nQuadrados;
	            
	            ctx.fillStyle = "rgb(100,100,100)";
	            ctx.fillRect(posicaoTextoX, posicaoTextoY, larguraTexto, alturaTexto);
	            ctx.fillStyle = "white";
	            ctx.fillText('Precione "ENTER" para jogar!', posicaoTextoX, posicaoTextoY + largura * 0.02);
	            
	            ctx.fillText('Pontos: ' + pontos, 0, (largura / config.nQuadrados));
	        }
	        if(fecharTutorial){
	        	ctx.drawImage(tutorial, largura * 0.2, altura * 0.1, largura * 0.6, altura * 0.8);
	        }
	        setTimeout("this.pause();", 1000/5);
	    }
	    else{
	        jogando == true;
	        this.anda();
	    }
	}
//É Responsavel Por Ajustar os Dados a Vontade do Usuario Por Meio das Teclas--------------------------------------------------------------------------------------------------------------------------------	
	this.pegaDirecao = function(tecla){
	    // alert(tecla.keyCode);
	    // console.log(tecla.keyCode);
	    if(tecla.keyCode == 13  && confirLoading){
	        if (fecharTutorial && !jogando){
	            fecharTutorial = false;
	            this.desenha();
	            this.anda();
	        }else if(fecharTutorial && jogando == "pause"){
	        	fecharTutorial = false;
	        }
	        else if(jogando == true && !movimentoBuraco && verificaEntrada != true){
	            jogando = "pause";
	            ultimaDirecao = direcao;
	            ctx.font = ""+ largura / config.nQuadrados +"px Arial";
	            textoEnter = 'Precione "ENTER" para jogar!';
	            posicaoTextoX = (largura / 2) - (textoEnter.length * (largura / config.nQuadrados)/4);
	            posicaoTextoY = (altura / 2) - (config.nQuadrados/2);
	            larguraTexto = textoEnter.length * (largura / config.nQuadrados)/2;
	            alturaTexto = largura / config.nQuadrados;
	            
	            ctx.fillStyle = "rgb(100,100,100)";
	            ctx.fillRect(posicaoTextoX, posicaoTextoY, larguraTexto, alturaTexto);
	            ctx.fillStyle = "white";
	            ctx.fillText('Precione "ENTER" para jogar!', posicaoTextoX, posicaoTextoY + largura * 0.02);
	        }
	        else if(jogando == false && verificaEntrada != true){
	            jogando = true;
	            morri = false;
	            this.geraFruta();
	            this.auxiliaBonus();
	        }
	        else{
	            ctx.font = ""+ largura / config.nQuadrados +"px Arial";
	            textoEnter = 'Precione "ENTER" para jogar!';
	            posicaoTextoX = (largura / 2) - (textoEnter.length * (largura / config.nQuadrados)/4);
	            posicaoTextoY = (altura / 2) - (config.nQuadrados/2);
	            larguraTexto = textoEnter.length * (largura / config.nQuadrados)/2;
	            alturaTexto = largura / config.nQuadrados;
	            
	            ctx.fillStyle = "rgb(100,100,100)";
	            ctx.fillRect(posicaoTextoX, posicaoTextoY, larguraTexto, alturaTexto);
	            ctx.fillStyle = "white";
	            ctx.fillText('Precione "ENTER" para jogar!', posicaoTextoX, posicaoTextoY + largura * 0.02);
	            jogando = true;
	        }
	    }
	    else if(tecla.keyCode == 65 && telaQuestao && confirLoading){
			if(resultadosEquacao0[0][1] && auxiliaErro){
				auxiliaErro = false;
				alert("Acertou Miseravi!!!")
				verif2 = false;
				pontos += valorBonus;
	            ctx.fillStyle = "rgb(0,100,0)";
	            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
	            ctx.fillText('Pontos: ' + pontos, 0, 15);
	            cobra.push([xBonus,yBonus]);
	            telaQuestao = false;
	            resultadosEquacao0 = [[,],[,],[,]];					
			}
			else if(auxiliaErro){
				auxiliaErro = false;
				alert("Errou!!!");
				telaQuestao = false;
				resultadosEquacao0 = [[,],[,],[,]];
			}
	    }
	    else if((tecla.keyCode == 37 || tecla.keyCode == 65) && auxiliaTecla && (direcao != 2 && jogando && ultimaDirecao != 2 && !movimentoBuraco) && confirLoading){
            direcao = 0;
	    }
	    else if((tecla.keyCode == 38 || tecla.keyCode == 87) && auxiliaTecla && (direcao != 3 && jogando && ultimaDirecao != 3 && !movimentoBuraco) && confirLoading){
            direcao = 1;
	    }
	    else if((tecla.keyCode == 39 || tecla.keyCode == 68) && auxiliaTecla && (direcao != 0 && jogando && ultimaDirecao != 0 && !movimentoBuraco) && confirLoading){
	        direcao = 2;
	    }
	    else if((tecla.keyCode == 40 || tecla.keyCode == 83) && auxiliaTecla && (direcao != 1 && jogando && ultimaDirecao != 1 && !movimentoBuraco) && confirLoading){
			direcao = 3;
	    }
	    // 	Seleciona a alternativa b).
	    else if(tecla.keyCode == 66 && telaQuestao && confirLoading){
			if(resultadosEquacao0[1][1] && auxiliaErro){
				auxiliaErro = false;
				alert("Acertou Miseravi!!!")
				verif2 = false;
				pontos += valorBonus;
	            ctx.fillStyle = "rgb(0,100,0)";
	            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
	            ctx.fillText('Pontos: ' + pontos, 0, 15);
	            cobra.push([xBonus,yBonus]);
	            telaQuestao = false;
	            resultadosEquacao0 = [[,],[,],[,]];					
			}
			else if(auxiliaErro){
				auxiliaErro = false;
				alert("Errou!!!");
				telaQuestao = false;
				resultadosEquacao0 = [[,],[,],[,]];
			}
	    }
	    // 	Seleciona a alternativa c).
	    else if(tecla.keyCode == 67 && telaQuestao && confirLoading){
			if(resultadosEquacao0[2][1] && auxiliaErro){
				auxiliaErro = false;
				alert("Acertou Miseravi!!!")
				verif2 = false;
				pontos += valorBonus;
	            ctx.fillStyle = "rgb(0,100,0)";
	            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
	            ctx.fillText('Pontos: ' + pontos, 0, 15);
	            cobra.push([xBonus,yBonus]);
	            telaQuestao = false;
	            resultadosEquacao0 = [[,],[,],[,]];					
			}
			else if(auxiliaErro){
				auxiliaErro = false;
				alert("Errou!!!");
				telaQuestao = false;
				resultadosEquacao0 = [[,],[,],[,]];
			}
	    }
	    // 	Seleciona a alternativa a).
	}
//Chama as Funções Responsaveis Por Criar o Painel de Questões--------------------------------------------------------------------------------------------------------------------------------
	this.IniciaPainel = function() {
	    if(auxiliaLevel == 4){
	        level4();
	        this.desenha();
	        setTimeout('painelQuestoes(resultadosEquacao);', 8);
	        setTimeout('EventosPainel = new eventosPainel();', 9);
	        setTimeout('elemento = EventosPainel.poisicaoObj;',10);
	        setTimeout('EventosPainel.eventoClick(elemento, canvas, "mouseover", function(c){console.log(c);}); ', 11);
	    }
	    else if(auxiliaLevel == 3){
	        level3();
	        this.desenha();
	        setTimeout('painelQuestoes(resultadosEquacao);', 8);
	        setTimeout('EventosPainel = new eventosPainel();', 9);
	        setTimeout('elemento = EventosPainel.poisicaoObj;',10);
	        setTimeout('EventosPainel.eventoClick(elemento, canvas, "mouseover", function(c){console.log(c);}); ', 11);
	    }
	    else if(auxiliaLevel == 2){
	        level2();
			this.desenha();
	        setTimeout('painelQuestoes(resultadosEquacao);', 8);
	        setTimeout('EventosPainel = new eventosPainel();', 9);
	        setTimeout('elemento = EventosPainel.poisicaoObj;',10);
	        setTimeout('EventosPainel.eventoClick(elemento, canvas, "mouseover", function(c){console.log(c);}); ', 11);
	    }
	    else if(auxiliaLevel == 1){        
	        level1();
	        this.desenha();
	        setTimeout('painelQuestoes(resultadosEquacao);', 8);
	        setTimeout('EventosPainel = new eventosPainel();', 9);
	        setTimeout('elemento = EventosPainel.poisicaoObj;',10);
	        setTimeout('EventosPainel.eventoClick(elemento, canvas, "mouseover", function(c){console.log(c);}); ', 11);
	    }
	}
//Faz Com Que Surja Um Buraco Para o Proximo Level--------------------------------------------------------------------------------------------------------------------------------
	this.entraBuraco = function(){
	    ctx.beginPath();
	    ctx.fillStyle = "black";
	    
	    ctx.arc(buraco.x, buraco.y, buraco.raio, 0, 2 * Math.PI, true)
	    ctx.fill();
	    if(cobra.length > 1 && cobra[0][0] * tamQuadrado <= buraco.x && cobra[0][0] * tamQuadrado + tamQuadrado >= buraco.x && cobra[0][1] * tamQuadrado <= buraco.y && cobra[0][1] * tamQuadrado + tamQuadrado >= buraco.y){
	        contador += 1;
	        novaCobra.push(cobra[0]);
	        cobra.shift();
	        verificaEntrada = true;
	        auxiliaBuraco = true;
	    }else if(auxiliaBuraco){
	        for (var i = 0; i < novaCobra.length; i++) {
	            cobra.push(novaCobra[i]);
	        }
	        novaCobra = [];
	        auxiliaBuraco = false;

	        rotacaoC = Math.PI / 180;
	        jogando = false;
	        direcao = config.direcaoInic;

	        xFruta = -1;
	        yFruta = -1;
	        xBonus = -1;
	        yBonus = -1;

	        if(level == 1){
	            level += 1;
				
				valorBonus = 20;
		        bonusImg.src = "imagens/bonus2.png";

		        fundo.src = "imagens/fundo2.png";
		        cabecaImg.src = "imagens/sprites/azulCabeca.png";
		        corpoImg1.src = "imagens/sprites/azulCorpo1.png";
		        corpoImg2.src = "imagens/sprites/azulCorpo2.png";
		        
	        }
	        else if(level == 2){
	            level += 1;

		        valorBonus = 30;
		        bonusImg.src = "imagens/bonus3.png";

		        fundo.src = "imagens/fundo3.png";
		        cabecaImg.src = "imagens/sprites/coralCabeca.png";
		        corpoImg1.src = "imagens/sprites/coralCorpo1.png";
		        corpoImg2.src = "imagens/sprites/coralCorpo2.png";
	        }
	        else if(level == 3){
	            level += 1;

		        valorBonus = 40;
		        bonusImg.src = "imagens/bonus4.png";
		        
		        fundo.src = "imagens/fundo4.png";
		        cabecaImg.src = "imagens/sprites/astronaltaCabeca.png";
		        corpoImg1.src = "imagens/sprites/astronaltaCorpo1.png";
		        corpoImg2.src = "imagens/sprites/astronaltaCorpo2.png";
	        }
	    }
	}
//Gera o Evento Click das Questoes--------------------------------------------------------------------------------------------------------------------------------
	this.eventosPainel = function(elemento, canvas, evento, cllbacke){
		this.eventoClick = function (elemento, canvas, evento, cllback){
			switch(evento){
				case 'mouseup':
				case 'mousedown':
				case 'mouseover': 
				case 'mouseout':
					this.eventoMouse(elemento, canvas, evento, cllback);
					break;
			}
		}
		mouseCanvasCoordenadas = function(canvas, e){
			var poisicaoCanvaIn = canvas.getBoundingClientRect();
			return{
				x: parseInt(e.clientX ),
				y: parseInt(e.clientY )
			};
		}

		this.eventoMouse = function(elemento, canvas, evento, cllback){
			switch(evento){
				case 'mouseover':
					document.addEventListener('click', function(e){
						setTimeout('telaQuestao = false;', 30000);
						var coordenadas = mouseCanvasCoordenadas(canvas, e);
						// 	Seleciona a alternativa a).
						if(verif1 && coordenadas.x >= posicaoObj.xAlternativa1 
							&& coordenadas.x <= posicaoObj.xAlternativa1 + posicaoObj.larguraAlternativa1 
							&& coordenadas.y <= posicaoObj.yAlternativa1 
							&& coordenadas.y >= posicaoObj.yAlternativa1 - posicaoObj.alturaAlternativa1
							){
							if(resultadosEquacao0[0][1] && auxiliaErro){
								auxiliaErro = false;
								alert("Acertou Miseravi!!!");
								verif1 = false;
								pontos += valorBonus;
					            ctx.fillStyle = "rgb(0,100,0)";
					            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
					            ctx.fillText('Pontos: ' + pontos, 0, 15);
					            cobra.push([xBonus,yBonus]);
					            telaQuestao = false;
					            resultadosEquacao0 = [[,],[,],[,]];
							}
							else if(auxiliaErro){
								auxiliaErro = false;
								alert("Errou!!!");
								telaQuestao = false;
								resultadosEquacao0 = [[,],[,],[,]];
							}
						}
						// 	Seleciona a alternativa b).
						else if(verif2 && coordenadas.x >= posicaoObj.xAlternativa2 && 
							coordenadas.x <= posicaoObj.xAlternativa2 + posicaoObj.larguraAlternativa2 &&
							coordenadas.y <= posicaoObj.yAlternativa2 && 
							coordenadas.y >= posicaoObj.yAlternativa2 - posicaoObj.alturaAlternativa2){
							if(resultadosEquacao0[1][1] && auxiliaErro){
								auxiliaErro = false;
								alert("Acertou Miseravi!!!")
								verif2 = false;
								pontos += valorBonus;
					            ctx.fillStyle = "rgb(0,100,0)";
					            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
					            ctx.fillText('Pontos: ' + pontos, 0, 15);
					            cobra.push([xBonus,yBonus]);
					            telaQuestao = false;
					            resultadosEquacao0 = [[,],[,],[,]];					
							}
							else if(auxiliaErro){
								auxiliaErro = false;
								alert("Errou!!!");
								telaQuestao = false;
								resultadosEquacao0 = [[,],[,],[,]];
							}
						}
						// 	Seleciona a alternativa c).
						else if(verif3 && coordenadas.x >= posicaoObj.xAlternativa3 && 
							coordenadas.x <= posicaoObj.xAlternativa3 + posicaoObj.larguraAlternativa3 &&
							coordenadas.y <= posicaoObj.yAlternativa3 && 
							coordenadas.y >= posicaoObj.yAlternativa3 - posicaoObj.alturaAlternativa3
							){
							if(resultadosEquacao0[2][1] && auxiliaErro){
								auxiliaErro = false;
								alert("Acertou Miseravi!!!");
								verif3 = false;
								pontos += valorBonus;
					            ctx.fillStyle = "rgb(0,100,0)";
					            ctx.font = ""+ largura / config.nQuadrados+"px Arial";
					            ctx.fillText('Pontos: ' + pontos, 0, 15);
					            cobra.push([xBonus,yBonus]);
					            telaQuestao = false;
					            resultadosEquacao0 = [[,],[,],[,]];				
							}
							else if(auxiliaErro){
								auxiliaErro = false;
								alert("Errou!!!");
								telaQuestao = false;
							}
						}	
					});
					break;
			}
		}
	}
	// setTimeout('this.ajustarCanvas();',3);
	// setTimeout('this.loading();',4);
	window.addEventListener("resize", this.ajustarCanvas(telaCheia));
	window.addEventListener('keydown', this.pegaDirecao);
}
//Define as questao com level 1--------------------------------------------------------------------------------------------------------------------------------
var enunciado = "Qual é o valor de X?";
var equacao;
var resultadosEquacao = [[,],[,],[,]];
function level1(){
    _verdadeira = {
        equaA: 1 + parseInt(Math.random() * 9),
        equaB: 1 + parseInt(Math.random() * 9),
    }
    verdadeira = {
        equa: _verdadeira.equaA - _verdadeira.equaB,
        equacao:_verdadeira.equaA + " - " + _verdadeira.equaB + " =  X",
        ordem: parseInt(Math.random() * 3)
    }
    _falsa1 = {
        equaA: 1 + parseInt(Math.random() * 9),
        equaB: 1 + parseInt(Math.random() * 9),
    }
    falsa1 = {
        equa: _falsa1.equaA - _falsa1.equaB,
        ordem: parseInt(Math.random() * 3)
    }
    _falsa2 =  {
        equaA: 1 + parseInt(Math.random() * 9),
        equaB: 1 + parseInt(Math.random() * 9),
    }
    falsa2 = {
        equa: _falsa2.equaA - _falsa2.equaB,
        ordem: parseInt(Math.random() * 3)
    }
    if(falsa1.equa == verdadeira.equa || falsa2.equa == verdadeira.equa || falsa2.equa == falsa1.equa){
        confir1 = false;
        level1();
    }
    else{
        confir1 = true;
    }
    if(falsa1.ordem == verdadeira.ordem || falsa2.ordem == verdadeira.ordem || falsa2.ordem == falsa1.ordem){
        level1();
    }
    else if(confir1){
        equacao = verdadeira.equacao;
        if (verdadeira.ordem == 1){
        	okay = true;
            resultadosEquacao[0] = [verdadeira.equa,true];
        }
        else if(verdadeira.ordem == 2){
        	okay = true;
            resultadosEquacao[1] = [verdadeira.equa,true];
        }
        else if(verdadeira.ordem = 3 || verdadeira.ordem == 0){
        	okay = true;
            resultadosEquacao[2] = [verdadeira.equa,true];
        }

        // 
        if(falsa1.ordem == 1){
        	okay = true;
            resultadosEquacao[0] = [falsa1.equa, false];
        }
        else if(falsa1.ordem == 2){
        	okay = true;
            resultadosEquacao[1] = [falsa1.equa, false];
        }
        else if(falsa1.ordem == 3 || falsa1.ordem == 0){
        	okay = true;
            resultadosEquacao[2] = [falsa1.equa, false];
        }

        // 
        if(falsa2.ordem == 1){
        	okay = true;
            resultadosEquacao[0] = [falsa2.equa, false];
        }
        else if(falsa2.ordem == 2){
        	okay = true;
            resultadosEquacao[1] = [falsa2.equa, false];
        }
        else if(falsa2.ordem == 3 || falsa2.ordem == 0){
        	okay = true;
            resultadosEquacao[2] = [falsa2.equa, false];
        }

        resultadosEquacao0 = resultadosEquacao;
    }
}
//Define as questao com level 2--------------------------------------------------------------------------------------------------------------------------------
function level2(){
    _verdadeira = {
        equaA: parseInt(Math.random() * 10),
        equaB: parseInt(Math.random() * 10),
    }
    verdadeira = {
        equa: _verdadeira.equaA * _verdadeira.equaB,
        equacao:_verdadeira.equaA + " * " + _verdadeira.equaB + " =  X",
        ordem: parseInt(Math.random() * 3)
    }
    _falsa1 = {
        equaA: parseInt(Math.random() * 10),
        equaB: parseInt(Math.random() * 10),
    }
    falsa1 = {
        equa: _falsa1.equaA * _falsa1.equaB,
        ordem: parseInt(Math.random() * 3)
    }
    _falsa2 =  {
        equaA: parseInt(Math.random() * 10),
        equaB: parseInt(Math.random() * 10),
    }
    falsa2 = {
        equa: _falsa2.equaA *_falsa2.equaB,
        ordem: parseInt(Math.random() * 3)
    }
    if(falsa1.equa == verdadeira.equa || falsa2.equa == verdadeira.equa || falsa2.equa == falsa1.equa){
        confir1 = false;
        level2();
    }
    else{
        confir1 = true;
    }
    if(falsa1.ordem == verdadeira.ordem || falsa2.ordem == verdadeira.ordem || falsa2.ordem == falsa1.ordem){
        confir2 = false;
        level2();
    }
    else{
        confir2 = true;
    }
    if(confir1 == true && confir2 == true){
        equacao = verdadeira.equacao;
        if (verdadeira.ordem == 1){
            resultadosEquacao[0] = [verdadeira.equa,true];
        }
        else if(verdadeira.ordem == 2){
            resultadosEquacao[1] = [verdadeira.equa,true];
        }
        else if(verdadeira.ordem = 3 || verdadeira.ordem == 0){
            resultadosEquacao[2] = [verdadeira.equa,true];
        }

        // 
        if(falsa1.ordem == 1){
            resultadosEquacao[0] = [falsa1.equa, false];
        }
        else if(falsa1.ordem == 2){
            resultadosEquacao[1] = [falsa1.equa, false];
        }
        else if(falsa1.ordem == 3 || falsa1.ordem == 0){
            resultadosEquacao[2] = [falsa1.equa, false];
        }

        // 
        if(falsa2.ordem == 1){
            resultadosEquacao[0] = [falsa2.equa, false];
        }
        else if(falsa2.ordem == 2){
            resultadosEquacao[1] = [falsa2.equa, false];
        }
        else if(falsa2.ordem == 3 || falsa2.ordem == 0){
            resultadosEquacao[2] = [falsa2.equa, false];
        }
        resultadosEquacao0 = resultadosEquacao;

    }
}
//Define as questao com level 3--------------------------------------------------------------------------------------------------------------------------------
function level3(){
	this.gera = function(){
    	do{
    		valores = {
	    		equaA: 1 + parseInt(Math.random() * 9),
	        	equaB: 1 + parseInt(Math.random() * 99)
	        }
    	}while(parseInt(valores.equaB % valores.equaA) != 0);
    	return valores;
    }
    _verdadeira = this.gera();
    if(_verdadeira.equaB % _verdadeira.equaA == 0){
		verdadeira = {
    		equa: _verdadeira.equaB / _verdadeira.equaA,
	        equacao:_verdadeira.equaB + " / " + _verdadeira.equaA + " =  X",
	        ordem: 0
   		}
	}
	do{
		_falsa1 = this.gera();
	}while(_falsa1 == _verdadeira);
	
	if(_falsa1.equaB % _falsa1.equaA == 0){
		falsa1 = {
	        equa: _falsa1.equaB / _falsa1.equaA,
	        ordem: 0
		}
    }

    do{
		_falsa2 = this.gera();
	}while(_falsa2 == _verdadeira || _falsa2 == _falsa1);
	
	if(_falsa2.equaB % _falsa2.equaA == 0){
		falsa2 = {
	        equa: _falsa2.equaB / _falsa2.equaA,
	        ordem: 0
		}
    }

	this.ordem = function(){
    	verdadeira.ordem = parseInt(Math.random() * 3);
    	do{
    		falsa1.ordem = parseInt(Math.random() * 3);
    	}while(verdadeira.ordem == falsa1.ordem)
    	for (var i = 0; i < 3; i++) {
    		if(i != verdadeira.ordem && i != falsa1.ordem){
    			falsa2.ordem = i;
    		}
    	}
    }
    this.ordem();
    // alert(verdadeira.ordem +", " +falsa1.ordem+", " +falsa2.ordem);
	for (var i = 0; i < 3; i++) {
    	if (verdadeira.ordem == i){
            resultadosEquacao[i] = [verdadeira.equa,true];
        }
		if(falsa1.ordem == i){
        	resultadosEquacao[i] = [falsa1.equa, false];
    	}
    	if(falsa2.ordem == i){
        	resultadosEquacao[i] = [falsa2.equa, false];
    	}
	}
	equacao = verdadeira.equacao;
    resultadosEquacao0 = resultadosEquacao;
}
//Define as questao com level 4--------------------------------------------------------------------------------------------------------------------------------
function level4(){
    aAjuste = 0;
    bAjuste = 0;
    cAjuste = 0;
    equa = 0;
    equacao = "";
    n1Ajuste = 0;
    n2Ajuste = 0;
    confir1 = 0;
    confir2 = 0;
    erroEqua = false;
    resultadosEquacao = [[],[],[]]
    if( 0 == parseInt(Math.random() *  2)){
        aAjuste = 1;
        cA = ["",""]
    }else{
        aAjuste = -1;
        cA = ["(",")"]
    }
    if( 0 == parseInt(Math.random() *  2)){
        bAjuste = 1;
        cB = ["",""]
    }else{
        bAjuste = -1;
        cB = ["(",")"]
    }
    if( 0 == parseInt(Math.random() *  2)){
        cAjuste = 1;
        cC = ["",""]
    }else{
        cAjuste = -1;
        cC = ["(",")"]
    }
    _verdadeira = {
        equaA: aAjuste + parseInt(Math.random() * 9) * aAjuste ,
        equaB: bAjuste + parseInt(Math.random() * 9) * bAjuste,
        equaC: cAjuste + parseInt(Math.random() * 9) * cAjuste,
        formatoEqua: parseInt(Math.random() * 4),
        ordem: parseInt(Math.random() * 3)
    }
    this.verdadeira = function(){
        if(_verdadeira.formatoEqua == 0){
            equa = (_verdadeira.equaA * _verdadeira.equaB - _verdadeira.equaC) * -1;
            equacao = _verdadeira.equaA + " * " + cB[0] + _verdadeira.equaB + cB[1] + " +  X = " + cC[0] + _verdadeira.equaC + cC[1];
        }
        else if(_verdadeira.formatoEqua == 1 && _verdadeira.equaA % _verdadeira.equaB == 0){
            equa =  _verdadeira.equaA / _verdadeira.equaB + _verdadeira.equaC;
            equacao = _verdadeira.equaA +" / "+ cB[0] + _verdadeira.equaB + cB[1] + " + "+ cC[0] + _verdadeira.equaC + cC[1] +" =  X";
        }
        else if(_verdadeira.formatoEqua == 2){

            equa = (_verdadeira.equaC - _verdadeira.equaB) / _verdadeira.equaA;
            equacao = _verdadeira.equaA + " * X +" + cB[0] + _verdadeira.equaB + cB[1] + " = " + cC[0] + _verdadeira.equaC + cC[1];
        }
        else if(_verdadeira.formatoEqua == 3 && (_verdadeira.equaC * _verdadeira.equaA - _verdadeira.equaB) % _verdadeira.equaA == 0){
            equa =  (_verdadeira.equaC - _verdadeira.equaB) * _verdadeira.equaA;
            equacao = " X /"+ cA[0] + _verdadeira.equaA + cA[1] + " + " + cB[0] + _verdadeira.equaB + cB[1] + " = "+ cC[0] + _verdadeira.equaC + cC[1];
        }
        else{
            erroEqua = true;
        }
    }
    this.verdadeira();
    equaConfere = parseInt(equa);
    if(equa != equaConfere || erroEqua || equacao == 0){
        level4();
    }
    else{
        if( 0 == parseInt(Math.random() *  2)){
            n1Ajuste = 1;
        }else{
            n1Ajuste = -1;
        }
        if( 0 == parseInt(Math.random() *  2)){
            n2Ajuste = 1;
        }else{
            n2Ajuste = -1;
        }
        _falsa1 = {
            equaA: 1 + parseInt(Math.random() * 9) * n1Ajuste,
            equaB: 1 + parseInt(Math.random() * 9),
        }
        falsa1 = {
            equa: _falsa1.equaA * _falsa1.equaB,
            ordem: parseInt(Math.random() * 3)
        }
        _falsa2 =  {
            equaA: 1 + parseInt(Math.random() * 9) * n2Ajuste,
            equaB: 1 + parseInt(Math.random() * 9),
        }
        falsa2 = {
            equa: _falsa2.equaA *_falsa2.equaB,
            ordem: parseInt(Math.random() * 3)
        }
        
        if(falsa1.equa == equa || falsa2.equa == equa || falsa2.equa == falsa1.equa){
            confir1 = false;
            level4();
        }
        else{
            confir1 = true;
        }
        if(falsa1.ordem == _verdadeira.ordem || falsa2.ordem == _verdadeira.ordem || falsa2.ordem == falsa1.ordem){
            confir2 = false;
            level4();
        }
        else{
            confir2 = true;
            if(confir1 == true && confir2 == true){
                if (_verdadeira.ordem == 1){
                    resultadosEquacao[0] = [equa,true];
                }
                else if(_verdadeira.ordem == 2){
                    resultadosEquacao[1] = [equa,true];
                }
                else if(_verdadeira.ordem = 3 || _verdadeira.ordem == 0){
                    resultadosEquacao[2] = [equa,true];
                }
                else{
                    alert('verdadeira, erro');
                }
                // 
                if(falsa1.ordem == 1){
                    resultadosEquacao[0] = [falsa1.equa, false];
                }
                else if(falsa1.ordem == 2){
                    resultadosEquacao[1] = [falsa1.equa, false];
                }
                else if(falsa1.ordem == 3 || falsa1.ordem == 0){
                    resultadosEquacao[2] = [falsa1.equa, false];
                }
                else{
                    alert('falsa1, erro');
                }
                // 
                if(falsa2.ordem == 1){
                    resultadosEquacao[0] = [falsa2.equa, false];
                }
                else if(falsa2.ordem == 2){
                    resultadosEquacao[1] = [falsa2.equa, false];
                }
                else if(falsa2.ordem == 3 || falsa2.ordem == 0){
                    resultadosEquacao[2] = [falsa2.equa, false];
                }
                else{
                    alert('falsa2, erro');
                }
                if(resultadosEquacao[0][2] == true || resultadosEquacao[1][2] == true || resultadosEquacao[2][2] == true){
                    level4();
                }
                resultadosEquacao0 = resultadosEquacao;
            }
        }
    }
}