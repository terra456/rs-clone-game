import { IAnimations, IAnimationsEnemy } from '../types';

export const wariorAnimation: IAnimations = {
  hitbox: {
    width: 35,
    height: 55,
    offset: {
      x: 65,
      y: 50,
    }
  },
  idle: {
    imageSrc: '../../assets/warrior/Idle.png',
    frameRate: 8,
    frameBuffer: 3,
  },
  idleLeft: {
    imageSrc: '../../assets/warrior/IdleLeft.png',
    frameRate: 8,
    frameBuffer: 3,
  },
  run: {
    imageSrc: '../../assets/warrior/Run.png',
    frameRate: 8,
    frameBuffer: 5,
  },
  runLeft: {
    imageSrc: '../../assets/warrior/RunLeft.png',
    frameRate: 8,
    frameBuffer: 5,
  },
  jump: {
    imageSrc: '../../assets/warrior/Jump.png',
    frameRate: 2,
    frameBuffer: 3,
  },
  jumpLeft: {
    imageSrc: '../../assets/warrior/JumpLeft.png',
    frameRate: 2,
    frameBuffer: 3,
  },
  fall: {
    imageSrc: '../../assets/warrior/Fall.png',
    frameRate: 2,
    frameBuffer: 3,
  },
  fallLeft: {
    imageSrc: '../../assets/warrior/FallLeft.png',
    frameRate: 2,
    frameBuffer: 3,
  },
  hit: {
    imageSrc: '../../assets/warrior/Death.png',
    frameRate: 6,
    frameBuffer: 6,
  },
  atack: {
    imageSrc: '../../assets/warrior/Attack1.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  atackLeft: {
    imageSrc: '../../assets/warrior/AttackLeft.png',
    frameRate: 4,
    frameBuffer: 3,
  },
};

export const beeAnimation: IAnimationsEnemy = {
  hitbox: {
    width: 45,
    height: 40,
    offset: {
      x: 15,
      y: 5,
    }
  },
  move: {
    imageSrc: '../../assets/enemy/bee/fly.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  moveLeft: {
    imageSrc: '../../assets/enemy/bee/flyLeft.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  attack: {
    imageSrc: '../../assets/enemy/bee/attack.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  attackLeft: {
    imageSrc: '../../assets/enemy/bee/attackLeft.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  hit: {
    imageSrc: '../../assets/enemy/bee/hit.png',
    frameRate: 4,
    frameBuffer: 2,
  },
};

export const boarAnimation: IAnimationsEnemy = {
  hitbox: {
    width: 40,
    height: 25,
    offset: {
      x: 5,
      y: 5,
    }
  },
  idle: {
    imageSrc: '../../assets/enemy/Boar/Idle-Sheet.png',
    frameRate: 4,
    frameBuffer: 3,
  },
  move: {
    imageSrc: '../../assets/enemy/Boar/Walk-Base-Sheet.png',
    frameRate: 6,
    frameBuffer: 3,
  },
  run: {
    imageSrc: '../../assets/enemy/Boar/Run-Sheet.png',
    frameRate: 6,
    frameBuffer: 3,
  },
  hit: {
    imageSrc: '../../assets/enemy/Boar/Hit-Sheet.png',
    frameRate: 4,
    frameBuffer: 3,
  },
}

export const snailAnimation: IAnimationsEnemy = {
  hitbox: {
    width: 40,
    height: 25,
    offset: {
      x: 5,
      y: 5,
    }
  },
  move: {
    imageSrc: '../../assets/enemy/snail/walk-Sheet.png',
    frameRate: 8,
    frameBuffer: 3,
  },
  hide: {
    imageSrc: '../../assets/enemy/snail/Hide-Sheet.png',
    frameRate: 8,
    frameBuffer: 3,
  },
  hit: {
    imageSrc: '../../assets/enemy/snail/Dead-Sheet.png',
    frameRate: 8,
    frameBuffer: 3,
  },
}