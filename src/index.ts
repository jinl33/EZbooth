import { 
  createSession,
  createViewport, 
} from "@shapediver/viewer";
import { createParameterMenu } from "./parameters";

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
  showPage('select-booth-page');
});

document.getElementById('next-to-shapeDiver')?.addEventListener('click', () => {
  showPage('viewer-page');
  initShapeDiver();
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
async function initShapeDiver() {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;

  // we create a viewport with the canvas element
  const viewport = await createViewport({
    canvas: canvasElement,
    // branding: {
    //   logo: "https://viewer.shapediver.com/v3/youtube/video1/catAstronaut.png",
    //   backgroundColor: "#008800",
    // },
  });

  // we create a session with the ticket and modelViewUrl of a model on the ShapeDiver platform
  const session = await createSession({
    ticket: "b4463958e0dc8b5e5b7d151189bc85d8cdb508361c1c9b91a3e06847274aa82a652c42823b2e8fc8b09f655b09fdf689141846aa97a0b145e0e09a101218a5f4fd27369b6bacf98083bfbffc9a907b724a8e0763efbd44f9063200594c5330c2809751da8826fe-362d860ee35d847ab65601c3deefddf6",
    modelViewUrl: "https://sdr8euc1.eu-central-1.shapediver.com",
  });

  createParameterMenu(session);

  // Optional: Show a busy mode or loader
  // viewport.addFlag(FLAG_TYPE.BUSY_MODE);
}
