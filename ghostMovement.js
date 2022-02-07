import { DIRECTIONS, OBJECT_TYPE } from './setup';

// Primitive random movement.
export function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextPos = position + dir;
  // Create an array from the diretions objects keys
  const keys = Object.keys(DIRECTIONS);

  while (
    objectExist(nextPos, OBJECT_TYPE.WALL) ||
    objectExist(nextPos, OBJECT_TYPE.GHOST)
  ) {
    // Get a random key from that array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set the new direction
    dir = DIRECTIONS[key];
    // Set the next move
    nextPos = position + dir;
  }

  return { nextPos, direction: dir };
}
