const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach(a => {
      a.addEventListener('click', event => {
        event.preventDefault()
        const url = a.getAttribute('href')
        Router.go(url)
      })
    })

    window.addEventListener('popstate', event => {
      Router.go(event.state.route, false)
    })
    Router.go(location.pathname)

  }, go: (route, addToHistory = true) => {
    console.log('Navigating to', route)

    if (addToHistory) {
      history.pushState({ route }, '', route)
    }
    let pageElement = null
    switch (route) {
      case '/':
        pageElement = document.createElement('menu-page')
        pageElement.textContent = 'Menu'
        break
      case '/order':
        pageElement = document.createElement('order-page')
        pageElement.textContent = 'Your Order'
        break;
      default:
        if (route.startsWith("/product-")){
          pageElement = document.createElement('details-page')
          pageElement.textContent = 'Details'
          pageElement.dataset.id = route.substring(route.lastIndexOf('-') + 1);
        }
    }
    if (pageElement) {
      const cache = document.querySelector('main')
      cache.innerHTML = ''
      cache.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  },
}

export default Router
