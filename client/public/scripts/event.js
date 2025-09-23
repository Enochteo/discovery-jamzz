const requestedId = parseInt(window.location.href.split('/').pop())

const renderEvent = async () => {
    const response = await fetch('/events')
    const data = await response.json()

    const eventContent = document.getElementById('event-content')
    let event
    if (data) {
        event = data.find(event => event.id === requestedId)
    }
    if (event){
        const eventDiv = document.createElement('div')
        eventDiv.className = 'event-container'

        const topContainer = document.createElement('div')
        topContainer.className = 'top-div'

        const bottomContainer = document.createElement('div')
        bottomContainer.className = 'bottom-div'

        const eventTitle = document.createElement('h2')
        eventTitle.textContent = `${event.name}`

        const artistNames = document.createElement('p')
        artistNames.textContent = event.artists.join(', ')
        topContainer.appendChild(eventTitle)
        bottomContainer.appendChild(artistNames)
        eventDiv.appendChild(topContainer)
        eventDiv.appendChild(bottomContainer)
        eventContent.appendChild(eventDiv)
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'This Event is not Available'
        eventContent.appendChild(message)
    }
}

renderEvent()