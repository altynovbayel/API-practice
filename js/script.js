const category = [{
    route: 'users',
    btn: 'Users',
    className: 'usersBtn',
  }, {
    route: 'posts',
    btn: 'posts',
    className: 'usersPosts',
  }, {
    route: 'comments',
    btn: 'comments',
    className: 'usersComments',
  }, {
    route: 'albums',
    btn: 'albums',
    className: 'usersAlbums',
  }, {
    route: 'photos',
    btn: 'photos',
    className: 'usersPhotos',
  }, {
    route: 'todos',
    btn: 'todos',
    className: 'usersTodos',
  },

]


const $container = document.querySelector('.d_flex')
const $cardsCont = document.querySelector('.d_flex_card')
const $loader = document.querySelector('.loader')

window.addEventListener('load', () => {
  $loader.innerHTML = ` 
  <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
      </linearGradient>
      <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
      </linearGradient>
    </defs>
    <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
    <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
  </svg>
  `
  getBase('users', res => {
    return cardTemplate('users', res)
  })
  const btnTemplate = category.map(({
    route,
    btn,
    className
  }) => {
    return Template(route, btn, className)
  }).join('')

  $container.innerHTML = btnTemplate
})

function getBase(endPoint, cb) {
  fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}

function Template(route, btn, className) {
  return `
    <button onclick="getRoute('${route}')" class="${className} btn">${btn}</button>
  `
}

function getRoute(route) {
  getBase(route, res => {
    cardTemplate(route, res)
  })
}

function cardTemplate(route, res) {
  if (route === 'posts') {
    const template = res.map(({
      title,
      body
    }) => {
      return cardPosts(title, body)
    }).join('')
    $cardsCont.innerHTML = template

  } else if (route === 'users') {
    const template = res.map(({
      name, username, email, 
      address: { 
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone, website,
      company: {
        name:namec,
        catchPhrase,
        bs,
      }
    }) => {
      return cardUser(
        name, username, email,
        street,  suite, city,
        zipcode, lat, lng, 
        phone, website,
        namec, catchPhrase, bs
        )
    }).join('')
    $cardsCont.innerHTML = template
  } else if (route === 'comments'){
  
    const template = res.map(({ name, email, body, postId }) => {
      
      return cardComments(name, email, body, postId)
    }).join('')
    $cardsCont.innerHTML = template
  } else if (route === 'albums'){
    const template = res.map(({ userId, title }) => {

      return cardAlbums(userId, title)
    }).join('')
    $cardsCont.innerHTML = template
  }else if(route === 'photos'){
    const template = res.slice(0,10).map(({ id, thumbnailUrl, url, title }) => {

      return cardPhotos(id, title, thumbnailUrl)
    }).join('')
    $cardsCont.innerHTML = template
  }else if(route === 'todos'){
    const template = res.map(({ userId, title, completed }) => {

      return cardTodos(userId, title, completed)
    }).join('')
    $cardsCont.innerHTML = template
  }
}


function cardPosts(title, body) {
  return `
    <div class="cardPost">
      <div class="card_header">
        <h1 class="card_text">
          ${title}
        </h1>
      </div>
      <div class="card_body">
        <p>
          ${body}
        </p>
      </div>
    </div>
  `
}

function cardUser(
  name,
  userName, 
  email, 
  street, 
  suite, 
  city, 
  zipcode, 
  lat, 
  lng, 
  phone, 
  website, 
  nameCompany, 
  catchPhrase,
  bs,
  ){
  return `
    <div class="cardUsers">
      <div class="card_header">
        <h1 class="card_text">
          ${name} ${userName}
        </h1>
      </div>
      <div class="card_body">
        <div>
          <ul>
            <li>email: ${email}</li>
            <li>phone: ${phone}</li>
            <li>website: ${website}</li>
          </ul>
        </div>
        <div>
          <h3>adress:</h3>
          <ul>
            <li>street: ${street}</li>
            <li>suite: ${suite}</li>
            <li>city: ${city}</li>
            <li>zipcode: ${zipcode}</li>
          </ul>
        </div>
        <div>
          <h3>geo:</h3>
          <ul>
            <li>lat: ${lat}</li>
            <li>lng: ${lng}</li>
          </ul> 
        </div>
        <div>
          <h3>company:</h3>
          <ul>
            <li>name: ${nameCompany}</li>
            <li>catchPhrases: ${catchPhrase}</li>
            <li>bs: ${bs}</li>
          </ul>
        </div>
      </div>
    </div>
  `
}

function cardComments(name, email, body, postId){
  return `
    <div class="cardComments">
      <div class="card_header">
        <h1 class="card_text">
          ${postId}
        </h1>
      </div>
      <div class="card_body">
        <h2>${name}</h2>
        <p>${email}</p>
        <p>
          ${body}
        </p>
      </div>
    </div>
  `
}

function cardAlbums(userId, title){
  return `
    <div class="cardAlbums">
      <div class="card_header">
        <h1 class="card_text">
          ${userId}
        </h1>
      </div>
      <div class="card_body">
        <p>
          ${title}
        </p>
      </div>
    </div>
  `
}

function cardPhotos(id, title, url){
  return `
    <div class="cardPhotos">
      <div class="card_header">
        <h1 class="card_text">
          ${id}
        </h1>
      </div>
      <div class="card_body">
        <h2>${title}</h2>
        <img src="${url}">
      </div>
    </div>
  ` 
}

function cardTodos(userId, title, completed) {
  return `
    <div class="cardTodos">
      <div class="card_header">
        <h1 class="card_text">
          ${userId}
        </h1>
      </div>
      <div class="card_body">
        <p>
          ${title}
        </p>
        <p>
          ${completed}
        </p>
      </div>
    </div>
  `
}

getBase('', e => console.log(e))
