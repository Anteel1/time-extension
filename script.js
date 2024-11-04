let timeout
const updateTime = (timezone, country) => {
    // Display the time display section
    document.getElementsByClassName('time-display')[0].style.display = 'flex';
    
    // Set the current country text
    document.getElementById('current-country').textContent = country;
    
    // Create a new Date object using the selected timezone
    const now = new Date();
    // Format the time and date
    const formattedTime = formatTime(now, timezone);
    const formattedDate = formatDate(now, timezone);
    console.log(formattedTime,formattedDate)
    // Update the time and day elements with formatted values

    const timeParts = formattedTime.split(" ")[0].split(":").concat(formattedTime.split(" ")[1])
    const hour = timeParts[0]
    const minute = timeParts[1]
    const second = timeParts[2]
    const daynight = timeParts[3]
    document.getElementById('hour').innerHTML =
        `<div>${hour}</div>
         <div>Hours</div>
        `
    document.getElementById('minute').innerHTML =
        `<div>${minute}</div>
         <div>Minutes</div>
        `
    document.getElementById('second').innerHTML =
        `<div>${second}</div>
         <div>Seconds</div>
        `
    document.getElementById('daynight').setAttribute('src',`./img/${daynight}.svg`)
    document.getElementById('day').textContent = formattedDate;
    // Call updateTime again after 1000 milliseconds (1 second)
    timeout= setTimeout(() => updateTime(timezone, country), 1000);
}

// Sample implementation for formatTime and formatDate functions
const formatTime = (date, timezone) => {
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 12-hour format
    };
    return date.toLocaleTimeString('en-US', options);
}

const formatDate = (date, timezone) => {
    const options = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}


document.getElementById('country-search').addEventListener('input', function () {
    
    const query = this.value.toLowerCase();
    const resultsList = document.getElementById('results-list');

    // Clear previous results
    resultsList.innerHTML = '';

    if (query) {
        // Filter countries based on the search query
        const countries = Object.keys(countryToTimezone) 
        const filteredCountries = countries.filter(country => country.toLowerCase().includes(query));

        filteredCountries.forEach(country => {
            const li = document.createElement('li');
            const countryData = countryToTimezone[country]
            li.textContent = country;
            li.onclick = function () {
                document.getElementById('country-search').value = country; // Set the input value to the selected country
                resultsList.innerHTML = ''; // Clear the results list after selection
                resultsList.style.display = 'none'; // Hide results after selection
                clearTimeout(timeout)
                updateTime(countryData,country)
            };
            resultsList.appendChild(li);
        });

        if (filteredCountries.length > 0) {
            resultsList.style.display = 'block';
        } else {
            resultsList.style.display = 'none'; // Hide if no results
        }
    } else {
        resultsList.style.display = 'none'; // Hide if input is empty
    }
});