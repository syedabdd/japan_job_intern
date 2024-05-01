
let btn = document.getElementById("searchJobBtn");
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let countryInput = document.getElementById("searchInp").value;
    console.log(countryInput)
    try {
        await updateDOMWithData(countryInput);
    } catch (error) {
        console.error('Error updating DOM:', error);
    }
});

// const getData = async (title, country) => {
//     try {
//         let response = await fetch(`https://jobs-api14.p.rapidapi.com/list?query=${title}&location=${country}`, {
//             headers: {
//                 "X-RapidAPI-Key": "516059a53fmshf38a6ed6a390a9ep18995fjsn4821c9c289d6",
//                 "X-RapidAPI-Host": "jobs-api14.p.rapidapi.com"
//             }
//         });
//         let data = await response.json();
//         // console.log({'data' : data})
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; // Rethrow the error for handling in the calling function
//     }
// };



const getData = async (title, country) => {
    console.log(title,country)
    try {
        let response = await fetch(`data.json`, {
            headers: {
                "X-RapidAPI-Key": "516059a53fmshf38a6ed6a390a9ep18995fjsn4821c9c289d6",
                "X-RapidAPI-Host": "jobs-api14.p.rapidapi.com"
            }
        });
        let data = await response.json();
        // console.log({'data' : data})
let filteredJobs = data.job_posts
         filteredJobs = data.job_posts.filter(job =>
            new RegExp(title.trim().replace(/\s+/g, '\\s+'), 'i').test(job.title.trim())
        );
        // console.log(filteredJobs)
        let ret = filteredJobs.length>0?filteredJobs:data.job_posts
        return ret
        ;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

const updateDOMWithData = async (country) => {
    try {
        let title = document.getElementById("searchInp").value;
        if(title==''){
            title="Web Devloper"
        }
        let returnedData = await getData(title, country);
        let parent = document.querySelector('.hero'); // Get the parent element
        parent.innerHTML = ''; // Clear previous job cards

        returnedData.forEach(job => {
            // let datePosted = job.datePosted ? job.datePosted : Math.floor(Math.random() * 30) + 1;
            // let salary = Math.floor(Math.random() * (45000 - 9001) / 10) * 10 + 10;

            let jobCard = document.createElement('div');
            jobCard.classList.add('card');

            jobCard.innerHTML = `
                <div class="card-left">
                    <img src="${job.img}" alt="">
                </div>
                <div class="Company-name">  
                    <h3>${job.company.slice(0, 20)}</h3>
                    <span class="card-com">${job.title}</span>
                    <p style="font-size: 5px;">${job.posted_date}</p>
                    <p style="font-size: 15px;">${job.location}</p>
                    
                    <div class="btn">
                        <p>${job.salary} RS</p>
                        <button class="btn" style="background-color: rgb(0, 0, 0); color: white; cursor: pointer; border-radius: 5px;">Apply</button>
                    </div>
                </div>`;

            parent.appendChild(jobCard); // Append each job card to the parent element
        });
    } catch(error) {
        console.error('Error updating DOM:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Call the async function to fetch data and update the DOM
updateDOMWithData("Japan"); // You can provide a default country here if needed
