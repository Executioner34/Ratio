import 'reset-css';
import './style.css';

import {Game} from './components/Game';

const app = document.querySelector<HTMLDivElement>("#app")!;

new Game({
  root: app,
  size: 5,
});






