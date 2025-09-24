function showCountryDetails() {
  console.log("hello");
  let serchedCountry = document.getElementById("txtCountry").value;
  let countryTable = document.getElementById("countryDataTable");

  fetch("https://restcountries.com/v3.1/name/" + serchedCountry)
    .then((res) => {
      if (!res.ok) {
        // If the response has a 404 or other error status
        throw new Error("Country not found");
      }
      return res.json();
    })
    .then((data) => {
      // Process the data
      document.getElementById("officialName").innerHTML = data[0].name.official;
      document.getElementById("commonName").innerHTML = data[0].name.common;
      console.log(data[0].name.official);
      console.log(data[0].name.common);
      console.log(data[0].flags.png);

      let img = document.getElementById("countryFlagImage");
      img.src = data[0].flags.png;

      let languagesOfTheCountry = data[0].languages;
      let languageString = Object.values(languagesOfTheCountry).join(",");

      let currencies = Object.values(data[0].currencies)[0].name;
      // Capital,Region,Subregion,Popolation,Area(sq km),Languages,Currencies

      let body = `<thead class="table-dark">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Capital</td>
                <td>${data[0].capital[0]}</td>
              </tr>
              <tr>
                <td>Region</td>
                <td>${data[0].region}</td>
              </tr>
              <tr>
                <td>Subregion</td>
                <td>${data[0].subregion}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>${data[0].population}</td>
              </tr>
              <tr>
                <td>Area(sq km)</td>
                <td>${data[0].area}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>${languageString}</td>
              </tr>
              <tr>
                <td>Currencies</td>
                <td>${currencies}</td>
              </tr>
            </tbody>`;
      countryTable.innerHTML = body;

      //until here
      console.log(data);
    })
    .catch((error) => {
      Swal.fire({
        title: "Invalid country !",
        icon: "error",
        draggable: true,
      });
    });
}
