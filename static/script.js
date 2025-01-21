const apiUrl = 'https://web-production-8985.up.railway.app/'; // Ganti dengan URL backend Anda

async function predict() {
    const fileInput = document.getElementById('file-input');
    const formData = new FormData();

    if (fileInput.files.length === 0) {
        alert('Please upload a file!');
        return;
    }

    formData.append('foto', fileInput.files[0]);

    try {
        const response = await fetch(`${apiUrl}/predict`, {
            method: 'POST', // Gunakan metode POST
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const result = await response.json();

        // Tampilkan hasil prediksi
        document.getElementById('prediction-result').textContent = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error(error);
        alert('An error occurred while predicting. Please try again.');
    }
}
