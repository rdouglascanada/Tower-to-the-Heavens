class View {
    draw(canvasContext) {
        throw "Error: View.draw() needs to be overridden."
    }
}

class ViewGroup extends View {
    draw(canvasContext) {
        for (let view of this.views()) {
            view.draw(canvasContext);
        }
    }
    views() {
        throw "Error: ViewGroup.views() needs to be overridden."
    }
}

class ViewUtils {
    static fillRectangle(args) {
        const canvasContext = args.canvasContext;
        canvasContext.fillStyle = args.colour;
        canvasContext.fillRect(args.x, args.y, args.width, args.height);
    }
    static fillText(args) {
        const canvasContext = args.canvasContext;
        canvasContext.fillStyle = args.colour;
        canvasContext.font = args.font;
        canvasContext.textBaseline = args.textBaseline;
        if (args.horizontalAlign === 'middle') {
            const textWidth = canvasContext.measureText(args.text).width;
            args.x = args.x + (args.width - textWidth) / 2;
        }
        if (args.textBaseline === 'middle') {
            args.y += args.height / 2;
        }
        canvasContext.fillText(args.text, args.x, args.y);
    }
    static fillButton(args) {
        const canvasContext = args.canvasContext;
        const buttonModel = args.buttonModel;
        const colour = buttonModel.highlighted() ? 'magenta' : 'gray';
        ViewUtils.fillRectangle({
            canvasContext,
            colour,
            x: buttonModel.x,
            y: buttonModel.y,
            width: buttonModel.width,
            height: buttonModel.height
        });
        ViewUtils.fillText({
            canvasContext,
            text: buttonModel.text,
            font: args.font,
            x: buttonModel.x,
            y: buttonModel.y,
            width: buttonModel.width,
            height: buttonModel.height,
            colour: 'black',
            horizontalAlign: 'middle',
            textBaseline: 'middle',
        });
    }
}

