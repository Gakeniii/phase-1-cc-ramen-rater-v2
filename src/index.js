// index.js
  const ramenDetails = document.getElementById('ramen-details')
  const ramenMenu = document.getElementById('ramen-menu')
  const newRamen = document.getElementById('new-ramen')
  const editRamen = document.getElementById('edit-ramen')

// Callbacks
const handleClick = (ramen) => {
  // Add code
    document.querySelector('.name').innerText = ramen.name;
    document.querySelector('.detail-image').src = ramen.image;
    document.querySelector('.restaurant').innerText = ramen.restaurant;
    document.getElementById('rating-display').innerText = ramen.rating;
    document.getElementById('comment-display').innerText = ramen.comment

    //prefill form
    document.getElementById('new-rating').value = ramen.rating;
    document.getElementById('new-comment').value = ramen.comment;

    
};

//Display Ramens
const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramens => {
    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen))
      ramenMenu.appendChild(img)
    })
  })
  .catch(error => console.log('Error fethcing ramens:', error))
};


//Add subt listener
const addSubmitListener = () => {
  // Add code
  newRamen.addEventListener('submit', event => {
    event.preventDefault()
    const name = document.getElementById('new-name').value;
    const image = document.getElementById('new-image').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamenForm = {name, image, restaurant, rating, comment};
    addRamen(newRamenForm);
    newRamen.reset();
  });
}

function addRamen(ramen){
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', ()=>handleClick(ramen));
  ramenMenu.appendChild(img);
}

function submitEditRamen(){
  
  editRamen.addEventListener('submit', event => {
    event.preventDefault();
    if(currentRamen) return;

    currentRamen.rating = document.getElementById('new-rating').value;
    currentRamen.comment = document.getElementsById('new-comment').value;

    handleClick(currentRamen)
  })
}
submitEditRamen()

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()


//Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

