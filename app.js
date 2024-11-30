let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Chute um número de 1 a 40');
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ?  'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
       if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
   let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumerosSorteadosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeNumerosSorteadosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
   }
   if(listaDeNumerosSorteados.includes(numeroSorteado)) {
        return numeroAleatorio();
   } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    let tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);    
}