import SpriteBase from './sprite/SpriteBase';
import { hitboxSmallType, type hitboxType, type ICollusionBlock } from './types';

export function collision (object1: hitboxType | hitboxSmallType, object2: ICollusionBlock | SpriteBase): boolean {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

export function platformCollision (object1: hitboxType, object2: ICollusionBlock): boolean {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}
