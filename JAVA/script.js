// Espera o DOM (Document Object Model) estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
// Seleciona o botão do menu toggle
const menuToggle = document.querySelector('.menu-toggle');

// Seleciona o elemento body
const body = document.body;

// Adiciona um 'ouvinte de evento' (event listener) para o clique no botão
menuToggle.addEventListener('click', function() {
// Alterna (adiciona/remove) a classe 'menu-is-open' no body
body.classList.toggle('menu-is-open');

// Atualiza aria-expanded para acessibilidade
const isExpanded = body.classList.contains('menu-is-open');
this.setAttribute('aria-expanded', isExpanded);
});

// Fechar o menu ao clicar em um link
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
link.addEventListener('click', function() {
body.classList.remove('menu-is-open');
menuToggle.setAttribute('aria-expanded', 'false');
});
});

// Menu fixo que se move para a direita ao rolar - SOMENTE PARA TELAS PEQUENAS
window.addEventListener('scroll', function() {
const menuIsOpen = body.classList.contains('menu-is-open');

// Aplica o comportamento de scroll para o menu-toggle APENAS se a tela for menor que 708px
if (window.innerWidth < 708) {
    if (window.scrollY > 100 && !menuIsOpen) {
        menuToggle.classList.add('scrolled');
        menuToggle.style.left = 'auto';
        menuToggle.style.right = '0';
        menuToggle.style.transform = 'translateX(0)';
    } else if (window.scrollY <= 100 && !menuIsOpen) {
        menuToggle.classList.remove('scrolled');
        menuToggle.style.left = '50%';
        menuToggle.style.right = 'auto';
        menuToggle.style.transform = 'translateX(-50%)';
    }
} else {
    // Para telas maiores ou iguais a 708px, remove a classe 'scrolled' e limpa estilos inline
    // Isso garante que as regras CSS do media query assumam o controle total.
    menuToggle.classList.remove('scrolled');
    menuToggle.style.left = '';
    menuToggle.style.right = '';
    menuToggle.style.transform = '';
}
});

