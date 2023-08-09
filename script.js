const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false
    quoteContainer.hidden = true
}

const removeLoadingSpinner = () => {
    if (!loader.hidden) {
        loader.hidden = true
        quoteContainer.hidden = false
    }
}
// Show New Quote
const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote.author.replace(", type.fit",''))
    // Checking if author field is blank & replace it with 'Unknown'
    if (quote.author === null) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author.replace(", type.fit",'');
    }
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}
// Get Quotes from API
const getQuotes = async () => {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        // It will fetch all quotes from the above API
        const response = await fetch(apiURL);
        // It will store the quotes in json format
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error
        console.log(error);
        getQuotes();
    }
}
// Tweet Quote
const tweetQuote = () => {
    // 
    const twitterURL = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`
    // Opens new browser window 
    window.open(twitterURL, '_blank')
}
// Get Quotes from local javascript file
// const newQuote = () => {
//     // Pick a random quote from  localQuotes array in quotes.js for that you need to keep quotes.js above script.js while using script tag.
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
// }
// newQuote()

// Adding Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();
