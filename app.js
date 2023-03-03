let upgrades = [
  {
    name: 'tools',
    currentKarma: 0,
    maxKarma: 1,
    incrementKarma: 1,
    quantity: 0,
    price: 2
  },
  {
    name: 'mask',
    currentKarma: 0,
    maxKarma: 2,
    incrementKarma: 2,
    quantity: 0,
    price: 4
  },
]

let intUpgrades = [
  {
    name: 'volunteer',
    currentKarma: 0,
    maxKarma: 1,
    incrementKarma: 1,
    quantity: 0,
    price: 10
  },
  {
    name: 'boat',
    currentKarma: 0,
    maxKarma: 2,
    incrementKarma: 2,
    quantity: 0,
    price: 20
  }
]

const bottle = {
  karma: 1
}


let karma = 0;
let lifetimeKarma = 0;
let spentKarma = 0;

let currentKarmaElem = document.getElementById("current-karma")
let lifetimeKarmaElem = document.getElementById("lifetime-karma")
let spentKarmaElem = document.getElementById("spent-karma")

drawUpgradePrice()
loadInfo()

function cleanUp() {
  let upgradesKarma = 0
  upgrades.forEach(u => {
    upgradesKarma += u.currentKarma
  })
  karma += (bottle.karma + upgradesKarma)
  lifetimeKarma += (bottle.karma + upgradesKarma)
  drawKarma()
  checkButtons()
}

function buyUpgrade(list, name) {
  let newUpgrade = list.find(u => u.name == name)
  if (karma >= newUpgrade.price) {
    newUpgrade.currentKarma = newUpgrade.maxKarma
    newUpgrade.maxKarma += newUpgrade.incrementKarma
    karma -= newUpgrade.price
    spentKarma += newUpgrade.price
    newUpgrade.quantity++
    newUpgrade.price += Math.floor(newUpgrade.price / 10)

  } else window.alert("You don't have enough karma for that!")
  console.log(newUpgrade);

  drawKarma()
  drawStats()
  drawUpgradeStats()
  drawUpgradePrice()
  checkButtons()
}

function checkButtons() {
  for (let i = 0; i < upgrades.length; i++) {
    if (karma < upgrades[i].price) {
      document.getElementById(upgrades[i].name).style.pointerEvents = 'none';
      document.getElementById(upgrades[i].name).classList.add("text-danger");
    } else {
      document.getElementById(upgrades[i].name).style.pointerEvents = 'auto';
      document.getElementById(upgrades[i].name).classList.remove("text-danger");
    }
  }

  for (let i = 0; i < intUpgrades.length; i++) {
    if (karma < intUpgrades[i].price) {
      document.getElementById(intUpgrades[i].name).style.pointerEvents = 'none';
      document.getElementById(intUpgrades[i].name).classList.add("text-danger");
    } else {
      document.getElementById(intUpgrades[i].name).style.pointerEvents = 'auto';
      document.getElementById(intUpgrades[i].name).classList.remove("text-danger");
    }
  }
}

// SECTION draw functions

function drawStats() {
  let statsElem = document.getElementById("stats")
  let upgradesKarma = 0
  let intUpgradeKarma = 0
  upgrades.forEach(u => upgradesKarma += u.currentKarma)
  intUpgrades.forEach(u => intUpgradeKarma += u.currentKarma)
  let template = `
  <h5>${bottle.karma + upgradesKarma}</h5>
<h5>${intUpgradeKarma}</h5>`
  statsElem.innerHTML = template
}

function drawKarma() {
  currentKarmaElem.innerText = karma.toString();
  lifetimeKarmaElem.innerText = lifetimeKarma.toString();
  spentKarmaElem.innerText = spentKarma.toString()
  saveInfo()
}

function drawUpgradePrice() {
  let upgradePriceElem = document.getElementById("upgrade-price")
  let template = `
    <h5 class = "mb-3">${upgrades[0].price}</h5>
    <h5 class = "mb-3">${upgrades[1].price}</h5>
    <h5 class = "mb-3">${intUpgrades[0].price}</h5>
    <h5 class = "mb-3">${intUpgrades[1].price}</h5>`

  upgradePriceElem.innerHTML = template
}

function drawUpgradeStats() {
  let upgradeStatsElem = document.getElementById("upgrade-stats")
  let template = `
    <h5>${upgrades[0].quantity}</h5>
    <h5>${upgrades[1].quantity}</h5>
    <h5>${intUpgrades[0].quantity}</h5>
    <h5>${intUpgrades[1].quantity}</h5>`
  upgradeStatsElem.innerHTML = template
}

// SECTION local storage functions

function saveInfo() {
  window.localStorage.setItem("karma", JSON.stringify(karma))
  window.localStorage.setItem("lifetime-karma", JSON.stringify(lifetimeKarma))
  window.localStorage.setItem("upgrades", JSON.stringify(upgrades))
  window.localStorage.setItem("intUpgrades", JSON.stringify(intUpgrades))
  window.localStorage.setItem("spent-karma", JSON.stringify(spentKarma))
}

function loadInfo() {
  karma = JSON.parse(window.localStorage.getItem("karma"))
  lifetimeKarma = JSON.parse(window.localStorage.getItem("lifetime-karma"))
  upgrades = JSON.parse(window.localStorage.getItem("upgrades"))
  intUpgrades = JSON.parse(window.localStorage.getItem("intUpgrades"))
  spentKarma = JSON.parse(window.localStorage.getItem("spent-karma"))

  drawUpgradeStats()
  drawUpgradePrice()
  drawKarma()
  drawStats()
}

// SECTION interval

function intervalUpgrades() {
  let intUpgradeKarma = 0
  intUpgrades.forEach(i => {
    intUpgradeKarma += i.currentKarma
  })
  karma += intUpgradeKarma
  lifetimeKarma += intUpgradeKarma
  console.log(intUpgradeKarma, 'intUpgradeKarma')
  drawKarma()
  drawStats()
  checkButtons()
}

setInterval(intervalUpgrades, 1000)