class ModelUtils {
    static initButtonModel(args) {
        return {
            gameModels: args.gameModels,
            x: args.x,
            y: args.y,
            width: args.width,
            height: args.height,
            highlighted() {
              const mouseModel = this.gameModels.getMouseModel();
              return (this.x <= mouseModel.x && mouseModel.x <= this.x + this.width) &&
              (this.y <= mouseModel.y && mouseModel.y <= this.y + this.height);
          }
        };
    }
}

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
    getMouseModel() {
        return this.getModel('_mouseModel', () => {
            return {
                x: -1,
                y: -1
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
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 100,
                y: 300,
                width: 125,
                height: 100
            });
        });
    }
    getBattleAttackButtonModel() {
        return this.getModel('_battleAttackButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 50,
                y: 325,
                width: 150,
                height: 100
            });
        });
    }
    getBattleTakeDamageButtonModel() {
        return this.getModel('_battleTakeDamageButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 600,
                y: 325,
                width: 150,
                height: 100
            });
        });
    }
}