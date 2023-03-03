const bottle = {
  karma: 1
}

const upgrades = [
  {
    name: 'tools',
    currentKarma: 0,
    maxKarma: 1,
    incrementKarma: 1,
    quantity: 0,
    price: 2
  },
  {
    name: 'net',
    currentKarma: 0,
    maxKarma: 2,
    incrementKarma: 2,
    quantity: 0,
    price: 4
  },
]

const intUpgrades = [
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

let karma = 0;
let lifetimeKarma = 0;

let currentKarmaElem = document.getElementById("current-karma")
let lifetimeKarmaElem = document.getElementById("lifetime-karma")


function cleanUp() {
  let upgradesKarma = 0
  upgrades.forEach(u => {
    upgradesKarma += u.currentKarma
  })
  karma += (bottle.karma + upgradesKarma)
  lifetimeKarma += (bottle.karma + upgradesKarma)
  drawKarma()
}

function drawKarma() {
  currentKarmaElem.innerText = karma.toString();
  lifetimeKarmaElem.innerText = lifetimeKarma.toString();
}

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

function buyUpgrade(name) {
  let newUpgrade = upgrades.find(u => u.name == name)
  if (karma >= newUpgrade.price) {
    newUpgrade.currentKarma = newUpgrade.maxKarma
    newUpgrade.maxKarma += newUpgrade.incrementKarma
    karma -= newUpgrade.price
    newUpgrade.quantity++
  } else window.alert("You don't have enough karma for that!")
  console.log(newUpgrade);
  drawKarma()
  drawStats()
}

function buyIntUpgrade(name) {
  let newUpgrade = intUpgrades.find(u => u.name == name)
  if (karma >= newUpgrade.price) {
    newUpgrade.currentKarma = newUpgrade.maxKarma
    newUpgrade.maxKarma += newUpgrade.incrementKarma
    karma -= newUpgrade.price
    newUpgrade.quantity++
  } else window.alert("You don't have enough karma for that!")
  console.log(newUpgrade);
  drawKarma()
  drawStats()
}

function intervalUpgrades() {
  let intUpgradeKarma = 0
  intUpgrades.forEach(i => {
    intUpgradeKarma += i.currentKarma
  })
  karma += intUpgradeKarma
  console.log(intUpgradeKarma, 'intUpgradeKarma')
  drawKarma()
  drawStats()
}

setInterval(intervalUpgrades, 1000)