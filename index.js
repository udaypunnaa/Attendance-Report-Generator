document.addEventListener("DOMContentLoaded", function () {
    const reportDiv = document.getElementById("Report");
    const totalStrength = 63;

    function updateReport() {
        let totalAbsentees = 0;
        let absentNumbers = {
            H: [], J: [], K: [], L: [], M: [], N: [], LE: []
        };

        document.querySelectorAll("input[type='radio']:checked").forEach(radio => {
            let label = radio.nextElementSibling.innerText.trim();
            let category = radio.getAttribute('data-category');
            absentNumbers[category].push(label);
        });

        totalAbsentees = Object.values(absentNumbers).reduce((sum, arr) => sum + arr.length, 0);
        let totalPresentees = totalStrength - totalAbsentees;

        const date = document.querySelector("input[type='date']").value;
        const formattedDate = formatDate(date); // Format the date to DD-MM-YYYY

        reportDiv.innerHTML = `
            <h6>Class : 2-CSE-4</h6>
            <h6>Date : ${formattedDate}</h6>
            <h6>Day : ${document.querySelector("select").value}</h6>
            <h6>TOTAL STRENGTH : ${totalStrength}</h6>
            <h6>No of Presentees : ${totalPresentees}</h6>
            <h6>No of Absentees : ${totalAbsentees}</h6>
            <h6>Roll Number's:</h6>
            ${Object.entries(absentNumbers).map(([key, value]) => `<p>${key} : ${value.join(", ")}</p>`).join("")}
        `;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Clipboard function
    function copyToClipboard() {
        const reportText = reportDiv.innerText; // Get the text content of the report
        const textArea = document.createElement("textarea");
        textArea.value = reportText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Report copied to clipboard!");
    }

    // Event listeners
    document.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", updateReport);
    });

    document.querySelector("input[type='date']").addEventListener("change", updateReport);
    document.querySelector("select").addEventListener("change", updateReport);

    // Clipboard button listener
    document.getElementById("clipboardBtn").addEventListener("click", copyToClipboard);
});
