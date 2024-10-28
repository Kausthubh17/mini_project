function handleFormSubmit(event) {
    event.preventDefault(); 

    var category = document.getElementById('category').value;
    var stream = document.getElementById('Stream').value;

    var redirectUrl = '';

    if (category === 'UG' && stream === 'Medical') {
        redirectUrl = 'secondpage.html';
    } else if (category === 'UG' && stream === 'Engineering') {
        redirectUrl = 'ug-engineering.html';
    } else if (category === 'PG' && stream === 'Medical') {
        redirectUrl = 'pg-medical.html';
    } else if (category === 'PG' && stream === 'Engineering') {
        redirectUrl = 'pg-engineering.html';
    } else {
        redirectUrl = 'error.html';
    }

    window.location.href = redirectUrl;
}
