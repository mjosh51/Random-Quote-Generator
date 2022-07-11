
const newQuoteButton = document.querySelector('#new-quote-js');
const endpoint = 'https://gist.githubusercontent.com/mjosh51/f3ef77969dbde1986e0ad4d091a5dd6e/raw/01d75481890d88c36336916b73fd7948537669dd/CSquotes.json';
const spinner = document.querySelector('#spinnerjs');
const tweetButton = document.querySelector('#tweetjs');

const CLICK = 'click'

const displayQuote = (quote) => {
  const quoteText = document.querySelector('#quote-text-js');
  quoteText.textContent = quote;
}

const displayAuthor = (author) => {
  const quoteInfo = document.querySelector('#quote-author-js');
  quoteInfo.textContent = author;
}

const setTweetButton = (quote) => {
  tweetButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Charles Spurgeon`)
}

const getQuote = async() => {
  spinner.classList.remove('hidden');
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint);

    if (!response.ok ) {
      throw Error(response.statusText);
    } 

    const data = await response.json();
    let dataQuotes = data.quotes;
    // Generate a random number to locate quotes' array data each time new quote is requested
    let randomNum = Math.floor(Math.random() * dataQuotes.length);
    // Apply random (array number) to `data.quotes`. So this gets the random array position of quotes data
    let randomQuote = dataQuotes[randomNum];
    displayQuote(randomQuote.quote);
    displayAuthor(randomQuote.author);
    setTweetButton(randomQuote.quote);
  } catch(err) {
    console.log(err);
    alert("Failed to fetch new quote!");
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

getQuote();



newQuoteButton.addEventListener(CLICK, getQuote);

