const text = "This is a simple project in which I decided to make a website. The website's goal is to show the user a graph of a specific stock which the user can choose. Along with a graph, after choosing a stock, the user can also view some recent news about the stock as well. More stuff/features will be added soon.";
const delay = 8; // Delay between each letter in milliseconds

const typewriter = document.getElementById('AboutText');
let index = 0;

function typeText() {
  if (index < text.length) {
    typewriter.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, delay);
  }
}

typeText();