// Animação de texto com entrada alternada respeitando regras gramaticais
function animateTextEntrance() {
// Seleciona os elementos de texto que queremos animar
const heading1 = document.querySelector('.grupo_texto01 h1');
const heading2 = document.querySelector('.grupo_texto01 h2');
const paragraph = document.querySelector('.grupo_texto01 p');

// Verifica se os elementos existem na página
if (!heading1 || !heading2 || !paragraph) return;

// Obtém a cor amarela exata do parágrafo (ou usa yellow como fallback)
let yellowColor = 'yellow';
try {
const computedStyle = window.getComputedStyle(paragraph);
yellowColor = computedStyle.color || 'yellow';
} catch(e) {
console.log('Erro ao obter cor:', e);
}

// Função para dividir o texto em unidades sintáticas (frases ou sintagmas)
function splitTextIntoSyntacticUnits(element) {
// Preserva o texto original e o conteúdo HTML
const originalHTML = element.innerHTML;

// Determina as unidades sintáticas com base no tipo de elemento
let units = [];

if (element === heading1) {
// Primeiro, vamos preservar o conteúdo original
const originalContent = element.innerHTML;

// Limpa o conteúdo do elemento
element.innerHTML = '';

// Para o h1: Verificamos se contém "Olá!!!" e o ícone
if (originalContent.includes('Olá') && originalContent.includes('icon-profile')) {
// Criamos o span para "Olá!!!!"
const olaPart = document.createElement('span');
olaPart.textContent = "Olá!!!! ";
olaPart.style.display = 'inline-block';
olaPart.style.opacity = '0';
olaPart.style.transform = 'translateX(-50px)';
olaPart.style.transition = 'all 0.6s ease-out';
element.appendChild(olaPart);
// Adiciona a mão acenando como elemento separado
const wavingHand = document.createElement('span');
wavingHand.className = 'waving-hand';
wavingHand.innerHTML = '👋'; // Emoji de mão acenando
wavingHand.setAttribute('aria-hidden', 'true'); // Melhora acessibilidade
wavingHand.style.display = 'inline-block';
wavingHand.style.color = yellowColor; // Usa a mesma cor do parágrafo
wavingHand.style.fontSize = '1.2em'; // Ligeiramente maior que o texto
wavingHand.style.margin = '0 3px'; // Pequena margem horizontal
wavingHand.style.verticalAlign = 'middle';
wavingHand.style.opacity = '0';
wavingHand.style.position = 'relative';
element.appendChild(wavingHand);

// Adiciona o ícone como parte do fluxo
const iconSpan = document.createElement('span');
iconSpan.className = 'icon-profile';
iconSpan.setAttribute('aria-hidden', 'true'); // Melhora acessibilidade
iconSpan.style.display = 'inline-block';
iconSpan.style.verticalAlign = 'middle';
iconSpan.style.margin = '0 3px';
element.appendChild(iconSpan);

// Adiciona o restante do texto como parte do mesmo fluxo
const restPart = document.createElement('span');
restPart.textContent = " Somos A Em5, Seja Bem Vindo";
restPart.style.display = 'inline-block';
restPart.style.opacity = '0';
restPart.style.transform = 'translateX(50px)';
restPart.style.transition = 'all 0.6s ease-out';
element.appendChild(restPart);

// Anima a mão acenando após um atraso usando requestAnimationFrame para
// melhor performance
setTimeout(() => {
requestAnimationFrame(() => {
wavingHand.style.opacity = '1';
wavingHand.classList.add('waving');
});
}, 600); // Aparece após o "Olá!!!!"

// Armazena a referência da mão para uso posterior
window.wavingHandElement = wavingHand;

return [olaPart, restPart]; // Retorna os spans criados (excluindo o ícone e a mão)
} else {
// Se não encontrarmos o padrão esperado, restauramos o conteúdo original
element.innerHTML = originalHTML;
return [];
}
} else if (element === heading2) {
// Limpa o conteúdo do elemento
element.innerHTML = '';

// Para o h2: "A Mais Incrível Gráfica Do Brasil."
units = [
"A Mais Incrível",
"Gráfica",
"Do Brasil."
];

// Cria spans para cada unidade
const spans = [];
units.forEach((unit, index) => {
const span = document.createElement('span');
span.textContent = unit + ' ';
span.style.display = 'inline-block';
span.style.opacity = '0';
span.style.transform = index % 2 === 0 ?
'translateX(-50px)' : 'translateX(50px)';
span.style.transition = 'all 0.6s ease-out';
element.appendChild(span);
spans.push(span);
});

return spans;
} else if (element === paragraph) {
// Limpa o conteúdo do elemento
element.innerHTML = '';

// Para o parágrafo: "Fique A Vontade Para Navegar E Saber Porquê"
units = [
"Fique A Vontade",
"Para Navegar",
"E Saber Porquê"
];

// Cria spans para cada unidade
const spans = [];
units.forEach((unit, index) => {
const span = document.createElement('span');
span.textContent = unit + ' ';
span.style.display = 'inline-block';
span.style.opacity = '0';
span.style.transform = index % 2 === 0 ?
'translateX(-50px)' : 'translateX(50px)';
span.style.transition = 'all 0.6s ease-out';
element.appendChild(span);
spans.push(span);
});

return spans;
}

// Se chegamos aqui, não foi possível processar o elemento
element.innerHTML = originalHTML;
return [];
}

// Divide os textos em unidades sintáticas
const h1Spans = splitTextIntoSyntacticUnits(heading1);
const h2Spans = splitTextIntoSyntacticUnits(heading2);
const pSpans = splitTextIntoSyntacticUnits(paragraph);

// Função para animar a entrada de um span usando requestAnimationFrame para melhor
// performance
function animateSpan(span, delay) {
setTimeout(() => {
requestAnimationFrame(() => {
span.style.opacity = '1';
span.style.transform = 'translateX(0)';
});
}, delay);
}

// Anima os spans com tempos intercalados
// Primeiro grupo (h1) - da esquerda
h1Spans.forEach((span, index) => {
const delay = 200 + (index * 200); // Mais tempo entre cada unidade
animateSpan(span, delay);
});

// Segundo grupo (h2) - da direita
const h2StartDelay = 200 + (h1Spans.length * 200) + 300; // Espera o h1 terminar + pausa
h2Spans.forEach((span, index) => {
const delay = h2StartDelay + (index * 200);
animateSpan(span, delay);
});

// Terceiro grupo (p) - da esquerda
const pStartDelay = h2StartDelay + (h2Spans.length * 200) + 300; // Espera o h2 terminar
// + pausa
pSpans.forEach((span, index) => {
const delay = pStartDelay + (index * 200);
animateSpan(span, delay);
});
}

// Executa a animação quando a página carrega
// Pequeno atraso para garantir que todos os elementos estejam renderizados
setTimeout(animateTextEntrance, 300);
});