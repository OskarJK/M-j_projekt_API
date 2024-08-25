const select = document.getElementById('citySelect');
const productInput = document.getElementById('productInput');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const cityName = document.querySelector('h2.city');
const produktName = document.querySelector('h3.produkt');
const minCena = document.querySelector('span.minPrice');
const maxCena = document.querySelector('span.maxPrice');
const minDate = document.querySelector('span.minDate');
const maxDate = document.querySelector('span.maxDate');
const apiLink = "https://europe.albion-online-data.com/api/v2/stats/prices/";

function getPrices() {
    const selectedCity = select.value;
    const product = productInput.value;
    
    if (!selectedCity || !product) {
        errorMessage.textContent = 'Proszę wybrać miasto i wpisać produkt';
        return;
    }

    const apiCity = "locations=" + selectedCity;
    const apiProdukt = product + "?";
    const apiQuality = "&qualities=1";
    const URL = apiLink + apiProdukt + apiCity + apiQuality;
    console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response.data[0]);

        const item = response.data[0];
        cityName.textContent = 'Miasto: ' + item.city;
        produktName.textContent = 'Produkt: ' + item.item_id;
        minCena.textContent = `${item.sell_price_min} Silver`;
        minDate.textContent = `${item.sell_price_min_date}`;
        maxCena.textContent = `${item.sell_price_max} Silver`;
        maxDate.textContent = `${item.sell_price_max_date}`;
        errorMessage.textContent = '';
        productInput.value = '';

    }).catch((error) => {
        errorMessage.textContent = error.response?.data?.message || 'Wystąpił błąd';
        [minCena, maxCena].forEach(element => {
            element.textContent = '';
        });
    });
}

const getPricesByEnter = (e) => {
    if (e.key === "Enter") {
        getPrices();
    }
}

button.addEventListener('click', getPrices);
productInput.addEventListener('keydown', getPricesByEnter);
select.addEventListener('keydown', getPricesByEnter);
