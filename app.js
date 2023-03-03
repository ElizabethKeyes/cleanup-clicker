const bottle = {
  karma: 1
}

const upgrades = [
  {
    name: 'tools',
    currentKarma: 0,
    maxKarma: 1,
    price: 2
  }
]

let karma = 0;
let lifetimeKarma = 0;
let upgradesKarma = 0

let currentKarmaElem = document.getElementById("current-karma")
let lifetimeKarmaElem = document.getElementById("lifetime-karma")


function cleanUp() {
  upgrades.forEach(u => {
    upgradesKarma = u.currentKarma
  })
  karma += (bottle.karma + upgradesKarma)
  lifetimeKarma += (bottle.karma + upgradesKarma)
  drawKarma()
}

function drawKarma() {
  currentKarmaElem.innerText = karma.toString();
  lifetimeKarmaElem.innerText = lifetimeKarma.toString();
}

function buyUpgrade(name) {
  let newUpgrade = upgrades.find(u => u.name = name)
  if (karma >= newUpgrade.price) {
    newUpgrade.currentKarma = newUpgrade.maxKarma
    newUpgrade.maxKarma += 1
    karma -= newUpgrade.price
  }
  console.log(newUpgrade);
  drawKarma()

}