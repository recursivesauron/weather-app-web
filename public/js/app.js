const weatherForm  = document.querySelector('form');
const search = document.querySelector('input');
const messageError = document.querySelector('#message-error');
const messageSuccess = document.querySelector('#message-success');


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const location = search.value;

    messageError.textContent = "Loading...";
    messageSuccess.textContent = "";

    fetch('/weather?searchLocation=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageError.textContent = JSON.stringify(data.error);
                messageSuccess.textContent = "";
            }
            else{
                messageError.textContent = data.location
                messageSuccess.textContent = data.forecast
            }
        })
    })
})