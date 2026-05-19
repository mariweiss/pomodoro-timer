# 🍅 Pomodoro Timer 🍅

Um timer Pomodoro simples e funcional feito com HTML, CSS e JavaScript puro — sem frameworks ou dependências externas.

Desenvolvido como projeto de prática de desenvolvimento web front-end.

---

## Funcionalidades

- **Timer ajustável:** use os botões `+` e `−` para definir o tempo de estudo (padrão: 25 minutos)
- **Controles:** Iniciar, Pausar e Resetar
- **Alarme sonoro:** toca quando o tempo acaba
- **Fluxo automático de pausa:**
  - Ao fim do estudo → alerta + início automático da pausa (5 min)
  - Ao fim da pausa → alerta + botão para retomar o estudo
- **PWA (Progressive Web App):** pode ser instalado pelo navegador e usado como app de desktop

---

## Como usar

### No navegador
Abra o arquivo `index.html` diretamente no navegador ou use um servidor local.

### Como PWA (app instalável)
1. Abra o projeto com um servidor HTTP local (ex: extensão **Live Server** do VS Code)
2. No Chrome ou Edge, clique no ícone de instalação na barra de endereços
3. O app será instalado e poderá ser aberto como um programa normal

---

## Estrutura do projeto

```
pomodoro/
├── index.html      # Estrutura da página
├── style.css       # Estilos visuais
├── script.js       # Lógica do timer e fluxo de estados
├── manifest.json   # Configuração do PWA
├── sw.js           # Service Worker (cache offline)
├── alarm.mp3       # Som do alarme
├── icon-192.png    # Ícone do app (192x192)
└── icon-512.png    # Ícone do app (512x512)
```

---

## Tecnologias

- HTML5
- CSS3 (Flexbox)
- JavaScript (ES6+)
- Web APIs: `setInterval`, `Audio`, `Service Worker`, `Cache API`

---

## Fluxo da aplicação

```
[Estudo] → timer zera → alerta + alarme
    → clica OK → [Pausa 5min] → timer zera → alerta + alarme
    → clica "Continuar" → [Estudo] → ...
```
