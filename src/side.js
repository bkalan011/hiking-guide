//fetch
class Fetch {
    async getCurrent(input) {
        const myKey = "83d534996b6f4d78855bc4b7d54e6d41";

        // make request to url

        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${input}&countrycode=gb&key=${myKey}`
        );
        const coordinates = await response.json();
        console.log(coordinates);
        return coordinates;

    }

    async getHikingData(newURL) {
        const response = await fetch(newURL);
        const data = await response.json();
        return data;
    }


}

//ui

class UI {
    constructor() {
        this.uiContainer = document.querySelector('.row')
    }
    populateUI(data) {
        const ftch = new Fetch()
        let lat = data.results[0].geometry.lat;
        let lng = data.results[0].geometry.lng;
        const myKey = "200804800-26d25f1775152845fd65fecad7ce8b07";
        let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=60&key=${myKey}`;
        ftch.getHikingData(url).then(newData => {
                let hikingData = newData;
                console.log(hikingData);
                this.uiContainer.innerHTML = `
                <div class="column">
            <div class="card">
            <img class="hiking-image" src=${hikingData.trails[0].imgSmall}></img>
            <h3>${hikingData.trails[0].name}</h3>
            <p>Length: ${hikingData.trails[0].length}</p>
            <p>Summary: ${hikingData.trails[0].summary}</p>
            <a href="${hikingData.trails[0].url}">
            <i class="fas fa-tree"></i></a>
        </div>
    </div>
                ` //hikingData.trails[0].name
            })
            /*
        this.uiContainer.innerHTML = ` <div class="column">
        <div class="card">
            <i class="fas fa-mountain"></i>
            <h5>${data.results[0].formatted}</h5>
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
            </div>`;*/
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
})