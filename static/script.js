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
        // Kirim file ke backend Flask
        const response = await fetch(`${apiUrl}/predict`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch prediction. Please try again.');
        }

        const result = await response.json();

        // Update hasil prediksi di halaman
        document.getElementById('prediction-result').textContent = `Prediction: ${result.prediction}`;
        const imageContainer = document.getElementById('uploaded-image-container');
        const uploadedImage = document.getElementById('uploaded-image');
        uploadedImage.src = `${apiUrl}/${result.image_path}`; // Ganti path sesuai backend
        imageContainer.style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('An error occurred while predicting. Please try again.');
    }
}
