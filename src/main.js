import { World } from "./World/World";
import * as THREE from 'three';

// Array of horsement texts
/*
 hosrsemenText = [
 {
  title: "Ivan",
  info: "Ivan e car"
 },
 {
  title: "Ivan2",
  info: "Ivan2 e car"
 }
  ]
*/

/*
dopulnitelno info za onclick na koito i da e horsemen
() => {
  isCardVisible = true;
  cardTitle.innterHtml(horsementText[i].title)
    world.setCameraPosition(0)
  
}
*/



function main() {
  const container = document.querySelector('#scene-container');
  const world = new World(container);
  const firstHorsemen = document.querySelector('#horsemen1');
  const secondHorsemen = document.querySelector('#horsemen2');
  const thirdHorsemen = document.querySelector('#horsemen3');
  const fourthHorsemen = document.querySelector('#horsemen4');
// let isVisible = true;

  // document select card
  // document select card title (maybe h2)
  // document select card info text (may p)


  // document select X Button

  // x button onclick is visible stava false

  // const changeVisibility = () => {
  //   isVisible = !isVisible;

  //   if (isVisible) {
  //     fourthHorsemen.style.display = 'block';
  //   } else {
  //     fourthHorsemen.style.display = 'none';

  //   }
  // }
  firstHorsemen.addEventListener("click", () => {
    // isvible = true
    // document.querySelector('h1').innerHTML = "Obicham Mishel aka Shoshkata"
    // changeVisibility()
    world.setCameraPosition(0)
  });
  secondHorsemen.addEventListener("click", () => {
    world.setCameraPosition(1)
  });
  thirdHorsemen.addEventListener("click", () => {
    world.setCameraPosition(2)

  });
  fourthHorsemen.addEventListener("click", () => {
    world.setCameraPosition(3)
  });

  world.start();
}

main();