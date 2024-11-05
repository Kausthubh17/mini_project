document.getElementById('examStatus').addEventListener('change', function () {
    const examStatus = this.value;
    document.getElementById('Yes').style.display = examStatus === 'yes' ? 'block' : 'none';
    document.getElementById('No').style.display = examStatus === 'no' ? 'block' : 'none';
});

document.getElementById('examStatusForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const examStatus = document.getElementById('examStatus').value;
    const outputDiv = document.getElementById('backend-output');
    const outputMessage = document.getElementById('output-message');
    const loadingMessage = document.getElementById('loading-message'); // Ensure this element is present in your HTML

    outputDiv.style.display = 'none'; // Hide output initially
    loadingMessage.style.display = 'block'; // Show loading message

    try {
        let response, data;

        if (examStatus === 'yes') {
            const rank = document.getElementById('rank').value;
            const category = document.getElementById('categoryRank').value;
            response = await fetch(`/colleges-by-rank?rank=${rank}&category=${category}`);
        } else {
            const name = document.getElementById('collegeName').value;
            const branch = document.getElementById('branch').value;
            const category = document.getElementById('categoryBranch').value;
            response = await fetch(`/colleges-by-branch?name=${name}&branch=${branch}&category=${category}`);
        }

        if (!response.ok) throw new Error('Failed to fetch data');

        data = await response.json();
        displayOutputInForm(data, examStatus);
    } catch (error) {
        console.error('Error fetching data:', error);
        outputMessage.textContent = 'Error fetching data from the server. Please try again later.';
        outputDiv.style.display = 'block';
    } finally {
        loadingMessage.style.display = 'none'; // Hide loading message
    }
});

let currentPage = 0; // To keep track of the current page
const rowsPerPage = 10; // Number of rows to display per page

function displayOutputInForm(data, examStatus) {
    const outputMessage = document.getElementById('output-message');
    const outputDiv = document.getElementById('backend-output');

    if (examStatus === 'yes') {
        if (data.length === 0) {
            outputMessage.textContent = 'No colleges found for the given rank and category.';
        } else {
            const totalPages = Math.ceil(data.length / rowsPerPage);
            const start = currentPage * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = data.slice(start, end); // Get the current page data

            // Create a table to display results
            const resultsTable = `
        <table>
            <thead>
                <tr>
                    <th>College Name</th>
                    <th>Branch</th>
                </tr>
            </thead>
            <tbody>
                ${paginatedData.map(college => `
                    <tr>
                        <td>${college.name}</td>
                        <td>${college.branch || 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

            outputMessage.innerHTML = resultsTable; // Use innerHTML to insert the table

            // Create pagination controls
            const paginationControls = `
        <div id="pagination-controls">
            ${currentPage > 0 ? '<button id="prev-button">Previous</button>' : ''}
            ${currentPage < totalPages - 1 ? '<button id="next-button">Next</button>' : ''}
        </div>
    `;
            outputMessage.innerHTML += paginationControls;

            // Add event listeners for pagination buttons
            if (currentPage > 0) {
                document.getElementById('prev-button').addEventListener('click', () => {
                    currentPage--;
                    displayOutputInForm(data, examStatus); // Re-display with updated page
                });
            }
            if (currentPage < totalPages - 1) {
                document.getElementById('next-button').addEventListener('click', () => {
                    currentPage++;
                    displayOutputInForm(data, examStatus); // Re-display with updated page
                });
            }
        }
    } else {
        if (!data.categoryValue) {
            outputMessage.textContent = 'College not found or category data missing.';
        } else {
            outputMessage.textContent = `Cutoff Rank for Category: ${data.categoryValue}`;
        }
    }

    outputDiv.style.display = 'block'; // Show the output section
}

