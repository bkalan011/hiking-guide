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
    populateUI(data, updateMinDistance, updateMaxDistance) {

        const ftch = new Fetch()

        let lat = data.results[0].geometry.lat;
        let lng = data.results[0].geometry.lng;

        const myKey = "200804800-26d25f1775152845fd65fecad7ce8b07";

        let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&minLength=${updateMinDistance}&maxDistance=${updateMaxDistance}&sort=distance&key=${myKey}`;

        ftch.getHikingData(url).then(newData => {
            let hikingData = newData;

            let hikingPicture = hikingData.trails[0].imgSmallMed;
            let hikingPictureTwo = hikingData.trails[1].imgSmallMed;
            let hikingPictureThree = hikingData.trails[2].imgSmallMed;
            hikingPicture === "" ? hikingPicture = "https://cdn2.apstatic.com/photos/hike/7016539_smallMed_1554827920.jpg" : hikingPicture;
            hikingPictureTwo === "" ? hikingPictureTwo = "https://cdn2.apstatic.com/photos/hike/7016539_smallMed_1554827920.jpg" : hikingPictureTwo;
            hikingPictureThree === "" ? hikingPictureThree = "https://cdn2.apstatic.com/photos/hike/7016539_smallMed_1554827920.jpg" : hikingPictureThree;

            console.log(hikingData);
            this.uiContainer.innerHTML = `<div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingPicture}></div>
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
                    <div class="type"><a href="${hikingData.trails[0].url}">Link
                </a></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingPictureTwo}></div>
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
                    <div class="type"><a href="${hikingData.trails[1].url}">Link
                </a></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image"><img class="hiking-image"src=${hikingPictureThree}></div>
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
                    <div class="type"><a href=${hikingData.trails[2].url}>Link
                </a></div>
                </div>
            </div>
        </div>`
        })


    }
}
// inst classes 

const ft = new Fetch();
const ui = new UI();

// add event listeners

const search = document.querySelector('#location');
const minDistance = document.querySelector('#min-distance')
const maxDistance = document.querySelector('#max-distance')
const button = document.querySelector('#sendBtn');

// submit button

button.addEventListener("click", () => {
    const currentVal = search.value;
    const updateMinDistance = minDistance.value;
    const updateMaxDistance = maxDistance.value

    ft.getCurrent(currentVal, updateMinDistance, updateMaxDistance).then((data) => {
        //call a UI method
        ui.populateUI(data, updateMinDistance, updateMaxDistance);
    });
})

// reset button

function myButton() {
    location.reload()
}