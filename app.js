// =========================================
// PWA & SERVICE WORKER
// =========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('PWA Service Worker registrován!', reg))
          .catch(err => console.error('PWA chyba:', err));
  });
}

// =========================================
// FIREBASE DATABÁZE (PŘÍPRAVA)
// =========================================
// Až si založíte projekt na Google Firebase, přepište tyto hodnoty:
const firebaseConfig = {
  apiKey: "VLOZ_SVUJ_API_KEY_ZDE",
  authDomain: "tvuj-projekt.firebaseapp.com",
  projectId: "tvuj-projekt",
};

let db = null;
try {
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "VLOZ_SVUJ_API_KEY_ZDE") {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      console.log("Firebase aktivní!");
  }
} catch (e) { console.log("Firebase zatím není nastaven, používám lokální úložiště."); }

// =========================================
// DATA MÍST
// =========================================
const data = {
    hotels: [
      {
        name: "Penzion Forman",
        city: "Rožnov pod Radhoštěm",
        link: "https://www.booking.com/Share-q7P8Cz",
        description: "Penzion Forman se nachází v hotelovém rezortu v Rožnově pod Radhoštěm a nabízí nepřetržitě otevřenou recepci. Prakticky zařízené pokoje mají TV a koupelnu s vanou nebo sprchou a toaletou. Hosté penzionu Forman mohou za příplatek využívat wellness centrum s krytým bazénem, saunami, fitness centrem a masážemi, které najdete hned vedle. Tenisový kurt je vzdálený 800 metrů. Pivní lázně jsou vzdálené 1,8 km. Lyžařský areál Pustevny je vzdálený 20 km a na místě je lyžárna. Parkovat lze zdarma. Na místní vlakové nádraží je to 1,6 km. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita",
        rating: 9.0,
        price: "od 2 871 Kč"
      },
      {
        name: "Penzion Šafrán", 
        city: "Jeseník", 
        link: "https://www.booking.com/Share-sRVQ4k", 
        description: "Penzion Šafrán se nachází v Jeseníku a nabízí ubytování s zahradou, neplaceným soukromým parkovištěm a barem. Praděd je 37 km daleko. Zhruba 39 km od ubytování se nachází Muzeum papíru Velké Losiny, 43 km daleko je Złoty Stok Gold Mine a 40 km Open-air folk museum. Tento penzion poskytuje restauraci s jídly místní kuchyně a bezplatné Wi-Fi. V ubytování Penzion Šafrán mají všechny pokoje psací stůl. Všechny pokoje mají vlastní koupelnu a sprchu a některé pokoje nabízejí balkon. Všechny pokoje v ubytování Penzion Šafrán mají v ceně ložní prádlo a ručníky. V ubytování Penzion Šafrán se podává kontinentální snídaně. Letiště Leoše Janáčka Ostrava leží 117 km od ubytování. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita",
        rating: 8.5,
        price: "od 3 356 Kč"
      },
      {
        name: "Penzion JaRo", 
        city: "Hodonín", 
        link: "https://www.booking.com/Share-lUMZYz", 
        description: "Nabízí restauraci, zahradu a bar. K dispozici jsou turistické informace a úschovna zavazadel. Penzion JaRo poskytuje pokoje s posezením a TV s plochou obrazovkou. Pokoje mají vlastní koupelnu se sprchou a fénem a bezplatné Wi-Fi. Penzion JaRo poskytuje klimatizované pokoje s psacím stolem. Každé ráno se podává snídaně formou bufetu. Penzion JaRo má sluneční terasu. V Hodoníně a okolí se můžete věnovat pěší turistice a dalším aktivitám. Penzion JaRo stojí 43 km od Mikulova a 31 km od Lednice. Na letiště Brno-Tuřany je to 71 km.",
        rating: 8.9,
        price: "od 4 421 Kč"
      },
      {
        name: "Hotel Praděd Rýmařov", 
        city: "Rýmařov", 
        link: "https://www.booking.com/Share-GRiDkX", 
        description: "Hotel Praděd Rýmařov se nachází v Rýmařově a nabízí ubytování s terasou, neplaceným soukromým parkovištěm a barem. Olomoucký hrad je 45 km daleko. Tento hotel se 3 hvězdičkami se nachází v budově z roku 1896. Sloup Nejsvětější Trojice je 47 km daleko a Praděd 27 km. Toto ubytování poskytuje konferenční a banketové prostory, restauraci s jídly místní kuchyně a bezplatné Wi-Fi ve všech prostorách. Hotel Praděd Rýmařov nabízí snídani formou bufetu nebo kontinentální snídani. Během pobytu v ubytování Hotel Praděd Rýmařov se můžete v Rýmařově a okolí věnovat různým aktivitám, jako je například lyžování a cyklistika. Muzeum papíru Velké Losiny se nachází 33 km od ubytování Hotel Praděd Rýmařov a Olomouc hlavní nádraží 45 km od ubytování. Letiště Leoše Janáčka Ostrava leží 84 km daleko. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita.",
        rating: 8.4,
        price: "3 788 Kč"
      },
      {
        name: "Hotel Petrovy kameny", 
        city: "Karlova Studánka", 
        link: "https://www.booking.com/Share-4kqpb7", 
        description: "Hotel Petrovy kameny se nachází v destinaci Karlova Studánka a poskytuje ubytování s fitness centrem, soukromým parkovištěm, zahradou a sdíleným loungem. Praděd je 2,7 km daleko. Ubytování nabízí dětský klub a dětské hřiště. Tento hotel má terasu a výhled na hory. Na jídlo lze zajít do restaurace a na skleničku do baru. V ubytování Hotel Petrovy kameny mají všechny pokoje psací stůl a TV s plochou obrazovkou. Vybavení všech pokojů zahrnuje kávovar a vlastní koupelnu s bezplatnými toaletními potřebami a některé pokoje zahrnují kuchyň s lednicí. Všechny pokoje v ubytování Hotel Petrovy kameny mají v ceně ložní prádlo a ručníky. V ubytování Hotel Petrovy kameny se připravuje snídaně formou bufetu a kontinentální snídaně. V ubytování Hotel Petrovy kameny můžete využívat hammam. V tomto hotelu se 4 hvězdičkami můžete hrát stolní tenis a zdejší oblast je oblíbená u milovníků lyžování a cyklistiky. Muzeum papíru Velké Losiny se nachází 26 km od ubytování Hotel Petrovy kameny. Letiště Leoše Janáčka Ostrava leží 96 km daleko. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita",
        rating: 9.7,
        price: "od 5 400 Kč"
      },
      {
        name: "Horský hotel Vidly", 
        city: "Karlova Studánka", 
        link: "https://www.booking.com/Share-wpxaxsp", 
        description: "Horský hotel Vidly se nachází v destinaci Karlova Studánka a poskytuje ubytování s zahradou, neplaceným soukromým parkovištěm, terasou a barem. Praděd je 17 km daleko. Ubytování nabízí lyžárnu. Muzeum papíru Velké Losiny se nachází 39 km daleko. Tento hotel nabízí saunu, dětský klub a bezplatné Wi-Fi. V ubytování Horský hotel Vidly mají všechny pokoje šatní skříň, TV s plochou obrazovkou, vlastní koupelnu, ložní prádlo a ručníky. Vlastní koupelna je vybavená sprchou, bezplatnými toaletními potřebami a fénem. V ubytování se podává snídaně. V nabídce je snídaně formou bufetu, kontinentální snídaně nebo americká snídaně. V ubytování Horský hotel Vidly si můžete zahrát stolní tenis a zdejší oblast je oblíbená u milovníků lyžování a cyklistiky. Letiště Leoše Janáčka Ostrava leží 97 km daleko. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita",
        rating: 9.4,
        price: "6 399 Kč"
      },
      {
        name: "Park Penzion", 
        city: "Malá Morávka", 
        link: "https://www.booking.com/Share-vz9Xr3s", 
        description: "Park Penzion se nachází v Malé Morávce a nabízí ubytování s zahradou, neplaceným soukromým parkovištěm, terasou a barem. Praděd je 15 km daleko. Tento penzion má restauraci. Muzeum papíru Velké Losiny se nachází ve vzdálenosti 43 km. V ubytování Park Penzion mají všechny pokoje šatní skříň, TV s plochou obrazovkou, vlastní koupelnu, ložní prádlo a ručníky. Vlastní koupelna je vybavená sprchou a bezplatnými toaletními potřebami. V ubytování Park Penzion se připravuje snídaně formou bufetu a kontinentální snídaně. Park Penzion nabízí dětské hřiště. Během pobytu v ubytování Park Penzion se můžete v Malé Morávce a okolí věnovat různým aktivitám, jako je například peší turistika, lyžování a cyklistika. Letiště Leoše Janáčka Ostrava leží 91 km od ubytování. Hostům, kteří se zde ubytovali v páru, se velmi líbila lokalita",
        rating: 9.2,
        price: "od 3 915 Kč"
      }
    ],
    restaurants: [
      {
        name: "Rožnovský Pivovar",
        city: "Rožnov pod Radhoštěm",
        link: "https://www.roznovskepivnilazne.cz/?ved=2ahUKEwiI7LWgvZeUAxU9bPEDHZQUFb0QgU96BAgYEAQ",
        description: "Možná jsou Rožnovské pivní lázně prvními lázněmi zcela nového druhu. Snažíme se totiž skloubit prvky alternativního léčitelství vycházejícího z prastarých technik starých Egypťanů a východních kultur s běžnými i méně běžnými lázeňskými a fyzioterapeutickými postupy. Díky osobním zkušenostem totiž hluboce věříme, že pouze skrze dosažení harmonie těla a duše lze žít šťastný život v lásce, radosti, zdraví, hojnosti a prosperitě.",
        rating: 4.4
      },
      {
        name: "Naše BISTRO Jeseník",
        city: "Jeseník",
        link: "https://www.roznovskepivnilazne.cz/?ved=2ahUKEwiI7LWgvZeUAxU9bPEDHZQUFb0QgU96BAgYEAQ",
        description: "Naše nabídka s sebou vám umožní vychutnat si naše jídla z pohodlí vašeho domova. Naše zařízení má následující vybavení: venkovní servis, klimatizaci, parkoviště a Wifi zdarma. Zajišťujeme akce, pro více informací nás neváhejte kontaktovat. Každý je vítán v našem podniku, který je navržen tak, aby byl pro všechny snadno dostupný. Rádi ubytujeme i vaše mazlíčky. Pro platbu si můžete vybrat bezkontaktní, Mastercard a VISA. Kontaktujte nás pro rezervaci vašeho stolu.",
        rating: 4.8
      },
      {
        name: "Burgrs, Fresh Burger Bistro",
        city: "Hodonín",
        link: "https://www.burgrs.eu/?ved=2ahUKEwiD0ZGhv5eUAxWOSfEDHQ21Mr8QgU96BAgbEAQ",
        description: "Ano, máme rádi dobré jídlo a pití. Jsme ochotni za ním cestovat i stovky kilometrů. A proto jsme se rozhodli otevřít BURGR'S, fresh burger bistro, jelikož na opravdu dobré Burgry jsme v okolí nenarazili. Jsme zastánci toho, že zbytečná chemie do jídla nepatří a od toho se odvíjí veškeré naše dění. V BURGR'S Vám nabídneme jídlo a pití s čistým svědomím, které připravujeme i našim dětem.",
        rating: 4.6
      },
      {
        name: "Restaurace znamky",
        city: "Rýmařov",
        link: "https://restaurace-znamky.cz/",
        description: "V naší restauraci připravujeme tradiční česká jídla bez použití dochucovadel a polotovarů. Dbáme na čerstvost surovin. Od houskových knedlíků a bramborových noků - přes housky na hamburgery, špecle či krokety - vše si připravujeme v naší kuchyni sami. Stálému lístku dominuje svíčková a domácí borůvkové knedlíky z jesenických borůvek (je-li zrovna jejich sezóna). Ke Svijanskému mázu můžete mít konfit z kachního stehýnka s opečenými bramborovými škubánky nebo vepřová žebírka s fermentovaným zelným salátem. Každý den vaříme dvě polévky a minimálně tři obědová menu.",
        rating: 4.6
      },
      {
        name: "Bistro Hubertus",
        city: "Karlova Studánka",
        link: "https://share.google/5Jhznn3YlDs8U3L6T",
        description: "Vítejte v Bistru Hubertus, vašem oblíbeném místě pro rychlé a chutné občerstvení v malebné Karlově Studánce. Naše bistro je ideálním místem pro ty, kteří hledají skvělé jídlo v přátelském a uvolněném prostředí. Naše nabídka Specializujeme se na nabídku hotových jídel, která uspokojí vaši chuť na něco rychlého a zároveň chutného. V našem menu najdete široký výběr pokrmů, včetně oblíbených hamburgerů, párků v rohlíku a dalších pochoutek. Vždy se snažíme, aby každé jídlo bylo připraveno s důrazem na kvalitu a čerstvost.",
        rating: 4.5
      },
      {
        name: "Na hvězdě",
        city: "Malá Morávka",
        link: "https://www.nahvezde.cz/",
        description: "Penzion a restaurace Na Hvězdě se nachází na strategickém místě u nástupní stanice Praděd - Ovčárna a zároveň mezi středisky Studánka a Malá Morávka - Karlov. Nabízíme vynikající českou kuchyni a ubytování na samotě v našem prostorném apartmánu.",
        rating: 4.3
      }
    ]
  };
