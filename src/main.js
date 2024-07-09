import p5 from 'p5';
import { sketch } from './sketch';
new p5(sketch);

const MILEI_PHRASES = [
  'Creo que el Estado es el enemigo, creo que el Estado es una asociación criminal…',
  'Entre la mafia y el Estado prefiero a la mafia. La mafia tiene códigos, la mafia cumple, la mafia no miente, la mafia compite',
  'La justicia social es aberrante',
  'Para mí los impuestos son un robo',
  'Cuando están en el poder nos tienen de esclavos',
  'Digamos, o sea, que usted tiene una hija y de repente hay alguien que tiene una adicción a tener violación a mujeres y su hija es víctima. Entonces, ¿qué va a decir? No, hay que terminar con el sistema de coparticipación, hay que barrerlo',
  'Algo que aportaría mucho es que se permitiera que las adopciones fueran un mercado libre y no un mercado regulado por el Estado. Vas a ver cómo aquellas que quedan embarazadas, aun cuando no quieren, van a encontrarle una salida a la situación',
  'El Estado es el pedófilo en el jardín de infantes, con los nenes encadenados y bañados en vaselina. Y los políticos son los que ejecutan el Estado',
  'La venta de órganos humanos es un mercado más',
  'Nosotros valoramos la visión de memoria, verdad y justicia. Pero empecemos por la verdad: no fueron 30.000 desaparecidos, son 8.753',
  'El calentamiento global es otra de las mentiras del socialismo. Hay toda una agenda de marxismo cultural (…). Hace 10 o 15 años se discutía que el planeta se iba a congelar, ahora discuten que se calienta',
  'En mi gobierno no va a haber marxismo cultural y no voy a estar pidiendo perdón por tener pene. Si de mí dependiera, cerraría el Ministerio de la Mujer',
  'Mi misión es cagar a patadas en el culo a keynesianos y colectivistas hijos de puta',
  'Una empresa que contamina el río, ¿dónde está el daño?',
  'No tengan miedo, den la batalla contra el zurderío, que se la vamos a ganar, somos superiores productivamente, somos superiores moralmente; esto no es para tibios, ¡viva la libertad carajo!',
];

let previousIndex = -1;

injectRandomPhrase();

setInterval(injectRandomPhrase, 4000);

function injectRandomPhrase() {
  let randomIndex = Math.floor(Math.random() * MILEI_PHRASES.length);
  while (randomIndex === previousIndex) {
    randomIndex = Math.floor(Math.random() * MILEI_PHRASES.length);
  }
  const frase = MILEI_PHRASES[randomIndex];
  const quote = document.getElementById('quote');

  quote.innerHTML = `"${frase}"`;
}
