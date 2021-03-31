const WIREFRAME_ON = true;
const WIREFRAME_OFF = false;
const DEBUG_ON = true;
const DEBUG_OFF = false;
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

export { LOG, RIGHT_DIRECTION, LEFT_DIRECTION, RIGHT_SIDE, LEFT_SIDE, ABOVE_SIDE, BELOW_SIDE, WIREFRAME_OFF, DEBUG_ON, DEBUG_OFF, WIREFRAME_ON,GRAVITY };