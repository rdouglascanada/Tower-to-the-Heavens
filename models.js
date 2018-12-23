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
    getStateModel() {
        return this.getModel('_stateModel', () => {
            return {
                _state: 'title',
                state() {return this._state;},
                transitionToTitle() {this._state = 'title';},
                transitionToBattle() {this._state = 'battle';}
            };
        });
    }
    getPlayerModel() {
        return this.getModel('_playerModel', () => {
            return {
                name: () => "Lucy",
                hp: 100,
                pwr: 0,
                maxHP: () => 100,
                takeDamage(damage) {
                    this.hp -= damage;
                    this.hp = Math.max(0, this.hp);
                }
            };
        });
    }
    getEnemyModel() {
        return this.getModel('_enemyModel', () => {
            return {
                name: () => "Nemesis",
                hp: 50,
                maxHP: () => 50,
                takeDamage(damage) {
                    this.hp -= damage;
                    this.hp = Math.max(0, this.hp);
                }
            };
        });
    }
    getTitleStartButtonModel() {
        return this.getModel('_titleStartButtonModel', () => {
            return {
                x: () => 100,
                y: () => 300,
                width: () => 125,
                height: () => 100,
                highlighted: false
            };
        });
    }
    getBattleMovesButtonModel() {
        return this.getModel('_battleMovesButtonModel', () => {
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