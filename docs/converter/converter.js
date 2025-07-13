function handleFile() {
    const input = document.getElementById("wordFile");
    const fileSize = document.getElementById("fileSize");
    fileSize.textContent = "";
    if (input.files.length === 0) {
        alert("Please select a file");
        return;
    }
    fileSize.textContent = "File size: " + input.files[0].size + " bytes";

    const reader = new FileReader();
    reader.onload = function(event) {
        mammoth.extractRawText({ arrayBuffer: event.target.result })
            .then(function(result) {
                createPDF(result.value);
                showPopup("popup"); // Show success popup
            })
            .catch(function(err) {
                showPopup("popupError"); // Show error popup
            });
    };
    reader.readAsArrayBuffer(input.files[0]);
}

function createPDF(text) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save("converted.pdf");
}

// Generic function to show a popup by ID
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "block";
    }
}

// Hide popups when close buttons are clicked or when clicking outside
document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.getElementById("closePopup");
    if (closeBtn) {
        closeBtn.onclick = function() {
            document.getElementById("popup").style.display = "none";
        }
    }
    const closeBtnError = document.getElementById("closePopupError");
    if (closeBtnError) {
        closeBtnError.onclick = function() {
            document.getElementById("popupError").style.display = "none";
        }
    }
    window.onclick = function(event) {
        const popup = document.getElementById("popup");
        const popupError = document.getElementById("popupError");
        if (event.target === popup) {
            popup.style.display = "none";
        }
        if (event.target === popupError) {
            popupError.style.display = "none";
        }
    }
     const chooseFileBtn = document.getElementById("chooseFileBtn");
     const wordFileInput = document.getElementById("wordFile");
     const selectedFileSpan = document.getElementById("selectedFile");

     if( chooseFileBtn && wordFileInput && selectedFileSpan){
        chooseFileBtn.onclick = function(){
            wordFileInput.click();

        };
        wordFileInput.onchange = function(){
            if(wordFileInput.files.length > 0){
                selectedFileSpan.textContent = wordFileInput.files[0].name;
            }
            else {
                selectedFileSpan.textContent = "No file chosen"
            }
        }
     }
});