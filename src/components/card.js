import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card = document.createElement('div');
  card.classList.add('card');

  let i;
  for(i = 0; i < article.length; i++){

    const headline = document.createElement('div');
    const author = document.createElement('div');
    const imgContainer = document.createElement('div');
    const authorPhoto = document.createElement('img');
    const authorName = document.createElement('span');

    card.appendChild(headline);
    card.appendChild(author);
    author.appendChild(imgContainer);
    imgContainer.appendChild(authorPhoto);
    author.appendChild(authorName);


    headline.classList.add('headline');
    author.classList.add('author');
    imgContainer.classList.add('img-container');

    authorPhoto.src = article[i].authorPhoto;
    headline.textContent = article[i].headline;
    authorName.textContent = `By ${article[i].authorName}`;
  }

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(response => {
    console.log(response, "Yay! You did it!")

    const articleCard = response.data;
    const javaScript = Array.from(articleCard.articles.javascript);
    const bootStrap = Array.from(articleCard.articles.bootstrap);
    const technology = Array.from(articleCard.articles.technology);
    const jQuery = Array.from(articleCard.articles.jquery);
    const node = Array.from(articleCard.articles.node);
    
    const cards =  document.querySelector(selector);
    cards.appendChild(Card(javaScript));
    cards.appendChild(Card(jQuery));
    cards.appendChild(Card(node));
    cards.appendChild(Card(technology));
    cards.appendChild(Card(bootStrap));
  })
  .catch(error => {
    console.log(error, "Something's not quite right")
  })
}

export { Card, cardAppender }
