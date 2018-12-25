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
                move: undefined
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
                    selectedMoveModel.move = undefined;
                },
                transitionToPlayerAttack(move) {
                    this._state = 'playerAttack';
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    const enemyModel = this.gameModels.getEnemyModel();
                    selectedMoveModel.move = move;
                    enemyModel.takeDamage(move.damage());
                },
                transitionToEnemyAttack(move) {
                    this._state = 'enemyAttack';
                    const selectedMoveModel = this.gameModels.getSelectedMoveModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    selectedMoveModel.move = move;
                    playerModel.takeDamage(move.damage());
                },
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
                    battleStateModel.transitionToPlayerAttack(moveModel);
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
                    battleStateModel.transitionToPlayerAttack(moveModel);
                }
            });
        });
    }
    getBattleMessageModel() {
        return this.getModel('_battleMessageModel', () => {
            return {
                gameModels: this,
                message() {
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();

                    let message = "";
                    if (battleStateModel.state() === 'playerAttack') {
                        const selectedMove = this.gameModels.getSelectedMoveModel().move;
                        message = playerModel.name() + " uses " + selectedMove.name() +"! " +
                            enemyModel.name() + " takes " + selectedMove.damage() +" damage!";
                    } else if (battleStateModel.state() === 'enemyAttack') {
                        const selectedMove = this.gameModels.getSelectedMoveModel().move;
                        message = enemyModel.name() + " uses " + selectedMove.name() +"! " +
                            playerModel.name() + " takes " + selectedMove.damage() +" damage!";
                    }
                    return message;
                },
                deathMessage() {
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();
                    let deathMessage = "";
                    if (playerModel.isDead()) {
                        deathMessage = playerModel.name() + " dies!";
                    } else if (enemyModel.isDead()) {
                        deathMessage = enemyModel.name() + " dies!";
                    }
                    return deathMessage;
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
                    const playerModel = this.gameModels.getPlayerModel();
                    const enemyModel = this.gameModels.getEnemyModel();

                    if (playerModel.isDead()) {
                        stateModel.transitionToLoss();
                    } else if (enemyModel.isDead()) {
                        stateModel.transitionToVictory();
                    } else if (battleStateModel.state() === 'playerAttack') {
                        const moveAttackModel = this.gameModels.getMoveAttackModel();
                        battleStateModel.transitionToEnemyAttack(moveAttackModel);
                    } else if (battleStateModel.state() === 'enemyAttack') {
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
                    const playerModel = this.getPlayerModel();
                    playerModel.hp = playerModel.maxHP();
                    const enemyModel = this.getEnemyModel();
                    enemyModel.hp = enemyModel.maxHP();
                    stateModel.transitionToTitle();
                }
            });
        });
    }
}