/**
 * Reference to a div element used to log infos out.
 */
const LOG = document.getElementById("log");
/**
 * Index to access the right side character animations array.  
 */
const RIGHT = 0;
/**
 * Index to access the left side character animations array.  
 */
const LEFT = 1;
/**
 * Value that affects the jumping and throwing motions.
 * @var {{number}}
 */
const GRAVITY = 9.81 * 100;

export { LOG, GROUND_POS, RIGHT, LEFT, GRAVITY };
