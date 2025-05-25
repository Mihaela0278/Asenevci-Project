import { World } from "./World/World";
import * as THREE from 'three';

// Array of hormsement texts
const horsemenInfo = {
  horsemen1: {
    title: "Цар Петър IV",
    images: `/pictures/tsar-petar-iv.png`,
    years: "1185 - 1197",
    text: `   
   Цар Петър, с кръщелно име Теодор, е най-възрастният от тримата братя Асеневци, вдигнали въстанието в Търново през 1185 г. и освободили България от византийска власт. 
    
   При обявяването на въстанието в Търново Теодор приема короната и името Петър, за да се покаже приемствеността на възстановената държава и Преславска България от времето на светия цар Петър (927-970). Фактът, че въстаническата войска се насочва първо към Преслав, за да освободи старата столица, говори също за почит към традицията.
    
  Цар Петър, като най-голям и мъдър от братята, е представен с жест на благословия към народа.`
  },

  horsemen2: {
    title: "Цар Иван Асен I",
    images: `/pictures/tsar-asen-i.png`,
    years: "1190 - 1195",
    text: `  
   Цар Иван Асен I е единият от тримата братя Асеневци - основатели на Втората българска държава (ХII-ХIV в.). Народното му име е Асен (Асян), а кръщелното, според патриарх Евтимий, е Йоан (Иван). В някои извори е назован още Белгун, което  на старобългарски значело ”знаещ”, ”мъдър”. 
    
   Иван Асен I (Асeн), заедно с по-големия си брат Петър (Теодор) освобождава България от Византийско владичество. Въстанието избухва в Търново при освещаването на храма на Св. Димитър,  в края на октомври 1185 г. Той е известен с привличането на кумански конници, внезапни рейдове и победи в Тракия, което принуждава Византия да сключи Ловешкия мир (1187) и законодателно утвърждава българската държавност. 
    
   Мъдър организатор и решителен пълководец, той превръща Търново в новата столица и пренася мощите на св. Иван Рилски. Той, търсейки международно признание, е убит през 1196 г. в заговор, който поставя началото на размирици в търновския двор.
    
  Цар Иван Асен I, като знак за своята решителност и непримиримост, е представен хванал здраво юздите на коня си и с боен меч в готовност.`
  },

  horsemen3: {
    title: "Цар Калоян",
    images: `/pictures/tsar-kaloqn.png`,
    years: "1197 - 1207",
    text: `
    Цар Калоян е най-малкият от тримата братя Асеневци, един от най-бележитите български владетели. Чрез умела дипломация и решителни военни действия той възвръща предишните територии на държавата, легитимира я в Европа и превръща новата столица Търново в административен и културен център.
    
   Цар Калоян си поставя за цел да обедини всички български земи под своя власт, като получи признаване на царска титла и скиптър. Под негова власт България възстановява Тракия, Родопите и западните земи и разгромява латинците при Одрин.
    
   Прозвището „Ромеоубиец“ му е дадено след безпощадното потушаване на византийския гарнизон във Варна, а съюзът му с куманите и коалициите срещу враговете демонстрира редкия му талант да обединява сили за обща цел.
    
  Като единственият от братята Асеневци, носещ католическата титла „крал“, той е изобразен на паметника „Асеневци“ с войнствена осанка и висока образованост.`
  },

  horsemen4: {
    title: "Цар Иван Асен II",
    images: `/pictures/tsar-ivan-asen-ii.png`,
    years: "1218 - 1241",
    text: `
   Иван Асен II е цар на България от 1218 до 1241 г. Той е син на Асен I и наследник на основателите на Второто българско царство, който с военна сила и храброст възстановява централната власт след узурпацията на Борил, превзема Търново и заслепява бившия си съперник. 
    
  Като умел дипломат и стратег сключва династични бракове — най-вече с унгарската принцеса Анна-Мария — и формира съюзи с латински и православни държави, разширявайки България „от море до море“ и затвърждавайки нейния престиж в Югоизточна Европа.
    
   Най-значимият му военен подвиг е Битката при Клокотница на 9 март 1230 г., където нанася решителен разгром на войските на Теодор Комнин и пленява епирския владетел, присъединявайки Тракия, Македония и Албания към българските владения. След тази победа той утвърждава върховенството си чрез възстановяване на Българската патриаршия през 1235 г., разцвет на търговията по Виа Егнатиа и монетосечене в Охрид, превръщайки Търново в духовен и икономически център на Балканите.

   Цар Иван Асен II, чието величие достига своя пик с разгръщането на България отново до три морета, е изобразен с корона и копие, пробождащо нарушения мирен договор от Теодор Комнин. Пергаментът е набучен на копие и издигнат като боен щандарт, за да вдъхнови войската на царя за сражение. Битка, завършила с пълен успех за българския цар.`
  },

}

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

  // Information menu
  const infoContent = document.querySelector(".info-content");
  const infoContainer = document.querySelector("#info")
  const closeButton = document.querySelector("#close-btn");
  const infoTitle = document.querySelector(".info-title");
  const infoImages = document.querySelector(".info-images");
  const infoYears = document.querySelector(".info-years");
  const infoText = document.querySelector(".info-text");
  const minimize = document.querySelector("#minimize");
  const maximize = document.querySelector("#maximize");
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
  const maximizeContent = () => {
    infoContainer.style.transform = 'translateY(0)'
  }

  firstHorsemen.addEventListener("click", () => {
    // isvible = true
    // document.querySelector('h1').innerHTML = "Obicham Mishel aka Shoshkata"
    // changeVisibility()
    world.setCameraPosition(0);
    showInfo("horsemen1");
  });
  secondHorsemen.addEventListener("click", () => {
    world.setCameraPosition(1);
    showInfo("horsemen2")
  });
  thirdHorsemen.addEventListener("click", () => {
    world.setCameraPosition(2);
    showInfo("horsemen3");
  });
  fourthHorsemen.addEventListener("click", () => {
    world.setCameraPosition(3);
    showInfo("horsemen4");
  });


  function showInfo(id) {
    const data = horsemenInfo[id];
    maximizeContent();
    if (!data) return;
    infoTitle.textContent = data.title;
    infoYears.textContent = data.years;
    infoText.textContent = data.text;

    if (data.images) {
      infoImages.src = data.images;
      infoImages.style.display = "block";
    } else {
      infoImages.style.display = "none";
    }


    world.toggleControls(false)
    infoContainer.style.display = "block";
  }

  closeButton.addEventListener("click", () => {
    infoContainer.style.display = "none";
    world.toggleControls(true);
    world.setCameraPosition(4);
  })



  minimize.addEventListener("click", () => {
    infoContainer.style.transform = 'translateY(-100%)'
  })

  maximize.addEventListener("click", maximizeContent)

  world.start();
}

main();