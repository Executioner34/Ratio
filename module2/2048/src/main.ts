import 'reset-css';
import './style.css';

import {Game} from './components/Game';

const app = document.querySelector<HTMLDivElement>("#app")!;

const game = new Game({
  root: app,
  size: 5,
});






