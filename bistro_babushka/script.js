document.addEventListener("DOMContentLoaded", start);

const overskrift = document.querySelector("#menuNavn");
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {
    "x-apikey": "600ec2fb1346a1524ff12de4"
}

let menuretter;
let filter = "alle";

function start() {

    const filterKnapper = document.querySelectorAll("#menuNavigation button");

    document.querySelector("#burgermenu").addEventListener("click", onClickMenu);

    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerMenu));
    loadJSON();

}

function onClickMenu() {
    document.querySelector(".burgermenu_container").classList.toggle("change");
    document.querySelector(".burgermenu_link").classList.toggle("change");
    document.querySelector(".burger_bck").classList.toggle("change_img");
    document.querySelector("#burger1").classList.toggle("change1");
    document.querySelector("#burger2").classList.toggle("change1");
    document.querySelector("#burger3").classList.toggle("change1");
}

function filtrerMenu() {
    filter = this.dataset.kategori;

    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");

    visRetter();
    overskrift.textContent = this.textContent;
}

async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });

    menuretter = await JSONData.json();
    console.log("Menuretter", menuretter);

    visRetter();

}

function visRetter() {
    const destination = document.querySelector("#menukort");
    const skabelon = document.querySelector("template").content;

    destination.textContent = "";

    menuretter.forEach(ret => {
        console.log("Menuretter", ret.kategori);

        if (filter == ret.kategori || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".billede_ret").src = medieurl + ret.billede;
            klon.querySelector(".navn").textContent = ret.navn;
            klon.querySelector(".pris").textContent = ret.pris;
            klon.querySelector(".pris").textContent += ",-";
            klon.querySelector(".kort_beskrivelse").textContent = ret.kortbeskrivelse;

            //Når der klikkes på et billede, kaldes en anonym funktion, som fører videre til singleviewet
            klon.querySelector("#menu img").addEventListener("click", () => visDetaljer(ret));

            destination.appendChild(klon);
        }
    })

}

function visDetaljer(mad) {
    //her navigerer vi med location.href til en side. Vi sender url-parameteret ID med, og det får værdien af mad-.id
    location.href = `detaljer.html?id=${mad._id}`;
    console.log(window.location.href);
}
