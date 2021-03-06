
const main = ({ debug }, callback) => {
  const map = new geolonia.Map('#map')
  const marker = new geolonia.Marker()

  let endpoint = "https://api.propid.jp/dev/demo/"

  const addressInput = document.getElementById('address')
  const buildingInput = document.getElementById('building')
  const button = document.getElementById('button')
  const notFound = document.getElementById('not-found')

  const inputs = [ addressInput, buildingInput ]
  const showNotFound = (display) => notFound.style.display = display ? 'block' : 'none'

  inputs.forEach( input => {
    // No submit with Enter
    input.addEventListener('keypress', (e) => {
      if(e.keyCode === 13) {
        e.preventDefault()
        button.click()
      }
    })

    input.addEventListener('change', (e) => {
      showNotFound(false)
    })
  })

  if (location.hash.length) {
    const hashParams = decodeURI(location.hash).slice(1).split('&')
    addressInput.value = hashParams[0]
    buildingInput.value = hashParams[1]
  }

  // inject another endpoint
  const external = new URLSearchParams(location.search).get('url')
  if(external) {
      endpoint = external
  }

  button.addEventListener('click', () => {
    const address = addressInput.value
    const building = buildingInput.value
    const url = `${endpoint}?q=${address}&building=${building}&debug=${debug}`

    location.hash = encodeURI(`${address}&${building}`)

    fetch(url)
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error('application error')
      }
    })
    .catch(() => false)
    .then(result => {
      if(result) {
        showNotFound(false)

        const apiResponse = debug ? result.apiResponse : result
        const center = [apiResponse[0].location.lng, apiResponse[0].location.lat]
        map.flyTo({
          center: center,
          zoom: 17,
          essential: true,
        })
        marker.setLngLat(center).addTo(map)

        for (const item of apiResponse) {
          delete item.location
        }

        callback(result)
      } else {
        showNotFound(true)
        callback(false)
      }
    })
  })

}
