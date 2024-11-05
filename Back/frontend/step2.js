
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

function displayOutputInForm(data, examStatus) {
    const outputMessage = document.getElementById('output-message');
    const outputDiv = document.getElementById('backend-output');

    if (examStatus === 'yes') {
        if (data.length === 0) {
            outputMessage.textContent = 'No colleges found for the given rank and category.';
        } else {
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
                        ${data.map(college => `
                            <tr>
                                <td>${college.name}</td>
                                <td>${college.branch || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            outputMessage.innerHTML = resultsTable; // Use innerHTML to insert the table
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

const data = {
    "courses": [
      "Computer Science and Engineering",
      "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
      "Computer Science and Engineering (Cyber Security)",
      "Electronics and Communication Engineering",
      "Artificial Intelligence and Machine Learning",
      "Computer Science and Engineering (Data Science)",
      "Artificial Intelligence and Data Science",
      "CSE (IoT and Cyber Security Including Block Chain Technology)",
      "Information Technology",
      "Computer Science and Engineering (IoT)",
      "Computer Science and Business System",
      "Computer Science and Information Technology",
      "Computer Science and Engineering (Artificial Intelligence)",
      "Electrical and Electronics Engineering",
      "Artificial Intelligence",
      "Mechanical Engineering",
      "Civil Engineering",
      "Computer Science",
      "Electronics and Instrumentation Engineering",
      "Chemical Engineering",
      "Bio-Medical Engineering",
      "Computer Engineering",
      "Computer Science & Engineering (Networks)",
      "BTech Mechanical with MTech Thermal Engineering",
      "Aeronautical Engineering",
      "Food Technology",
      "Bio-Technology",
      "Automobile Engineering",
      "Mining Engineering",
      "Agricultural Engineering",
      "Mechanical (Mechatronics) Engineering",
      "BTech Mechanical with MTech Manufacturing Systems",
      "Geo Informatics",
      "Electronics Communication and Instrumentation Engineering",
      "Electronics and Computer Engineering",
      "Computer Science & Design",
      "Digital Techniques for Design and Planning",
      "Metallurgy and Material Engineering",
      "Computer Engineering (Software Engineering)",
      "Pharmaceutical Engineering",
      "Dairying",
      "Metallurgical Engineering",
      "Textile Engineering",
      "Textile Technology",
      "Textile Technology / Textile Engineering",
      "Electronics and Telematics"
    ]
  };

  const courseDropdown = document.getElementById('branch');

  data.courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    courseDropdown.appendChild(option);
  });



  const colleges = [
    "A C E ENGINEERING COLLEGE (AUTONOMOUS)",
    "AAR MAHAVEER ENGINEERING COLLEGE",
    "ABDULKALAM INST OF TECHNOLOGY AND SCI",
    "ANNAMACHARYA INST OF TECHNOLOGY AND SCI",
    "ANU BOSE INSTT OF TECHNOLOGY",
    "ANURAG ENGINEERING COLLEGE AUTONOMOUS",
    "ANURAG UNIVERSITY (FORMERLY ANURAG GRP OF INSTNS- CVSR COLL OF ENGG)",
    "ARJUN COLLEGE OF TECHNOLOGY AND SCIENCE",
    "AURORAS SCIENTIFIC AND TECHNOLOGICAL INSTITUTE",
    "AVANTHI INST OF ENGG AND TECHNOLOGY",
    "AVANTHIS SCIENTIFIC TECH AND RESEARCH ACADEMY",
    "AVN INST OF ENGG TECHNOLOGY (AUTONOMOUS)",
    "B V RAJU INSTITUTE OF TECHNOLOGY",
    "BALAJI INSTITUTE OF TECHNOLOGY AND SCI (AUTONOMOUS)",
    "BHARAT INSTITUTE OF ENGG AND TECHNOLOGY",
    "BHASKAR ENGINEERING COLLEGE",
    "BHOJREDDY ENGINEERING COLLEGE FOR WOMEN",
    "BOMMA INST OF TECHNOLOGY AND SCI",
    "BRILLIANT GRAMMER SCHOOL EDNL SOC GRP OF INSTNS",
    "BRILLIANT INSTT OF ENGG AND TECHNOLOGY",
    "BVRIT COLLEGE OF ENGINEERING FOR WOMEN (AUTONOMOUS)",
    "C M R COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "CHAITANYA BHARATHI INSTITUTE OF TECHNOLOGY",
    "CMR ENGG COLLEGE (AUTONOMOUS)",
    "CMR INSTITUTE OF TECHNOLOGY (AUTONOMOUS)",
    "CMR TECHNICAL CAMPUS (AUTONOMOUS)",
    "COLLEGE OF AGRICULTURAL ENGG",
    "COLLEGE OF DAIRY TECHNOLOGY",
    "COLLEGE OF FOOD SCIENCE AND TECHNOLOGY",
    "CVR COLLEGE OF ENGINEERING",
    "D R K COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "D R K INSTITUTE OF SCI AND TECHNOLOGY",
    "DARIPALLY ANANTHA RAMULU COLLOF ENGGAND TECH",
    "ELLENKI COLLGE OF ENGG AND TECHNOLOGY",
    "G NARAYNAMMA INSTITUTE OF TECHNOLOGY AND SCI",
    "GANAPATHI ENGINEERING COLLGE",
    "GATE INSTITUTE OF TECHNOLOGYAND SCIENCES",
    "GEETANJALI COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "GLOBAL INST OF ENGINEERING AND TECHNOLOGY",
    "GOKARAJU LAILAVATHI WOMENS ENGINEERING COLLEGE",
    "GOKARAJU RANGARAJU INSTITUTE OF ENGG AND TECH",
    "GURU NANAK INSTITUTIONS TECHNICAL CAMPUS (AUTONOMOUS)",
    "GURUNANAK INST OF TECHNOLOGY (AUTONOMOUS)",
    "HOLY MARY INSTITUTE OF TECH SCIENCE (AUTONOMOUS)",
    "HYDERABAD INST OF TECHNOLOGY AND MGMT (AUTONOMOUS)",
    "INDUR INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    "INSTITUTE OF AERONAUTICAL ENGINEERING",
    "J B INSTITUTE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "JAYA PRAKASH NARAYAN COLLEGE OF ENGINEERING",
    "JAYAMUKHI INSTITUTE OF TECHNOLOGY AND SCIS (AUTONOMOUS)",
    "JNAFAU SCHOOL OF PLANNING AND ARCH - SELF FINANCE",
    "JNTUH UNIVERSITY COLLEGE OF ENGG MANTHANI",
    "JNTUH UNIVERSITY COLLEGE OF ENGG SCI AND TECH -5 YEAR INTEGRATED MTECH SELF FINANCE",
    "JNTUH UNIVERSITY COLLEGE OF ENGG SCI AND TECH HYDERABAD",
    "JNTUH UNIVERSITY COLLEGE OF ENGINEERING JAGITIAL (AUTONOMOUS)",
    "JNTUH UNIVERSITY COLLEGE OF ENGINEERING SULTANPUR",
    "JNTUH UNIVERSITY COLLEGE OF ENGINEERING RAJANNA SIRCILLA",
    "JNTUH UNIVERSITY COLLEGE OF ENGINEERING WANAPARTHY",
    "JOGINPALLY B R ENGINEERING COLLEGE (AUTONOMOUS)",
    "JYOTHISHMATHI INSTITUTE OF TECHNOLOGY AND SCI (AUTONOMOUS)",
    "K U COLLEGE OF ENGG KOTHAGUDEM",
    "K U COLLEGE OF ENGG KOTHAGUDEM - SELF FINANCE",
    "KAKATIYA INST OF TECHNOLOGY SCI FOR WOMEN",
    "KAKATIYA INSTITUTE OF TECHNOLOGY AND SCI",
    "KAMALA INSTITUTE OF TECHNOLOGY AND SCIENCE",
    "KASIREDDY NARAYANAREDDY COLL ENGG RES",
    "KESHAV MEMORIAL COLLEGE OF ENGINEERING",
    "KESHAV MEMORIAL ENGINEERING COLLEGE",
    "KESHAV MEMORIAL INST OF TECHNOLOGY",
    "KG REDDY COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "KHAMMAM INST OF TECHNOLOGY AND SCIENCE",
    "KLRCOLLEGE OF ENGG AND TECHNOLOGY PALONCHA",
    "KODADA INST OF TECHNOLOGY AND SCIENCE FOR WOMEN",
    "KOMMURI PRATAP REDDY INST OF TECHNOLOGY (AUTONOMOUS)",
    "KSHATRIYA COLLEGE OF ENGINEERING",
    "KU COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "M L R INSTITUTE OF TECHNOLOGY (AUTONOMOUS)",
    "M V S R ENGINEERING COLLEGE (AUTONOMOUS)",
    "MADHIRA INSTITUTE OF TECHNOLOGY AND SCI",
    "MAHATMA GANDHI INSTITUTE OF TECHNOLOGY (AUTONOMOUS)",
    "MAHAVEER INSTITUTE OF SCI AND TECHNOLOGY",
    "MALLA REDDY COLLEGE OF ENGG TECHNOLOGY (AUTONOMOUS)",
    "MALLA REDDY COLLEGE OF ENGINEERING",
    "MALLA REDDY COLLEGE OF ENGINEERING FOR WOMEN",
    "MALLA REDDY ENGG COLLEGE FOR WOMEN (AUTONOMOUS)",
    "MALLA REDDY ENGINEERING COLLEGE AND MANAGEMENT SCIENCES",
    "MALLAREDDY ENGINEERING COLLEGE (AUTONOMOUS)",
    "MALLAREDDY INST OF TECHNOLOGY AND SCI (AUTONOMOUS)",
    "MARRI LAXMAN REDDY INST OF TECHNOLOGY AND MANAGEMENT (AUTONOMOUS)",
    "MATRUSRI ENGINEERING COLLEGE (AUTONOMOUS)",
    "MEGHA INST OF ENGG AND TECHNOLOGY FOR WOMEN",
    "METHODIST COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS)",
    "MGU COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "MINA INST OF ENGG AND TECHNOLOGY FOR WOMEN",
    "MNRCOLLEGE OF ENGINEERING AND TECHNOLOGY",
    "MOTHER TERESA INSTITUTE OF SCI AND TECHNOLOGY",
    "MOTHER THERESA COLLEGE OF ENGG AND TECHNOLOGY",
    "NALLA NARASIMHA REDDY EDNL SOC GRP OF INSTNS (AUTONOMOUS)",
    "NALLAMALLA REDDY ENGINEERING COLLEGE (AUTONOMOUS)",
    "NARSIMHAREDDY ENGINEERING COLLEGE (AUTONOMOUS)",
    "NEIL GOGTE INST OF TECHNOLOGY",
    "NETAJI INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    "NIGAMA ENGINEERING COLLEGE",
    "O U COLLEGE OF ENGG HYDERABAD",
    "O U COLLEGE OF TECH HYDERABAD",
    "O U COLLEGE OF TECH HYDERABAD - SELF FINANCE",
    "PALLAVI ENGINEERING COLLEGE",
    "PRINCETON INST OF ENGG TECH FOR WOMEN",
    "PRIYADARSHINI INSTITUTE OF SCIENCE & TECHNOLOGY FOR WOMEN",
    "RISHI MS INST OF ENGG AND TECH FOR WOMEN",
    "SAI SPURTI INSTITUTE OF TECHNOLOGY",
    "SAMSKRUTHI COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "SCIENT INSTITUTE OF TECHNOLOGY",
    "SIDDHARTHA INSTT OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "SIDDHARTHA INSTT OF TECHNOLOGY AND SCIENCES (AUTONOMOUS)",
    "SPHOORTHY ENGINEERING COLLEGE",
    "SR UNIVERSITY (FORMERLY S R ENGINEERING COLLEGE)",
    "SREE CHAITANYA COLLEGE OF ENGINEERING",
    "SREE CHAITANYA INST OF TECHNOLOGY SCIENCES",
    "SREE DATTHA GRP OF INSTNS",
    "SREE DATTHA INSTITUTE OF ENGINEERING AND SCIENCE (AUTONOMOUS)",
    "SREYAS INST OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "SRI CHAITANYA TECHNICAL CAMPUS",
    "SRI INDU COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "SRI INDU INSTITUTE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS)",
    "SRI VENKATESWARA ENGINEERING COLLEGE",
    "SRI VISHWESWARAYA INST OF TECHNOLOGY AND SCI",
    "SRIDEVI WOMENS ENGINEERING COLLEGE AUTONOMOUS",
    "SRINIDHI INSTITUTE OF SCI AND TECHNOLOGY",
    "ST MARTINS ENGINEERING COLLEGE (AUTONOMOUS)",
    "ST PETERS ENGINEERING COLLEGE (AUTONOMOUS)",
    "STANLEY COLLEGE OF ENGG AND TECHNOLOGY FOR WOMEN (AUTONOMOUS)",
    "SUMATHI REDDY INST OF TECHNOLOGY FOR WOMEN",
    "SVS GRP OF INSTNS - SVS INST OF TECH",
    "SWAMI VIVEKANANDA INST OF TECHNOLOGY",
    "SWARNA BHARATHI INSTITUTE OF SCI AND TECHNOLOGY",
    "T K R COLLEGE OF ENGG AND TECHNOLOGY (AUTONOMOUS)",
    "TALLA PADMAVATHI COLL OF ENGINEERING",
    "TEEGALA KRISHNA REDDY ENGINEERING COLLEGE (AUTONOMOUS)",
    "TRINITY COLLEGE OF ENGINEERING AND TECHNOLOGY",
    "UNIVERSITY COLLEGE OF ENGG AND TECH FOR WOMEN KU CAMPUS",
    "V N R VIGNANA JYOTHI INSTITUTE OF ENGG AND TECH",
    "VAAGDEVI COLLEGE OF ENGINEERING (AUTONOMOUS)",
    "VAAGESHWARI COLL OF ENGINEERING",
    "VAGDEVI ENGINEERING COLLEGE (AUTONOMOUS)",
    "VARDHAMAN COLLEGE OF ENGINEERING",
    "VASAVI COLLEGE OF ENGINEERING",
    "VATHSALYA INSTITUTE OF SCI AND TECHNOLOGY",
    "VIDYAJYOTHI INSTITUTE OF TECHNOLOGY AUTONOMOUS",
    "VIGNAN BHARATI INSTITUTE OF TECHNOLOGY (AUTONOMOUS)",
    "VIGNAN INSTITUTE OF TECHNOLOGY AND SCI (AUTONOMOUS)",
    "VIGNANS INST OF MANAGEMENT AND TECH FOR WOMEN",
    "VIJAYA ENGINEERING COLLEGE",
    "VIJAYA RURAL ENGINEERING COLLEGE",
    "VISWESWARAYA COLL OF ENGG AND TECHNOLOGY",
    "VIVEKANANDA INSTT OF TECH AND SCI BOMMAKAL",
    "VMR PRADEEP KUMAR INST OF ENGG & TECH",
    "WARANGAL INST OF TECHNOLOGY SCIENCE"
  ];

  const dropdown = document.getElementById("collegeName");

  colleges.forEach((college) => {
    const option = document.createElement("option");
    option.value = college;
    option.textContent = college;
    dropdown.appendChild(option);
  });

//   const jsonData = {
//     "categories": [
//         { "value": "ocB", "label": "Oc-boys" },
//         { "value": "ocG", "label": "Oc-girls" },
//         { "value": "bcaB", "label": "Bc_A-boys" },
//         { "value": "bcaG", "label": "Bc_A-girls" },
//         { "value": "bcbB", "label": "Bc_B-boys" },
//         { "value": "bcbG", "label": "Bc_B-girls" },
//         { "value": "bccB", "label": "Bc_C-boys" },
//         { "value": "bccG", "label": "Bc_C-girls" },
//         { "value": "bcdB", "label": "Bc_D-boys" },
//         { "value": "bcdG", "label": "Bc_D-girls" },
//         { "value": "bceB", "label": "Bc_E-boys" },
//         { "value": "bceG", "label": "Bc_E-girls" },
//         { "value": "scB", "label": "Sc-Boys" },
//         { "value": "scG", "label": "Sc-girls" },
//         { "value": "stB", "label": "St-Boys" },
//         { "value": "stG", "label": "St-girls" },
//         { "value": "egoB", "label": "EWS-boys" },
//         { "value": "egoG", "label": "EWS-girls" }
//     ]
// };

// // Function to populate the dropdown
// function populateDropdown() {
//     const dropdown = document.getElementById('categoryBranch');

//     jsonData.categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category.value;
//         option.textContent = category.label;
//         dropdown.appendChild(option);
//     });
// }

// function populateDropdown() {
//     const dropdown = document.getElementById('categoryRank');

//     jsonData.categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category.value;
//         option.textContent = category.label;
//         dropdown.appendChild(option);
//     });
// }

