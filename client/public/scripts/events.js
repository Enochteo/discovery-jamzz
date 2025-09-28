const renderEvents = async () => {
  const response = await fetch("/events");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");

  if (data) {
    data.map((concert) => {
      const eventDiv = document.createElement("div");
      eventDiv.className = "card";

      const topDiv = document.createElement("div");
      topDiv.className = "top-container";
      //topDiv.style.backgroundImage = `url('${concert.image}')`

      const bottomDiv = document.createElement("div");
      bottomDiv.className = "bottom-container";

      //topDiv.style.backgroundImage = '../safari.png'
      console.log(concert.image);
      topDiv.style.backgroundImage = `url('${
        concert.image || "../safari.png"
      }')`;

      const eventName = document.createElement("h3");
      eventName.textContent = concert.name;
      bottomDiv.appendChild(eventName);

      const venue = document.createElement("p");
      venue.textContent = concert.venue;
      bottomDiv.appendChild(venue);

      const genre = document.createElement("p");
      genre.textContent = concert.genre;
      bottomDiv.appendChild(genre);

      const eventDetails = document.createElement("a");
      eventDetails.textContent = "Find More about this Concert >";
      eventDetails.href = `/events/${concert.id}`;
      eventDetails.setAttribute("role", "button");
      bottomDiv.appendChild(eventDetails);

      eventDiv.appendChild(topDiv);
      eventDiv.appendChild(bottomDiv);

      mainContent.appendChild(eventDiv);
    });
  } else {
    const message = document.createElement("h1");
    message.textContent = "No Events Available at this time😞";
    mainContent.appendChild(message);
  }
};

const currentPath = window.location.pathname;

if (currentPath === "/" || currentPath === "/index.html") {
  renderEvents();
} else if (!currentPath.startsWith("/events")) {
  window.location.href = "/public/static/404.html";
}
