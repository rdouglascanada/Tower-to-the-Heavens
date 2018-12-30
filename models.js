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
            enemy: () => args.enemy,
            progressModel: () => args.progressModel,
            isUnlocked() {
                return this.index() <= this.progressModel().levelIndex();
            }
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
                    const enemy = level.enemy();
                    enemy.hp = enemy.maxHP();
                    const enemyModel = gameModels.getEnemyModel();
                    enemyModel.enemy = enemy;
                    enemyModel.level = level;
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
                    this.getMoveAttackModel(),
                    this.getMoveHomingFireModel()
                ]
            });
        });
    }
    getEnemyModel() {
        return this.getModel('_enemyModel', () => {
            return {
                enemy: null,
                level: null
            };
        });
    }
    getLevelSelectionModel() {
        return this.getModel('_levelSelectionModel', () => {
            const gameModels = this;
            const progressModel = this.getProgressModel();
            return {
                levels: [
                    ModelClasses.LevelModel({
                        name: "Level 1",
                        index: 1,
                        enemy: ModelClasses.BattleUnit({
                            name: "Minion",
                            hp: 40,
                            pwr: 0,
                            maxHP: 40,
                            moves: [
                                this.getMoveHomingFireModel()
                            ]
                        }),
                        progressModel
                    }),
                    ModelClasses.LevelModel({
                        name: "Level 2",
                        index: 2,
                        enemy: ModelClasses.BattleUnit({
                            name: "Nemesis",
                            hp: 100,
                            pwr: 0,
                            maxHP: 100,
                            moves: [
                                this.getMoveAttackModel()
                            ]
                        }),
                        progressModel
                    })
                ],
                lastLevel() {
                    return this.levels[this.levels.length - 1];
                },
                getButtonModels() {
                    let buttonModels = [];
                    if (this.levels) {
                        if (this.levels[0] && this.levels[0].isUnlocked()) {
                            buttonModels.push(ModelClasses.ButtonModel({
                                gameModels,
                                text: "Level 1",
                                x: 20,
                                y: 120,
                                width: 125,
                                height: 100,
                                onClick: () => {
                                    const stateModel = gameModels.getStateModel();
                                    const levelModel = gameModels.getLevelSelectionModel().levels[0];
                                    if (levelModel.isUnlocked()) {
                                        stateModel.transitionToBattle(levelModel);
                                    }
                                }
                            }));
                        }
                        if (this.levels[1] && this.levels[1].isUnlocked()) {
                            buttonModels.push(ModelClasses.ButtonModel({
                                gameModels,
                                text: "Level 2",
                                x: 165,
                                y: 120,
                                width: 125,
                                height: 100,
                                onClick: () => {
                                    const stateModel = gameModels.getStateModel();
                                    const levelModel = gameModels.getLevelSelectionModel().levels[1];
                                    if (levelModel.isUnlocked()) {
                                        stateModel.transitionToBattle(levelModel);
                                    }
                                }
                            }));
                        }
                    }
                    return buttonModels;
                }
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
    getBattleMoveSelectionModel() {
        return this.getModel('_battleMoveSelectionModel', () => {
            return {
                getButtonModels: () => {
                    let buttonModels = [];
                    const playerModel = this.getPlayerModel();
                    const moves = playerModel.moves;

                    if (moves) {
                        if (moves[0]) {
                            buttonModels.push(ModelClasses.ButtonModel({
                                gameModels: this,
                                text: "Attack",
                                x: 50,
                                y: 325,
                                width: 150,
                                height: 100,
                                onClick() {
                                    const battleStateModel = this.gameModels.getBattleStateModel();
                                    const moveModel = this.gameModels.getMoveAttackModel();
                                    const playerModel = this.gameModels.getPlayerModel();
                                    const enemy = this.gameModels.getEnemyModel().enemy;
                                    battleStateModel.transitionToMessage(moveModel, playerModel, enemy);
                                }
                            }));
                        }
                        if (moves[1]) {
                            buttonModels.push(ModelClasses.ButtonModel({
                                gameModels: this,
                                text: "Homing Fire",
                                x: 250,
                                y: 325,
                                width: 200,
                                height: 100,
                                onClick() {
                                    const battleStateModel = this.gameModels.getBattleStateModel();
                                    const moveModel = this.gameModels.getMoveHomingFireModel();
                                    const playerModel = this.gameModels.getPlayerModel();
                                    const enemy = this.gameModels.getEnemyModel().enemy;
                                    battleStateModel.transitionToMessage(moveModel, playerModel, enemy);
                                }
                            }));
                        }
                    }
                    return buttonModels;
                }
            };
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
            return ModelClasses.ButtonModel({
                gameModels: this,
                text: "Next",
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
                    const levelSelectionModel = this.gameModels.getLevelSelectionModel();
                    const enemy = enemyModel.enemy;
                    const level = enemyModel.level;

                    if (playerModel.isDead()) {
                        stateModel.transitionToLoss();
                    } else if (enemy.isDead() && level === levelSelectionModel.lastLevel()) {
                        stateModel.transitionToComplete();
                    } else if (enemy.isDead()) {
                        stateModel.transitionToVictory(level);
                    } else if (selectedMoveModel.source === playerModel) {
                        const move = enemy.chooseMove();
                        battleStateModel.transitionToMessage(move, enemy, playerModel);
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