
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import './css/styles.css';
import './fetchCountries'
import { fetchCountries } from './fetchCountries';
import { getRefs } from './getRefs';
import {
    clearCountryInfo,
    clearCountryList} from './clearFunction';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
refs.input.addEventListener('input', debounce(onSearchInput,DEBOUNCE_DELAY));
function onSearchInput(evt) {
    const inputValue = evt.target.value.trim();
    if (!inputValue) {
        clearCountryInfo();
        clearCountryList();
        return
    }
    fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchErorr)
}
function onFetchSuccess(data) {
    if (data.length >= 2 && data.length <= 10) {
        
        onCreateCountryList(data)
         clearCountryInfo();

    } else if (data.length < 2) {
       
        onCreateCountryInfo(data);
         clearCountryList();
    }
    else
        if (data.length > 10) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notify.info("Too many matches found. Please enter a more specific name.") 
        return
    }
       
}


function onFetchErorr() {
    // Notify.failure("Oops, there is no country with that name")
}
function onCreateCountryList(data) {
    const markup = data
        .map(data => {
            return `<li><img src= '${data.flags.svg} ' width = '50'>
            <span>${data.name.official}</span>
            </li>`
        })
        .join('');
    refs.countryList.innerHTML = markup;
    console.log(data)
};
function onCreateCountryInfo(data) {
    return data
        .map((({ flags, name, capital, population, languages }) => {
            return `<div class="card-svg" >
            <img src= '${flags.svg} ' width = '50'>
            <h1>Country: ${name.official}</h1>
            <h2>Capital: ${capital}</h2>
            <span>Population: ${population}</span>
            <span>languages: ${Object.values(languages)}</span></div>
            `
        })
            .join(''),
    refs.countryInfo.innerHTML = markup
    
)};


{/* <img src="" alt="">

<p></p>
<p></p>
<p></p> */}

