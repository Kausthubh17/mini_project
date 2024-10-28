document.getElementById('collegeForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const courseType = document.getElementById('courseType').value;
    const streamType = document.getElementById('streamType').value;
    const rank = document.getElementById('rank').value;

    const response = await fetch('/find-college', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseType, streamType, rank })
    });

    const data = await response.json();
    displayResults(data);
});

function displayResults(colleges) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Available Colleges</h2>';

    colleges.forEach(college => {
        resultsDiv.innerHTML += `<p>${college.name} - ${college.location}</p>`;
    });
}
