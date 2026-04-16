const copyBtn = document.querySelector(".copy");

const css = (strings, ...values) => strings.raw.join("");
const ButtonState = Object.freeze({
  IDLE: "Copy",
  SUCCESS: "Copied!",
  ERROR: "Error",
});

const COPY_BUTTON_CONFIG = {
  blurOnClick: true,
  resetDelay: 1000,
};

const code = css`<style>
  .animated-gradient {
    position: fixed;
    inset: 0;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    z-index: -5;
    pointer-events: none;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>

<div class="animated-gradient"></div>
`;

const ClipboardManager = {
  async write(text) {
    return navigator.clipboard.writeText(text);
  },
};

function transitionButton(state, duration = COPY_BUTTON_CONFIG.resetDelay) {
  copyBtn.textContent = ButtonState[state];
  if (state !== "IDLE") setTimeout(() => transitionButton("IDLE"), duration);
}

async function copyCode() {
  try {
    await ClipboardManager.write(code);
    transitionButton("SUCCESS");
  } catch (err) {
    transitionButton("ERROR");
    console.error("Failed to copy: ", err);
  }
}

function init() {
  document.querySelector(".code-snippet").textContent = code;
  copyBtn.addEventListener("click", async (e) => {
    if (COPY_BUTTON_CONFIG.blurOnClick) e.currentTarget.blur();
    await copyCode();
  });
}

init();
