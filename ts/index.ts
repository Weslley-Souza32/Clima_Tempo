const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionInfos = document.querySelector("#weather-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!input || !sectionInfos) return;
  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("A localização precisar ter mais de 3 caracteres!");
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=1c967fe8a427e205feeeb295e24a34a3&lang=pt_br&units=metric`
    );
    const data = await response.json();
    console.log(data);

    const infos = {
      temperatura: Math.round(data.main.temp),
      local: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionInfos.innerHTML = `
      <div class="weather-data">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}ºC</span>
      </div>
      <img src="${infos.icon}" />
    `;
  } catch (error) {
    console.log("Deu um erro na obtenção dos dados na API", error);
  }
});
