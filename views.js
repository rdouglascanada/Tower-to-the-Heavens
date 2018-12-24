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
            text: args.text,
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
            'battle': [
                this.getGameBackground(), this.getBattleAnimationArea(),
                this.getBattlePlayerAvatar(), this.getBattlePlayerLabel(),
                this.getBattleEnemyAvatar(), this.getBattleEnemyLabel(),
                this.getBattleStatusArea(), this.getBattlePlayerHPLabel(),
                this.getBattlePlayerPWRLabel(), this.getBattleEnemyHPLabel(),
                this.getBattleMovesArea(), this.getBattleAttackButton(),
                this.getBattleTakeDamageButton()
            ],
            'victory': [
                this.getGameBackground(), this.getVictoryBackground(),
                this.getVictoryLabelText(), this.getVictoryBattleAgainButton()
            ],
            'loss': [
                this.getGameBackground(), this.getLossBackground(),
                this.getLossLabelText(), this.getLossBackToTitleButton()
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
                text: "Start",
                font: 'bold 30px Arial'
            });
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
    getBattleEnemyAvatar() {
        return this.getView('_battleEnemyAvatar', (canvasContext) => {
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'red',
                x: 600, y: 50, width: 100, height: 150
            });
        });
    }
    getBattleEnemyLabel() {
        return this.getView('_battleEnemyLabel', (canvasContext) => {
            const enemyModel = this.gameModels.getEnemyModel();
            ViewUtils.fillText({
                canvasContext,
                text: enemyModel.name(),
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'middle',
                x: 600, y: 30, width: 100, height: 10,
                horizontalAlign: 'middle'
            });
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
    getBattleEnemyHPLabel() {
        return this.getView('_battleEnemyHPLabel', (canvasContext) => {
            const enemyModel = this.gameModels.getEnemyModel();
            const enemyHPText = "HP: " + enemyModel.hp + " / " + enemyModel.maxHP();
            ViewUtils.fillText({
                canvasContext,
                text: enemyHPText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 660, y: 225
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
    getBattleAttackButton() {
        return this.getView('_battleAttackButton', (canvasContext) => {
            const buttonModel = this.gameModels.getBattleAttackButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                text: "Attack",
                font: 'bold 30px Arial'
            });
        });
    }
    getBattleTakeDamageButton() {
        return this.getView('_battleTakeDamageButton', (canvasContext) => {
            const buttonModel = this.gameModels.getBattleTakeDamageButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                text: "Take Damage",
                font: 'bold 22px Arial'
            });
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
    getVictoryBattleAgainButton() {
        return this.getView('_victoryBattleAgainButton', (canvasContext) => {
            const buttonModel = this.gameModels.getVictoryBattleAgainButtonModel();
            ViewUtils.fillButton({
                canvasContext,
                buttonModel,
                text: "Fight Again",
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
                text: "Back to Start",
                font: 'bold 18px Arial'
            });
        });
    }
}
