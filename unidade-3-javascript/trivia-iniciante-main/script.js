/*
const enunciado = document.getElementById("enunciado");
enunciado.innerHTML = "Quem descobriu o Brasil?"

const frutas = ["banana", "limão", "pera", "jaca"];
console.log(frutas[2]);

const pergunta = {
    pergunta: "Qual o nome de batismo do Superman?",
    alternativas: ["Bruce Wayne", "Wally West", "Clark Kent", "Speedy Gonzales"],
    resposta: "Clark Kent"
}

const novaPergunta = {};

novaPergunta.pergunta = "Quantos npumeros diferentes podem ser representados em um bit?"

novaPergunta["resposta"] = 2; 
*/


/*
function soma (a, b) {
    return a + b;
}

const somaEmArrowFunction = (a, b) => a + b;


function somaDois(numero) {
    return numero + 2;
}

const somaDoisArrow = numero => numero + 2;


function pi() {
    return 3.14;
}

const piArrow = _ => 3.14;
*/

let rodada;
let numPergunta;

if (localStorage.getItem("rodada") === null) {
    rodada = 0;
    localStorage.setItem("rodada", rodada);
} else {
    rodada = localStorage.getItem("rodada");
}

const tabelaPontuacao = [
    { acertar: "R$ 1 mil", parar: "R$ 0", errar: "R$ 0" },
    { acertar: "R$ 2 mil", parar: "R$ 1 mil", errar: "R$ 500" },
    { acertar: "R$ 3 mil", parar: "R$ 2 mil", errar: "R$ 1 mil" },
    { acertar: "R$ 4 mil", parar: "R$ 3 mil", errar: "R$ 1.500" },
    { acertar: "R$ 5 mil", parar: "R$ 4 mil", errar: "R$ 2 mil" },
    { acertar: "R$ 10 mil", parar: "R$ 5 mil", errar: "R$ 2.500" },
    { acertar: "R$ 20 mil", parar: "R$ 10 mil", errar: "R$ 5 mil" },
    { acertar: "R$ 30 mil", parar: "R$ 20 mil", errar: "R$ 10 mil" },
    { acertar: "R$ 40 mil", parar: "R$ 30 mil", errar: "R$ 15 mil" },
    { acertar: "R$ 60 mil", parar: "R$ 40 mil", errar: "R$ 20 mil" },
    { acertar: "R$ 80 mil", parar: "R$ 60 mil", errar: "R$ 30 mil" },
    { acertar: "R$ 100 mil", parar: "R$ 80 mil", errar: "R$ 40 mil" },
    { acertar: "R$ 200 mil", parar: "R$ 100 mil", errar: "R$ 50 mil" },
    { acertar: "R$ 300 mil", parar: "R$ 200 mil", errar: "R$ 100 mil" },
    { acertar: "R$ 400 mil", parar: "R$ 300 mil", errar: "R$ 150 mil" },
    { acertar: "R$ 500 mil", parar: "R$ 400 mil", errar: "R$ 200 mil" },
    { acertar: "R$ 1 milhão", parar: "R$ 500 mil", errar: "R$ 0" },
];

// Captura os elementos do HTML
const alts = document.querySelectorAll(".alternativas .box");
const btnPerguntar = document.getElementById("btnPerguntar");
const btnParar = document.getElementById("btnParar");

const perguntas = [
    {
        enunciado: "Qual é o maior planeta do sistema solar?",
        alternativas: ["Júpiter", "Saturno", "Urano", "Netuno"],
        resposta: "Júpiter",
        pontos: 50,
        dificuldade: "Fácil"
    },
    {
        enunciado: "Qual é o menor planeta do sistema solar?",
        alternativas: ["Mercúrio", "Vênus", "Marte", "Plutão"],
        resposta: "Mercúrio",
        pontos: 60,
        dificuldade: "Fácil"
    },
];


/*
const perguntasFaceis = perguntas.filter((perg) => perg.dificuldade === "Fácil");
const arrayPerguntas = perguntas.map((perg) => ({
    pergunta: perg.enunciado,
    alt1: perg.alternativas[0],
    alt2: perg.alternativas[1],
    alt3: perg.alternativas[2],
    alt4: perg.alternativas[3]
}))
*/

const enunciado = document.getElementById("enunciado");

const alternativa1 = document.querySelector(".alternativa1");
const alternativa2 = document.querySelector(".alternativa2");
const alternativa3 = document.querySelector(".alternativa3");
const alternativa4 = document.querySelector(".alternativa4");


function exibePergunta(numero) {
    enunciado.innerText = perguntas[numero].enunciado;
    [
        alternativa1.innerText,
        alternativa2.innerText,
        alternativa3.innerText,
        alternativa4.innerText
    ] = perguntas[numero].alternativas;

}


const boxErrar = document.querySelector(".pontuacao .errar");
const boxParar = document.querySelector(".pontuacao .parar");
const boxAcertar = document.querySelector(".pontuacao .acertar");
const mensagem = document.querySelector(".right");

alts.forEach((box) => {
    box.addEventListener("click", (event) => {
        document.querySelector(".selecionada")?.classList.remove("selecionada");
        event.target.classList.add("selecionada");
        btnPerguntar.disabled = false;
        mensagem.innerText = "";
    });
});

// Gera um número aleatório entre 0 e o total de perguntas
const geraNumeroAleatorio = () => Math.floor(Math.random() * perguntas.length)

if (localStorage.getItem("numPergunta") === null) {
    numPergunta = geraNumeroAleatorio();
    localStorage.setItem("numPergunta", numPergunta);
} else {
    numPergunta = localStorage.getItem("numPergunta");
}

exibePergunta(geraNumeroAleatorio());

/*
localStorage.setItem('pontuacao', 30);

localStorage['perguntaAtual'] = 'Qual é o maior planeta do sistema solar?'

localStorage.resposta = 'Jupiter'
*/

// Define o comportamento do botão Parar
btnParar.addEventListener("click", () => {
    delete localStorage.rodada;
    delete localStorage.numPergunta;

    mensagem.innerText = "Você paarou o jogo!\nGanhou " + boxParar.innerHTML;
    rodada = 0;
    proximaPergunta();
})


// Define o comportamento do botão Perguntar
btnPerguntar.addEventListener("click", () => {
    if (document.querySelector(".selecionada") === null) {
        mensagem.innerText = "Selecione uma alternativa!"
        return;
    }

    const resposta = perguntas[numPergunta].resposta;

    const alternativa = document.querySelector(".selecionada").innerHTML;

    if (resposta === alternativa) {
        mensagem.innerText = "Você acertou!\nGanhou" + boxAcertar.innerHTML;
        rodada++;
        localStorage.rodada = rodada;
    } else {
        mensagem.innerText = "Você errou!\nGanhou" + boxErrar.innerHTML;
        delete localStorage.rodada;
        rodada = 0;

    }

    proximaPergunta();
});


const proximaPergunta = () => {
    numPergunta = geraNumeroAleatorio();
    localStorage.numPergunta = numPergunta;
    exibePergunta(numPergunta)
}