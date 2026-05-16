const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");
const alertaEstudo = document.getElementById("alertaEstudo");
const fecharAlertaEstudo = document.getElementById("fecharAlertaEstudo");
const alertaPausa = document.getElementById("alertaPausa");
const fecharAlertaPausa = document.getElementById("fecharAlertaPausa");
const alarme = document.getElementById("alarme");

// tempoInicial guarda o tempo que o usuario definiu para o estudo
// assim quando resetar ou recomecar, voltamos para esse valor
let tempoInicial = 25 * 60;
let tempoRestante = tempoInicial;
let intervalo = null;
let rodando = false;

// "fase" controla em qual etapa o timer esta agora
// "estudo" -> contador de trabalho | "pausa" -> contador de descanso
let fase = "estudo";

const TEMPO_PAUSA = 5 * 60; // 5 minutos de pausa


// --- DISPLAY ---

function atualizarDisplay() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  timerDisplay.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}


// --- ALARME ---

function tocarAlarme() {
  alarme.currentTime = 0;
  alarme.play();
}

function pararAlarme() {
  alarme.pause();
  alarme.currentTime = 0;
}


// --- ALERTAS ---

function mostrarAlertaEstudo() {
  alertaEstudo.classList.remove("escondido");
  tocarAlarme();
}

function mostrarAlertaPausa() {
  alertaPausa.classList.remove("escondido");
  tocarAlarme();
}

// Ao clicar OK no alerta de fim de estudo: esconde o alerta e inicia a pausa
fecharAlertaEstudo.addEventListener("click", () => {
  alertaEstudo.classList.add("escondido");
  pararAlarme();
  iniciarPausa();
});

// Ao clicar "Continuar estudando" no alerta de fim de pausa: volta ao estudo
fecharAlertaPausa.addEventListener("click", () => {
  alertaPausa.classList.add("escondido");
  pararAlarme();
  reiniciarEstudo();
});


// --- LOGICA DO TIMER ---

function iniciarTimer() {
  if (rodando) return; // evita iniciar duas vezes ao mesmo tempo
  rodando = true;

  intervalo = setInterval(() => {
    if (tempoRestante > 0) {
      tempoRestante--;
      atualizarDisplay();
    } else {
      clearInterval(intervalo);
      rodando = false;

      // O que acontece ao zerar depende da fase atual
      if (fase === "estudo") {
        mostrarAlertaEstudo();
      } else {
        mostrarAlertaPausa();
      }
    }
  }, 1000);
}

function iniciarPausa() {
  fase = "pausa";
  tempoRestante = TEMPO_PAUSA;
  atualizarDisplay();
  iniciarTimer(); // começa o timer automaticamente na pausa
}

function reiniciarEstudo() {
  fase = "estudo";
  tempoRestante = tempoInicial; // volta ao tempo original definido pelo usuario
  atualizarDisplay();
  iniciarTimer(); // começa o estudo automaticamente
}

function pausarTimer() {
  if (rodando) {
    clearInterval(intervalo);
    rodando = false;
  }
}

function resetarTimer() {
  clearInterval(intervalo);
  rodando = false;
  fase = "estudo";
  tempoRestante = tempoInicial;
  atualizarDisplay();
}


// --- AJUSTE DE TEMPO (so funciona quando parado e em fase de estudo) ---

addBtn.addEventListener("click", () => {
  if (!rodando && fase === "estudo") {
    tempoRestante += 60;
    tempoInicial = tempoRestante;
    atualizarDisplay();
  }
});

removeBtn.addEventListener("click", () => {
  if (!rodando && fase === "estudo" && tempoRestante > 60) {
    tempoRestante -= 60;
    tempoInicial = tempoRestante;
    atualizarDisplay();
  }
});


// --- EVENTOS DOS BOTOES ---

startBtn.addEventListener("click", iniciarTimer);
pauseBtn.addEventListener("click", pausarTimer);
resetBtn.addEventListener("click", resetarTimer);

// Mostra o tempo inicial na tela ao carregar a pagina
atualizarDisplay();

// Registra o Service Worker para habilitar o modo PWA (instalar como app)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
