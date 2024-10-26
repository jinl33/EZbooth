import { 
  createSession,
  createViewport, 
} from "@shapediver/viewer";
import { createParameterMenu } from "./parameters";

// Variable to store selected country
let selectedCountry: string = "";

// Navigation functions
function showPage(pageId: string) {
  // Hide all pages
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  // Show the selected page
  document.getElementById(pageId)?.classList.add('active');
}

// Add event listeners for navigation buttons
document.getElementById('next-to-booth')?.addEventListener('click', () => {
  // Get selected country value from dropdown
  const countrySelect = document.getElementById('country-select') as HTMLSelectElement;
  selectedCountry = countrySelect.value; // Store the selected country value
  console.log(`Selected Country: ${selectedCountry}`); // Optional: Log the value for debugging

  showPage('select-booth-page');
});

document.getElementById('next-to-shapeDiver')?.addEventListener('click', () => {
  showPage('viewer-page');
  initShapeDiver(selectedCountry); // Pass the selected country to initShapeDiver
});

document.getElementById('back-to-country')?.addEventListener('click', () => {
  showPage('select-country-page');
});

document.getElementById('back-to-booth')?.addEventListener('click', () => {
  showPage('select-booth-page');
});

// Initial page setup
showPage('select-country-page');

// Function to initialize ShapeDiver after clicking 'Next' on booth selection
async function initShapeDiver(country: string) {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;

  // Create a viewport with the canvas element
  const viewport = await createViewport({
    canvas: canvasElement,
    // branding: {
    //   logo: "https://viewer.shapediver.com/v3/youtube/video1/catAstronaut.png",
    //   backgroundColor: "#ffffff",
    // },
  });

  // Create a session with the ticket and modelViewUrl of a model on the ShapeDiver platform
  const session = await createSession({
    ticket: "19650631f487adb09d6bbff01c51565eef9855377c2fbf8bda09ad2857b3201095802634ccadb616ff8d1c76897181535200961fc264c0b58e47b24fd9d36ef9a1eac188d65e0c111eef9797441eda363a19024ba648c7d9d4184d3cb2dfc39ba333e48fdf83c5-ec06a91082cbf5a66cdc90a7ae8b72ae",
    modelViewUrl: "https://sdr8euc1.eu-central-1.shapediver.com",
  });

  // Update the 'Booth Height' parameter if Kintex, Goyang is selected
  if (selectedCountry === 'kintex') {
    session.getParameterByName('Booth Height')[0].value = 3500;
    session.customize();
  }

  createParameterMenu(session);

  // Optional: Show a busy mode or loader
  // viewport.addFlag(FLAG_TYPE.BUSY_MODE);
}
