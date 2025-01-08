// Function to open the full-page PDF viewer
function openFullPage(pdfUrl) {
    const fullPageViewer = document.getElementById('fullPageViewer');
    const pdfFrame = document.getElementById('pdfFrame');

    // Check if the PDF URL is valid
    if (!pdfUrl) {
        alert("PDF file path is missing or incorrect.");
        return;
    }

    // Set the PDF URL and display the full-page viewer
    pdfFrame.src = pdfUrl;
    fullPageViewer.style.display = 'flex';
}

// Function to close the full-page PDF viewer
function closeFullPage() {
    const fullPageViewer = document.getElementById('fullPageViewer');
    const pdfFrame
    = document.getElementById('pdfFrame');

    // Hide the full-page viewer
    fullPageViewer.style.display = 'none';
}