const copyBtn = document.querySelector(".copy");

const code = `<!doctype html>
<html>
  <head>
    <title>Animated Gradient</title>
    <style>
      body {
        min-height: 100vh;
      }

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
  </head>
  <body>
    <div class="animated-gradient"></div>
  </body>
</html>
`;

async function copyCode() {
  try {
    await navigator.clipboard.writeText(code);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
  } catch (err) {
    copyBtn.textContent = "Error";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
    console.error("Failed to copy: ", err);
  }
}
copyBtn.addEventListener("click", (e) => {
  copyCode();
  e.currentTarget.blur();
});