class GameViews extends ViewGroup {
    constructor(gameModels) {
        super();
        this.gameModels = gameModels;
        this.stateMap = {
            'title': [
                this.getGameBackground(), this.getTitleBackground(),
                this.getTitleLabelText(), this.getTitleStartButton()
            ],
            'levelSelection': [
                this.getLevelSelectionBackground(), this.getLevelSelectionLabelText(),
                this.getLevelSelectionButtons()
            ],
            'battle': [
                this.getGameBackground(), this.getBattleAnimationArea(),
                this.getBattlePlayerAvatar(), this.getBattlePlayerLabel(),
                this.getBattleStatusArea(), this.getBattleEnemyAvatars(),
                this.getBattlePlayerHPLabel(), this.getBattlePlayerPWRLabel(),
                this.getBattleMovesArea(), this.getBattleMessageGroup()
            ],
            'victory': [
                this.getGameBackground(), this.getVictoryBackground(),
                this.getVictoryLabelText(), this.getVictoryUnlockLabelText(),
                this.getVictoryBattleAgainButton()
            ],
            'loss': [
                this.getGameBackground(), this.getLossBackground(),
                this.getLossLabelText(), this.getLossBackToTitleButton()
            ],
            'complete': [
                this.getGameBackground(), this.getCompleteBackground(),
                this.getCompleteLabelText(), this.getCompleteBackToTitleButton()
            ]
        }
    }
    views() {
        const stateModel = this.gameModels.getStateModel();
        return this.stateMap[stateModel.state()];
    }
    getView(key, drawLambda) {
        if(!this[key]) {
            this[key] = new View();
            this[key].draw = drawLambda;
        }
        return this[key];
    }
    getViewGroup(key, viewsLambda) {
        if(!this[key]) {
            this[key] = new ViewGroup();
            this[key].views = viewsLambda;
        }
        return this[key];
    }
    getGameBackground() {
        return this.getView('_gameBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: canvasModel.backgroundColour(),
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getTitleBackground() {
        return this.getView('_titleBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getTitleLabelText() {
        return this.getView('_titleLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'Tower to the Heavens',
                colour: 'black',
                font: 'bold 72px Arial',
                textBaseline: 'middle',
                x: 0, y: 100,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getTitleStartButton() {
        return this.getView('_titleStartButton', (canvasContext) => {
            const buttonModel = this.gameModels.getTitleStartButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                font: 'bold 30px Arial'
            });
        });
    }
    getLevelSelectionBackground() {
        return this.getView('_levelSelectionBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getLevelSelectionLabelText() {
        return this.getView('_levelSelectionLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'Level Select',
                colour: 'black',
                font: 'bold 60px Arial',
                textBaseline: 'middle',
                x: 0, y: 50,
                width: canvasModel.width() / 2 - 20, height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getLevelSelectionButtons() {
        return this.getView('_levelSelectionButtons', (canvasContext) => {
            const levelSelectionModels = this.gameModels.getLevelSelectionModel();
            const buttonModels = levelSelectionModels.getButtonModels();
            for (let buttonModel of buttonModels) {
                ViewUtils.fillButton({
                    canvasContext,
                    buttonModel,
                    font: 'bold 26px Arial'
                });
            }
        });
    }
    getBattleAnimationArea() {
        return this.getView('_battleAnimationArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'cyan',
                x: 0, y: 0, width: canvasModel.width(), height: 200
            });
        });
    }
    getBattlePlayerAvatar() {
        return this.getView('_battlePlayerAvatar', (canvasContext) => {
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'blue',
                x: 100, y: 50, width: 100, height: 150
            });
        });
    }
    getBattlePlayerLabel() {
        return this.getView('_battlePlayerLabel', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            ViewUtils.fillText({
                canvasContext,
                text: playerModel.name(),
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'middle',
                x: 100, y: 30,
                width: 100, height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getBattleEnemyAvatars() {
        return this.getView('_battleEnemyAvatars', (canvasContext) => {
            const battleModels = this.gameModels.getBattleModel();
            for (let avatar of battleModels.getEnemyAvatarModels()) {
                ViewUtils.fillText({
                    canvasContext,
                    text: avatar.name,
                    colour: 'black',
                    font: '20px Arial',
                    textBaseline: 'middle',
                    x: avatar.x, y: avatar.y - 20,
                    width: avatar.width, height: 10,
                    horizontalAlign: 'middle'
                });
                ViewUtils.fillRectangle({
                    canvasContext,
                    colour: 'red',
                    x: avatar.x, y: avatar.y,
                    width: avatar.width, height: avatar.height
                });
                ViewUtils.fillText({
                    canvasContext,
                    text: avatar.hp + " / " + avatar.maxHP,
                    colour: 'black',
                    font: '20px Arial',
                    textBaseline: 'alphabetic',
                    x: avatar.x, y: avatar.y + 175,
                    width: avatar.width, height: 10,
                    horizontalAlign: 'middle'
                });
            }
        });
    }
    getBattleStatusArea() {
        return this.getView('_battleStatusArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 200, width: canvasModel.width(), height: 70
            });
        });
    }
    getBattlePlayerHPLabel() {
        return this.getView('_battlePlayerHPLabel', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            const playerHPText = "HP: " + playerModel.hp + " / " + playerModel.maxHP();
            ViewUtils.fillText({
                canvasContext,
                text: playerHPText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 10, y: 225
            });
        });
    }
    getBattlePlayerPWRLabel() {
        return this.getView('_battlePlayerPWRLabel', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            const playerPWRText = "PWR: " + playerModel.pwr;
            ViewUtils.fillText({
                canvasContext,
                text: playerPWRText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 10, y: 255
            });
        });
    }
    getBattleMovesArea() {
        return this.getView('_battleMovesArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'darkGray',
                x: 0, y: 270, width: canvasModel.width(), height: 330
            });
        });
    }
    getBattleMessageGroup() {
        const viewsStateMap = {
            'command': [this.getBattleMoveSelectionButtons()],
            'target': [this.getBattleTargetSelectionButtons()],
            'message' : [
                this.getBattleMessageButton(), this.getBattleMessageLabelText(), this.getBattleMessageDeathLabelText()
            ]
        };
        return this.getViewGroup('_battleMessageGroup', () => {
            const battleStateModel = this.gameModels.getBattleStateModel();
            return viewsStateMap[battleStateModel.state()];
        });
    }
    getBattleMessageLabelText() {
        return this.getView('_battleMessageLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            const battleMessageModel = this.gameModels.getBattleMessageModel();
            ViewUtils.fillText({
                canvasContext,
                text: battleMessageModel.message(),
                colour: 'black',
                font: 'bold 30px Arial',
                textBaseline: 'middle',
                x: 0, y: 300,
                width: canvasModel.width(), height: 50,
                horizontalAlign: 'middle'
            });
        });
    }
    getBattleMessageDeathLabelText() {
        return this.getView('_battleMessageDeathLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            const battleMessageModel = this.gameModels.getBattleMessageModel();
            ViewUtils.fillText({
                canvasContext,
                text: battleMessageModel.deathMessage(),
                colour: 'black',
                font: 'bold 30px Arial',
                textBaseline: 'middle',
                x: 0, y: 350,
                width: canvasModel.width(), height: 50,
                horizontalAlign: 'middle'
            });
        });
    }
    getBattleMessageButton() {
        return this.getView('_battleMessageButton', (canvasContext) => {
            const buttonModel = this.gameModels.getBattleMessageButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                font: 'bold 30px Arial'
            });
        });
    }
    getBattleMoveSelectionButtons() {
        return this.getView('_battleMoveSelectionButtons', (canvasContext) => {
            const moveSelectionModel = this.gameModels.getBattleMoveSelectionModel();
            const buttonModels = moveSelectionModel.getButtonModels();
            for (let buttonModel of buttonModels) {
                ViewUtils.fillButton({
                    canvasContext,
                    buttonModel,
                    font: 'bold 26px Arial'
                });
            }
        });
    }
    getBattleTargetSelectionButtons() {
        return this.getView('_battleTargetSelectionButtons', (canvasContext) => {
            const targetSelectionModel = this.gameModels.getBattleTargetSelectionModel();
            const buttonModels = targetSelectionModel.getButtonModels();
            for (let buttonModel of buttonModels) {
                ViewUtils.fillButton({
                    canvasContext,
                    buttonModel,
                    font: 'bold 26px Arial'
                });
            }
        });
    }
    getVictoryBackground() {
        return this.getView('_victoryBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getVictoryLabelText() {
        return this.getView('_victoryLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'You Win!',
                colour: 'black',
                font: 'bold 60px Arial',
                textBaseline: 'middle',
                x: 0, y: 100,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getVictoryUnlockLabelText() {
        return this.getView('_victoryUnlockLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            const progressModel = this.gameModels.getProgressModel();
            ViewUtils.fillText({
                canvasContext,
                text: progressModel.unlockMessage(),
                colour: 'black',
                font: 'bold 40px Arial',
                textBaseline: 'middle',
                x: 0, y: 200,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getVictoryBattleAgainButton() {
        return this.getView('_victoryBattleAgainButton', (canvasContext) => {
            const buttonModel = this.gameModels.getVictoryBattleAgainButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                font: 'bold 20px Arial'
            });
        });
    }
    getLossBackground() {
        return this.getView('_lossBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getLossLabelText() {
        return this.getView('_lossLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'You Lose!',
                colour: 'black',
                font: 'bold 60px Arial',
                textBaseline: 'middle',
                x: 0, y: 100,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getLossBackToTitleButton() {
        return this.getView('_lossBackToTitleButton', (canvasContext) => {
            const buttonModel = this.gameModels.getLossBackToTitleButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                font: 'bold 18px Arial'
            });
        });
    }
    getCompleteBackground() {
        return this.getView('_completeBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getCompleteLabelText() {
        return this.getView('_completeLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'You have completed the game!',
                colour: 'black',
                font: 'bold 40px Arial',
                textBaseline: 'middle',
                x: 0, y: 100,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getCompleteBackToTitleButton() {
        return this.getView('_completeBackToTitleButton', (canvasContext) => {
            const buttonModel = this.gameModels.getCompleteBackToTitleButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                font: 'bold 18px Arial'
            });
        });
    }
}
