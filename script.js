document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    
    const word = document.getElementById("Name").value; // Get value of input field
    
    const url = `https://restcountries.com/v3.1/name/${word}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          const country = data[0]; // First match from the API
          document.getElementById("country-info").innerHTML = `
          <p><strong>Name:</strong> ${country.name.common}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Region:</strong> ${country.region}</p>`;

        // Display flag
        const flagImage = document.getElementById("country-flag");
        flagImage.src = country.flags.png;
        flagImage.alt = `Flag of ${country.name.common}`;
        flagImage.style.display = "block";

        // Clear previous border country info
        const borderSection = document.getElementById("bordering-countries");
        orderSection.innerHTML = "<strong>Bordering Countries:</strong>";

        // Fetch details for each bordering country
        if (country.borders) {
            country.borders.forEach(borderCode => {
            fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
            .then(response => response.json())
            .then(borderData => {
            if (borderData.length > 0) {
                const borderCountry = borderData[0];
        
                // Create elements for border country name & flag
                const borderCountryElement = document.createElement("p");
                borderCountryElement.innerHTML = `<strong>${borderCountry.name.common}</strong>`;
        
                const borderFlag = document.createElement("img");
                borderFlag.src = borderCountry.flags.png;
                borderFlag.alt = `Flag of ${borderCountry.name.common}`;
                borderFlag.classList.add("border-flag");
        
                // Append to border section
                borderSection.appendChild(borderCountryElement);
                borderSection.appendChild(borderFlag);
            }
            })
        .catch(error => console.error("Error fetching border country:", error));
        });
        }
    
          
      })
      .catch(error => {
          console.error('Error:', error);
      });
      
});


