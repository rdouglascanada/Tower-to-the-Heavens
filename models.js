class ModelClasses {
    static ButtonModel(args) {
        return {
            gameModels: args.gameModels,
            text: args.text,
            x: args.x,
            y: args.y,
            width: args.width,
            height: args.height,
            onClick: args.onClick,
            highlighted() {
                const mouseModel = this.gameModels.getMouseModel();
                return (this.x <= mouseModel.x && mouseModel.x <= this.x + this.width) &&
                    (this.y <= mouseModel.y && mouseModel.y <= this.y + this.height);
            },
            handleClick() {
                const mouseModel = this.gameModels.getMouseModel();
                const mouseX = mouseModel.x;
                const mouseY = mouseModel.y;
                const buttonClicked =
                    (this.x <= mouseX && mouseX <= this.x + this.width) &&
                    (this.y <= mouseY && mouseY <= this.y + this.height);
                if (buttonClicked) {
                    this.onClick();
                }
            }
        };
    }
    static LevelModel(args) {
        return {
            name: () => args.name,
            index: () => args.index,
            enemies: () => args.enemies,
            progressModel: () => args.progressModel,
            isUnlocked() {
                return this.index() <= this.progressModel().levelIndex();
            }
        }
    }
    static Move(args) {
        return {
            name: () => args.name,
            damage: () => args.damage
        }
    }
    static BattleUnit(args) {
        return {
            name: () => args.name,
            hp: args.hp,
            pwr: args.pwr,
            moves: args.moves,
            maxHP: () => args.maxHP,
            takeDamage(damage) {
                this.hp -= damage;
                this.hp = Math.max(0, this.hp);
            },
            isDead() {return this.hp <= 0;},
            chooseMove() {
                return this.moves[0];
            }
        };
    }
}
class MoveModels {
    static Attack() {
        return ModelClasses.Move({
          name: "Attack",
          damage: 10
      })
    }
    static HomingFire() {
        return ModelClasses.Move({
            name: "Homing Fire",
            damage: 20
        })
    }
}
class BattleUnitModels {
    static FireMage() {
        return ModelClasses.BattleUnit({
            name: "Fire Mage",
            hp: 10,
            pwr: 0,
            maxHP: 10,
            moves: [
                MoveModels.HomingFire()
            ]
        })
    }
    static Nemesis() {
        return ModelClasses.BattleUnit({
            name: "Nemesis",
            hp: 100,
            pwr: 0,
            maxHP: 100,
            moves: [
                MoveModels.HomingFire()
            ]
        })
    }
}
class LevelModels {
    static Level1(progressModel) {
       return ModelClasses.LevelModel({
            name: "Level 1",
            index: 1,
            enemies: [
                BattleUnitModels.FireMage(),
                BattleUnitModels.FireMage(),
                BattleUnitModels.FireMage(),
            ],
            progressModel
        });
    }
    static Level2(progressModel) {
        return ModelClasses.LevelModel({
            name: "Level 2",
            index: 2,
            enemies: [
                BattleUnitModels.Nemesis()
            ],
            progressModel
        });
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
                y: -1,
                handleMouseMove(event) {
                    const element = event.target;
                    this.x = event.pageX - element.offsetLeft;
                    this.y = event.pageY - element.offsetTop;
                }
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
                transitionToLevelSelection() {this._state = 'levelSelection';},
                transitionToBattle(level) {
                    this._state = 'battle';
                    const playerModel = this.gameModels.getPlayerModel();
                    playerModel.hp = playerModel.maxHP();
                    const battleModel = this.gameModels.getBattleModel();
                    battleModel.initBattle(level);
                    const battleStateModel = this.gameModels.getBattleStateModel();
                    battleStateModel.transitionToCommand();
                },
                transitionToVictory(level) {
                    this._state = 'victory';
                    const progressModel = this.gameModels.getProgressModel();
                    progressModel.unlockNextLevel(level);
                },
                transitionToLoss() {this._state = 'loss';},
                transitionToComplete() {this._state = 'complete';}
            };
        });
    }
    getProgressModel() {
        return this.getModel('_progressModel', () => {
            const gameModels = this;
            return {
                _levelIndex: 1,
                levelIndex() {
                    return this._levelIndex;
                },
                _unlockMessage: "",
                unlockMessage() {
                    return this._unlockMessage;
                },
                unlockNextLevel(level) {
                    const levelSelectionModel = gameModels.getLevelSelectionModel();
                    if (level !== levelSelectionModel.lastLevel() && level.index() === this._levelIndex) {
                        this._levelIndex += 1;
                        this._unlockMessage = "You have unlocked the next level."
                    } else {
                        this._unlockMessage = "";
                    }
                }
            }
        });
    }
    getPlayerModel() {
        return this.getModel('_playerModel', () => {
            return ModelClasses.BattleUnit({
                name: "Lucy",
                hp: 100,
                pwr: 0,
                maxHP: 100,
                moves: [
                    MoveModels.Attack(),
                    MoveModels.HomingFire()
                ]
            });
        });
    }
    getLevelSelectionModel() {
        return this.getModel('_levelSelectionModel', () => {
            return {
                levels: [
                    LevelModels.Level1(this.getProgressModel()),
                    LevelModels.Level2(this.getProgressModel())
                ],
                lastLevel() {
                    return this.levels[this.levels.length - 1];
                },
                getButtonModels() {
                    let buttonModels = [];
                    if (this.levels) {
                        const buttonDimensions = [{x: 20, y: 120}, {x: 165, y: 120}];
                        this.levels.forEach((level, i) => {
                            if (level.isUnlocked()) {
                                buttonModels.push(ModelClasses.ButtonModel({
                                    gameModels,
                                    text: level.name(),
                                    x: buttonDimensions[i].x,
                                    y: buttonDimensions[i].y,
                                    width: 125,
                                    height: 100,
                                    onClick: () => {
                                        const stateModel = gameModels.getStateModel();
                                        stateModel.transitionToBattle(level);
                                    }
                                }));
                            }
                        });
                    }
                    return buttonModels;
                }
            };
        });
    }
    getTitleStartButtonModel() {
        return this.getModel('_titleStartButtonModel', () => {
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Start",
                x: 100,
                y: 300,
                width: 125,
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    stateModel.transitionToLevelSelection()
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
                    const selectedMoveModel = this.gameModels.getBattleCommandModel();
                    const playerModel = this.gameModels.getPlayerModel();
                    selectedMoveModel.move = undefined;
                    selectedMoveModel.source = playerModel;
                },
                transitionToTarget(move) {
                    this._state = 'target';
                    const selectedMoveModel = this.gameModels.getBattleCommandModel();
                    selectedMoveModel.move = move;
                },
                transitionToMessage(move, source, target) {
                    this._state = 'message';
                    const selectedMoveModel = this.gameModels.getBattleCommandModel();
                    selectedMoveModel.move = move;
                    selectedMoveModel.source = source;
                    selectedMoveModel.target = target;
                    target.takeDamage(move.damage());
                }
            };
        });
    }
    getBattleModel() {
        return this.getModel('_battleModel', () => {
            return {
                gameModels: this,
                _level: null,
                level() {return this._level;},
                _playerUnit: null,
                playerUnit() {return this._playerUnit;},
                _enemyUnits: [],
                enemyUnits() {return this._enemyUnits;},
                _turnIndex: 0,
                turnUnit() {
                    if (this._turnIndex === -1) {
                        return this.playerUnit();
                    } else {
                        return this.enemyUnits()[this._turnIndex];
                    }
                },
                isPlayerTurn() {
                    return this.turnUnit() === this.playerUnit();
                },
                isLost() {
                  return this.playerUnit().isDead();
                },
                isWon() {
                    for (let enemyUnit of this.enemyUnits()) {
                        if(!enemyUnit.isDead()) {
                            return false;
                        }
                    }
                    return true;
                },
                initBattle(level) {
                    this._level = level;
                    this._playerUnit = this.gameModels.getPlayerModel();
                    this._playerUnit.hp = this._playerUnit.maxHP();
                    this._enemyUnits = level.enemies();
                    this._enemyUnits.forEach((enemy) => enemy.hp = enemy.maxHP());
                    this._turnIndex = -1;
                },
                nextTurn() {
                    this._turnIndex += 1;
                    const enemyUnits = this.enemyUnits();
                    while(this._turnIndex < enemyUnits.length && enemyUnits[this._turnIndex].isDead()) {
                        this._turnIndex += 1;
                    }
                    if (this._turnIndex === enemyUnits.length) {
                        this._turnIndex = -1;
                    }
                },
                getEnemyAvatarModels() {
                    let avatarModels = [];
                    const enemyUnits = this._enemyUnits;
                    const avatarDimensions = [{x: 350, y: 50}, {x: 475, y: 50}, {x: 600, y: 50}];
                    enemyUnits.forEach((enemy, i) => {
                        avatarModels.push({
                            name: enemy.name(),
                            x: avatarDimensions[i].x,
                            y: avatarDimensions[i].y,
                            width: 100, height: 150,
                            hp: enemy.hp,
                            maxHP: enemy.maxHP()
                        });
                    });
                    return avatarModels;
                }
            };
        });
    }
    getBattleCommandModel() {
        return this.getModel('_selectedMoveModel', () => {
            return {
                move: undefined,
                source: undefined,
                target: undefined
            };
        });
    }
    getBattleMoveSelectionModel() {
        return this.getModel('_battleMoveSelectionModel', () => {
            return {
                getButtonModels: () => {
                    const battleStateModel = this.getBattleStateModel();
                    const moves = this.getBattleModel().playerUnit().moves;
                    const buttonDimensions = [{x: 25, y: 325}, {x: 250, y: 325}];
                    let buttonModels = [];

                    moves.forEach((move, i) =>{
                        buttonModels.push(ModelClasses.ButtonModel({
                            gameModels: this,
                            text: move.name(),
                            x: buttonDimensions[i].x,
                            y: buttonDimensions[i].y,
                            width: 200,
                            height: 100,
                            onClick: () => {
                                battleStateModel.transitionToTarget(move);
                            }
                        }));
                    });
                    return buttonModels;
                }
            };
        });
    }
    getBattleTargetSelectionModel() {
        return this.getModel('_battleTargetSelectionModel', () => {
            return {
                getButtonModels: () => {
                    const battleStateModel = this.getBattleStateModel();
                    const playerModel = this.getBattleModel().playerUnit();
                    const enemies = this.getBattleModel().enemyUnits();
                    const moveModel = this.getBattleCommandModel().move;
                    const buttonDimensions = [{x: 25, y: 325}, {x: 250, y: 325}, {x: 475, y: 325}];
                    let buttonModels = [];

                    enemies.forEach((enemy, i) => {
                        if (!enemy.isDead()) {
                            buttonModels.push(ModelClasses.ButtonModel({
                                gameModels: this,
                                text: enemy.name(),
                                x: buttonDimensions[i].x,
                                y: buttonDimensions[i].y,
                                width: 200,
                                height: 100,
                                onClick: () => {
                                    battleStateModel.transitionToMessage(moveModel, playerModel, enemy);
                                }
                            }));
                        }
                    });
                    return buttonModels;
                }
            };
        });
    }
    getBattleMessageModel() {
        return this.getModel('_battleMessageModel', () => {
            return {
                message: () => {
                    const selectedMoveModel = this.getBattleCommandModel();
                    return selectedMoveModel.source.name() + " uses " + selectedMoveModel.move.name() +"! " +
                        selectedMoveModel.target.name() + " takes " + selectedMoveModel.move.damage() +" damage!";
                },
                deathMessage: () => {
                    const selectedMoveModel = this.getBattleCommandModel();
                    return selectedMoveModel.target.isDead() ? selectedMoveModel.target.name() + " dies!" : "";
                }
            };
        });
    }
    getBattleMessageButtonModel() {
        return this.getModel('_battleMessageButtonModel', () => {
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Next",
                x: 600,
                y: 450,
                width: 150,
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    const battleStateModel = this.getBattleStateModel();
                    const battleModel = this.getBattleModel();
                    const levelSelectionModel = this.getLevelSelectionModel();
                    battleModel.nextTurn();
                    const turnUnit = battleModel.turnUnit();

                    if (battleModel.isLost()) {
                        stateModel.transitionToLoss();
                    } else if (battleModel.isWon() && battleModel.level() === levelSelectionModel.lastLevel()) {
                        stateModel.transitionToComplete();
                    } else if (battleModel.isWon()) {
                        stateModel.transitionToVictory(battleModel.level());
                    } else if (!battleModel.isPlayerTurn()) {
                        const move = battleModel.turnUnit().chooseMove();
                        battleStateModel.transitionToMessage(move, turnUnit, battleModel.playerUnit());
                    } else {
                        battleStateModel.transitionToCommand();
                    }
                }
            });
        });
    }
    getVictoryBattleAgainButtonModel() {
        return this.getModel('_victoryBattleAgainButtonModel', () => {
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Battle Again",
                x: 100,
                y: 300,
                width: 125,
                height: 100,
                onClick: () => {
                    const stateModel = this.getStateModel();
                    stateModel.transitionToLevelSelection();
                }
            });
        });
    }
    getLossBackToTitleButtonModel() {
        return this.getModel('_lossBackToTitleButtonModel', () => {
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Back to Start",
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
    getCompleteBackToTitleButtonModel() {
        return this.getModel('_completeBackToTitleButtonModel', () => {
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Back to Start",
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