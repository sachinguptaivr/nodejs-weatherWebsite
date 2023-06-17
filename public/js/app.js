console.log("Client side Javascript loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "From javascript";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageTwo.textContent = "...";

  messageOne.textContent = "Loading";

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "";
        messageTwo.textContent =
          "Invalid location, please try with new location";
      } else {
        // console.log(data.address);
        // console.log(typeof data.forecastData);
        messageOne.textContent = data.forecastData;
        messageTwo.textContent = "";
      }
    });
  });
});
