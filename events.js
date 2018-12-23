class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class GameEvents {
    constructor(gameModels) {
        this.gameModels = gameModels;
        this.clickStateMap = {
            'title': [
                this.getClickTitleStartButtonHandler()
            ],
            'battle': [
                this.getClickBattleMovesButtonHandler()
            ]
        };
        this.mouseMoveStateMap = {
            'title': [
                this.getMouseMoveTitleStartButtonHandler()
            ],
            'battle': [
                this.getMouseMoveBattleMovesButtonHandler()
            ]
        }
    }
    registerHandlers(canvas) {
        canvas.addEventListener("click", (event) => {
            const stateModel = this.gameModels.getStateModel();
            for (let handler of this.clickStateMap[stateModel.state()]) {
                handler.handle(event);
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            const stateModel = this.gameModels.getStateModel();
            for (let handler of this.mouseMoveStateMap[stateModel.state()]) {
                handler.handle(event);
            }
        });
    }
    getHandler(key, handleLambda) {
        if(!this[key]) {
            this[key] = new EventHandler();
            this[key].handle = handleLambda;
        }
        return this[key];
    }
    getClickTitleStartButtonHandler() {
        return this.getHandler('_clickTitleStartButtonHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const buttonModel = this.gameModels.getTitleStartButtonModel();
            const buttonClicked =
                (buttonModel.x() <= mouseX && mouseX <= buttonModel.x() + buttonModel.width()) &&
                (buttonModel.y() <= mouseY && mouseY <= buttonModel.y() + buttonModel.height());
            if (buttonClicked) {
                const stateModel = this.gameModels.getStateModel();
                stateModel.transitionToBattle();
            }
        });
    }
    getClickBattleMovesButtonHandler() {
        return this.getHandler('_clickBattleMovesButtonHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const buttonModel = this.gameModels.getBattleMovesButtonModel();
            const buttonClicked =
                (buttonModel.x() <= mouseX && mouseX <= buttonModel.x() + buttonModel.width()) &&
                (buttonModel.y() <= mouseY && mouseY <= buttonModel.y() + buttonModel.height());
            if (buttonClicked) {
                const enemyModel = this.gameModels.getEnemyModel();
                enemyModel.takeDamage(10);
            }
        });
    }
    getMouseMoveTitleStartButtonHandler() {
        return this.getHandler('_mouseMoveTitleStartButtonHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const buttonModel = this.gameModels.getTitleStartButtonModel();
            buttonModel.highlighted =
                (buttonModel.x() <= mouseX && mouseX <= buttonModel.x() + buttonModel.width()) &&
                (buttonModel.y() <= mouseY && mouseY <= buttonModel.y() + buttonModel.height());
        });
    }
    getMouseMoveBattleMovesButtonHandler() {
        return this.getHandler('_mouseMoveBattleMovesButtonHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const buttonModel = this.gameModels.getBattleMovesButtonModel();
            buttonModel.highlighted =
                (buttonModel.x() <= mouseX && mouseX <= buttonModel.x() + buttonModel.width()) &&
                (buttonModel.y() <= mouseY && mouseY <= buttonModel.y() + buttonModel.height());
        });
    }
}