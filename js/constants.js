const WIREFRAME_ON = true;
const WIREFRAME_OFF = false;
const DEBUG_ON = true;
const DEBUG_OFF = false;
const SHOW_INFO_ON = true;
const SHOW_INFO_OFF = false;
/**
 * Damage Immunity time after beeing already hit
 */
const IMMUNITY_TIME = 1000;
/**
 * Constant that stands for zero
 */
const NULL = 0;
/**
 * Items in Game Lenght
 */
const ITEM_LENGTH = 20;
/**
 * Enemies in Game Lenght
 */
const ENEMY_LENGTH = 20;
/**
 * Scenes in Game Length
 */
const SCENE_LENGTH = 2;
/**
 * Reference to a div element used to log infos out.
 */
const LOG = document.getElementById("log");
/**
 * Index to scale the image to the Right.  
 */
const RIGHT_DIRECTION = 1;
/**
 *Index to scale the image to the Left. 
 */
const LEFT_DIRECTION = -1;
/**
 * Index to acces the right side collisionOffsets from array x.  
 */
const RIGHT_SIDE = 1;
/**
 *Index to acces the left side collisionOffsets from array x. 
 */
const LEFT_SIDE = 0;
/**
* Index to acces the above side collisionOffsets from array y.  
*/
const ABOVE_SIDE = 1;
/**
 *Index to acces the below side collisionOffsets from array y. 
 */
const BELOW_SIDE = 0;
/**
 * Value that affects the jumping and throwing motions.
 * @var {{number}}
 */
const GRAVITY = 9.81 * 100;

const ACTIONS = {
  jump: { key: "Space", requested: false },
  moveLeft: { key: "ArrowLeft", requested: false },
  moveRight: { key: "ArrowRight", requested: false },
  throw: { key: "KeyT", requested: false },
  // pause : { key : "KeyP", requested : false },
  // play :  { key : "KeyP", requested : false }
}

export {
  LOG,
  RIGHT_DIRECTION, LEFT_DIRECTION,
  RIGHT_SIDE, LEFT_SIDE, ABOVE_SIDE, BELOW_SIDE,
  WIREFRAME_OFF, WIREFRAME_ON,
  DEBUG_ON, DEBUG_OFF,
  GRAVITY,
  SHOW_INFO_ON, SHOW_INFO_OFF,
  SCENE_LENGTH, ENEMY_LENGTH, ITEM_LENGTH,
  NULL,
  IMMUNITY_TIME,
  ACTIONS
};