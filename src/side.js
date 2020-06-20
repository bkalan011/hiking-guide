// fetch
class Fetch {
    async getCurrent(input) {
        const myKey = "83d534996b6f4d78855bc4b7d54e6d41";

        // make request to url

        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${input}&countrycode=gb&key=${myKey}`
        );
        const coordinates = await response.json();
        return coordinates;

    }
    async getHikingData(coordinates) {
        const myKey = "200804800-26d25f1775152845fd65fecad7ce8b07";
        console.log(coordinates);
        let lat = data.results[0].geometry.lat;
        let long = data.results[0].geometry.lng;
        //make request to url

        const response = await fetch(
            `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${myKey}`
        );
        const data = await response.json();
        console.log(data);
        return data;
    }


}

//ui

class UI {
    constructor() {
        this.uiContainer = document.querySelector('.row')
    }

    populateUI(data) {
        const lat = data;

        this.uiContainer.innerHTML = ` <div class="column">
        <div class="card">
            <i class="fas fa-mountain"></i>
            <h5>${data.results[0].components.town}</h5>
            <p class="title"></p>
            <p>Latitude: ${data.results[0].geometry.lat}</p>
            <p>Longitude: ${data.results[0].geometry.lng}</p>
            <i class="fas fa-tree"></i>
        </div>
    </div>
    <div class="column">
                <div class="card">
                    <i class="fas fa-mountain"></i>
                    <h5>Helvellyn</h5>
                    <p class="title">Length: 18km</p>
                    <p>Difficulty: Hard</p>
                    <i class="fas fa-tree"></i>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <i class="fas fa-mountain"></i>
                    <h5>Ben Nevis</h5>
                    <p class="title">Length: 9km</p>
                    <p>Difficulty: Hard</p>
                    <i class="fas fa-tree"></i>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <i class="fas fa-mountain"></i>
                    <h5>Marlborough Loop</h5>
                    <p class="title">Length: 13km</p>
                    <p>Difficulty: Medium</p>
                    <i class="fas fa-tree"></i>
                </div>
            </div>`;
    }
}
// inst classes 

const ft = new Fetch();
const ui = new UI();

// add event listeners

const search = document.querySelector('#location');
const button = document.querySelector('#sendBtn');

// submit button

button.addEventListener("click", () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {
        //call a UI method
        ui.populateUI(data);
    });
});