// =========================================
// GLOBÁLNÍ STAV A FUNKCE
// =========================================
let liked = new Set();
let pastTrips = [];

// Hlavní funkce pro ukládání (podporuje LocalStorage i Firebase)
function saveState() {
  const state = { liked: [...liked], pastTrips };
  
  // 1. Vždy uložíme lokálně pro jistotu a rychlost
  localStorage.setItem("travelApp", JSON.stringify(state));

  // 2. Pokud je nastaven Firebase, pošleme to i tam
  if (db) {
      db.collection("sync").doc("sharedData").set(state)
          .then(() => console.log("Uloženo do cloudu"))
          .catch(err => console.error("Chyba cloudu", err));
  }
}

// Funkce pro načtení
function loadState() {
  // 1. Zkusíme načíst z Firebase (pokud je připojen)
  if (db) {
      db.collection("sync").doc("sharedData").onSnapshot((doc) => {
          if (doc.exists) {
              const data = doc.data();
              liked = new Set(data.liked || []);
              pastTrips = data.pastTrips || [];
              // Pokud jsme zrovna na stránce výletů, překreslíme ji
              if(typeof renderCities === "function" && document.getElementById("main-content")) {
                 // Necháme aktivní pohled, jaký je
              }
          }
      });
  } 
  
  // 2. Lokální záloha (proběhne vždy okamžitě)
  const saved = localStorage.getItem("travelApp");
  if(saved){
      const parsed = JSON.parse(saved);
      liked = new Set(parsed.liked || []);
      pastTrips = parsed.pastTrips || [];
  }
}

// Inicializace temného módu
function initTheme() {
  if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadState();
});