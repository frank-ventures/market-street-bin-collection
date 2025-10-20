async function getExample() {
  try {
    const response = await fetch(
      "https://www.erewash.gov.uk/bins-and-recycling/when-my-bin-day?ajax_form=1&_wrapper_format=html&_wrapper_format=drupal_ajax&postcode=de723nb&link_uri=entity%3Anode%2F646&link_text=View+the+calendar&form_build_id=form-oSUBvuH2eOD4zcNQmIcIoC6tTfFaVWWQZ3_xP-AStSg&form_id=bbd_whitespace_bbd_whitespace_address_search&addresses=100030122871&_triggering_element_name=addresses&_drupal_ajax=1&ajax_page_state%5Btheme%5D=bbd_localgov&ajax_page_state%5Btheme_token%5D=&ajax_page_state%5Blibraries%5D=eJx9kVtywyAMRTfEY0mMANkmFshF0MS7r5kk08Tp9A-dI4aL5H10VxC3wYyuC06drP9kRtpOKCpwRRs4b1ywNDHEAWjmb-dBUOuYZCPY9XGD7r2x9g3IxATEs4EL3O48lYa1HOby1bHuZuKaFXYXmNeEbjxBCUpA-xd0ESfo1BTeGqWyPp95lGri0uCKwhnty9lc0Y9S1Ftu6ytCDLVnfzYjlsZauX6Y8cV3NBN7OMOMpesMqZz4GK5uqRFqf5j1pCVF9FDPtKWw7no54uKLk-4lNRwbqzBX2Bax_0n10veY3C8xvWzdU5IFoxIOx-ZcxmOBboxW7CcybcGMSnZpmO0I-gNiXerr",
      {
        method: "POST", // or 'POST', 'PUT', 'DELETE'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your-token",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Request failed:", error);
  }
}

async function submitDrupalAjax() {
  const payload = new URLSearchParams({
    postcode: "DE723NB",
    link_uri: "entity:node/646",
    link_text: "View the calendar",
    form_build_id: "form-oSUBvuH2eOD4zcNQmIcIoC6tTfFaVWWQZ3_xP-AStSg",
    form_id: "bbd_whitespace_bbd_whitespace_address_search",
    addresses: "100030122871",
    _triggering_element_name: "addresses",
    _drupal_ajax: "1",
    "ajax_page_state[theme]": "bbd_localgov",
    "ajax_page_state[theme_token]": "",
    "ajax_page_state[libraries]": "eJx9kVtywyAMRTfEY0mMANkmFshF0MS7r5kk08Tp9A",
  });

  const response = await fetch(
    "https://www.erewash.gov.uk/bins-and-recycling/when-my-bin-day?ajax_form=1&_wrapper_format=html&_wrapper_format=drupal_ajax",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
      },
      credentials: "include", // include session cookies
      body: payload,
    }
  );

  //   const data = await response.json();
  //   console.log(data);

  const dataText = await response.text();
  const drupalJson = JSON.parse(dataText);

  console.log(drupalJson);
  document.body.appendChild(drupalJson[1].data);
}

async function getBinsFromAPI() {
  const response = await fetch(`http://localhost:8080/bins`);

  const binDatesFromServer = await response.json();
  console.log(binDatesFromServer);

  binDatesFromServer.forEach((month) => {
    month.forEach((binDate) => {
      console.log(binDate);

      const newDiv = document.createElement("div");
      const newH3date = document.createElement("h3");
      const newpday = document.createElement("p");
      const newpservice = document.createElement("p");

      newH3date.textContent = binDate.date;
      newpday.textContent = binDate.day;
      newpservice.textContent = binDate.service;
      newDiv.classList = binDate["service-identifier"];

      newDiv.append(newH3date, newpday, newpservice);
      document.body.append(newDiv);
    });
  });
}

getBinsFromAPI();
