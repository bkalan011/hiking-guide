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
        this.uiContainer = document.querySelector('.card-section')
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
            this.uiContainer.innerHTML = `<div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingData.trails[0].imgSmallMed}></div>
            <div class="card-text">
                <span class="date">Stars: ${hikingData.trails[0].stars}</span>
                <h2>${hikingData.trails[0].name}</h2>
                <p>${hikingData.trails[0].summary}</p>
            </div>
            <div class="card-stats">
                <div class="stat">
                    <div class="value">Length</div>
                    <div class="type">${hikingData.trails[0].length}<sup>m</sup></div>
                </div>
                <div class="stat border">
                    <div class="value">Difficulty</div>
                    <div class="type">${hikingData.trails[0].difficulty}</div>
                </div>
                <div class="stat">
                    <div class="value">Map</div>
                    <div class="type"><a href="${hikingData.trails[0].url}">
                </a>Link</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingData.trails[1].imgSmallMed}></div>
            <div class="card-text">
                <span class="date">Stars: ${hikingData.trails[1].stars}</span>
                <h2>${hikingData.trails[1].name}</h2>
                <p>${hikingData.trails[1].summary}</p>
            </div>
            <div class="card-stats">
                <div class="stat">
                    <div class="value">Length</div>
                    <div class="type">${hikingData.trails[1].length}<sup>m</sup></div>
                </div>
                <div class="stat border">
                    <div class="value">Difficulty</div>
                    <div class="type">${hikingData.trails[1].difficulty}</div>
                </div>
                <div class="stat">
                    <div class="value">Map</div>
                    <div class="type"><a href="${hikingData.trails[1].url}">
                </a>Link</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingData.trails[2].imgSmallMed}></div>
            <div class="card-text">
                <span class="date">Stars: ${hikingData.trails[2].stars}</span>
                <h2>${hikingData.trails[2].name}</h2>
                <p>${hikingData.trails[2].summary}</p>
            </div>
            <div class="card-stats">
                <div class="stat">
                    <div class="value">Length</div>
                    <div class="type">${hikingData.trails[2].length}<sup>m</sup></div>
                </div>
                <div class="stat border">
                    <div class="value">Difficulty</div>
                    <div class="type">${hikingData.trails[2].difficulty}</div>
                </div>
                <div class="stat">
                    <div class="value">Map</div>
                    <div class="type"><a href="${hikingData.trails[2].url}">
                </a>Link</div>
                </div>
            </div>
        </div>`
                /* <div class="column">
            <div class="card">
            <img class="hiking-image" src=${hikingData.trails[0].imgSmall}></img>
            <h3>${hikingData.trails[0].name}</h3>
            <p>Length: ${hikingData.trails[0].length}</p>
            <p>Summary: ${hikingData.trails[0].summary}</p>
            <a href="${hikingData.trails[0].url}">
            <i class="fas fa-tree"></i></a>
        </div>
    </div>*/


        })


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