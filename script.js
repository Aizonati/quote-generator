const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

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
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Checking if author field is blank & replace it with 'Unknown'
    if (quote.author === null) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
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

// Tweet Quote
const tweetQuote = () => {
    // 
    const twitterURL = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`
    // Opens new browser window 
    window.open(twitterURL, '_blank')
}


// Adding Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
newQuote()