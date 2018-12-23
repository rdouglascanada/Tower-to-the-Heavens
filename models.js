class GameModels {
    getModel(key, initLambda) {
        if(!this[key]) {
            this[key] = initLambda();
        }
        return this[key];
    }
    getCanvasModel() {
        return this.getModel('_canvasModel', () => {
            return {
                width: () => 800,
                height: () => 600,
                backgroundColour: () => 'blue'
            };
        });
    }
    getEnemyModel() {
        return this.getModel('_enemyModel', () => {
            return {
                hp: 100,
                maxHP: () => 100,
                takeDamage(damage) {
                    this.hp -= damage;
                    this.hp = Math.max(0, this.hp);
                }
            };
        });
    }
    getMovesButtonModel() {
        return this.getModel('_moveButtonModel', () => {
            return {
                x: () => 50,
                y: () => 350,
                width: () => 700,
                height: () => 200,
                highlighted: false
            };
        });
    }
}