class ModelUtils {
    static initButtonModel(args) {
        return {
            gameModels: args.gameModels,
            x: args.x,
            y: args.y,
            width: args.width,
            height: args.height,
            onClick: args.onClick,
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
                gameModels: this,
                state() {return this._state;},
                transitionToTitle() {this._state = 'title';},
                transitionToBattle() {
                    this._state = 'battle';
                    const playerModel = this.gameModels.getPlayerModel();
                    playerModel.hp = playerModel.maxHP();
                    const enemyModel = gameModels.getEnemyModel();
                    enemyModel.hp = enemyModel.maxHP();
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    battleStateModel.transitionToCommand();
                },
                transitionToVictory() {this._state = 'victory';},
                transitionToLoss() {this._state = 'loss';}
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
                },
                isDead() {return this.hp <= 0;}
            };
        });
    }
    getEnemyModel() {
        return this.getModel('_enemyModel', () => {
            return {
                name: () => "Nemesis",
                hp: 100,
                maxHP: () => 100,
                takeDamage(damage) {
                    this.hp -= damage;
                    this.hp = Math.max(0, this.hp);
                },
                isDead() {return this.hp <= 0;}
            };
        });
    }
    getSelectedMoveModel() {
        return this.getModel('_selectedMoveModel', () => {
            return {
                move: undefined,
                source: undefined,
                target: undefined
            };
        });
    }
    getMoveAttackModel() {
        return this.getModel('_moveAttackModel', () => {
            return {
                name: () => "Attack",
                damage: () => 20
            };
        });
    }
    getMoveHomingFireModel() {
        return this.getModel('_moveHomingFireModel', () => {
            return {
                name: () => "Homing Fire",
                damage: () => 10
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
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    stateModel.transitionToBattle();
                }
            });
        });
    }
    getBattleStateModel() {
        return this.getModel('_battleStateModel', () => {
            return {
                _state: 'command',
                gameModels: this,
                state() {return this._state;},
                transitionToCommand() {
                    this._state = 'command';
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    selectedMoveModel.move = undefined;
                    selectedMoveModel.source = playerModel;
                },
                transitionToMessage(move, source, target) {
                    this._state = 'message';
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    selectedMoveModel.move = move;
                    selectedMoveModel.source = source;
                    selectedMoveModel.target = target;
                    target.takeDamage(move.damage());
                }
            };
        });
    }
    getBattleAttackButtonModel() {
        return this.getModel('_battleAttackButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 50,
                y: 325,
                width: 150,
                height: 100,
                onClick() {
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    const moveModel = this.gameModels.getMoveAttackModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();
                    battleStateModel.transitionToMessage(moveModel, playerModel, enemyModel);
                }
            });
        });
    }
    getBattleHomingFireButtonModel() {
        return this.getModel('_battleHomingFireButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 250,
                y: 325,
                width: 200,
                height: 100,
                onClick() {
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    const moveModel = this.gameModels.getMoveHomingFireModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();
                    battleStateModel.transitionToMessage(moveModel, playerModel, enemyModel);
                }
            });
        });
    }
    getBattleMessageModel() {
        return this.getModel('_battleMessageModel', () => {
            return {
                gameModels: this,
                message() {
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    return selectedMoveModel.source.name() + " uses " + selectedMoveModel.move.name() +"! " +
                        selectedMoveModel.target.name() + " takes " + selectedMoveModel.move.damage() +" damage!";
                },
                deathMessage() {
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    return selectedMoveModel.target.isDead() ? selectedMoveModel.target.name() + " dies!" : "";
                }
            };
        });
    }
    getBattleMessageButtonModel() {
        return this.getModel('_battleMessageButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 600,
                y: 450,
                width: 150,
                height: 100,
                onClick() {
                    const stateModel = this.gameModels.getStateModel();
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();

                    if (playerModel.isDead()) {
                        stateModel.transitionToLoss();
                    } else if (enemyModel.isDead()) {
                        stateModel.transitionToVictory();
                    } else if (selectedMoveModel.source === playerModel) {
                        const moveAttackModel = this.gameModels.getMoveAttackModel();
                        battleStateModel.transitionToMessage(moveAttackModel, enemyModel, playerModel);
                    } else {
                        battleStateModel.transitionToCommand();
                    }
                }
            });
        });
    }
    getVictoryBattleAgainButtonModel() {
        return this.getModel('_victoryBattleAgainButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 100,
                y: 300,
                width: 125,
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    stateModel.transitionToBattle();
                }
            });
        });
    }
    getLossBackToTitleButtonModel() {
        return this.getModel('_lossBackToTitleButtonModel', () => {
            return ModelUtils.initButtonModel({
                gameModels: this,
                x: 100,
                y: 300,
                width: 125,
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    stateModel.transitionToTitle();
                }
            });
        });
    }
}