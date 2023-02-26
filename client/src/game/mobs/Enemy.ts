import { ICollusionBlock, IAnimationsEnemy } from './../types';
import Player from "./Player";

class Enemy extends Player {
    constructor(cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: ICollusionBlock[], floorCollusions: ICollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimationsEnemy) {
        super(cont, scale, position, field, collusions, floorCollusions, imageSrc, frameRate, animations)
    }

    update() {
        super.update();
    }
}

export default Enemy;