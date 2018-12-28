class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class EventHandlerGroup extends EventHandler {
    handle(event) {
        for (let handler of this.handlers()) {
            handler.handle(event);
        }
    }
    handlers() {
        throw "Error: ViewGroup.views() needs to be overridden.";
    }
}

class GameEvents {
    constructor(gameModels) {
        this.gameModels = gameModels;
        this.clickStateMap = {
            'title': [
                this.getButtonHandler("getTitleStartButtonModel")
            ],
            'battle': [
                this.getClickBattleMessageGroup()
            ],
            'levelSelection': [
                this.getClickLevelSelectionButtons()
            ],
            'victory': [
                this.getButtonHandler("getVictoryBattleAgainButtonModel")
            ],
            'loss': [
                this.getButtonHandler("getLossBackToTitleButtonModel")
            ],
            'complete': [
                this.getButtonHandler("getCompleteBackToTitleButtonModel")
            ]
        };
    }
    getHandlerGroup(key, handlersLambda) {
        if(!this[key]) {
            this[key] = new EventHandlerGroup();
            this[key].handlers = handlersLambda;
        }
        return this[key];
    }
    getClickBattleMessageGroup() {
        const handlersStateMap = {
            'command': [
                this.getButtonHandler('getBattleAttackButtonModel'),
                this.getButtonHandler('getBattleHomingFireButtonModel')]
            ,
            'message' : [this.getButtonHandler('getBattleMessageButtonModel')],
        };
        return this.getHandlerGroup('_clickBattleMessageGroup', () => {
            const battleStateModel = this.gameModels.getBattleStateModel();
            return handlersStateMap[battleStateModel.state()];
        });
    }
    getClickLevelSelectionButtons() {
        return this.getHandler('_clickLevelSelectionButtons', (event) => {
            const levelSelectionModel = this.gameModels.getLevelSelectionModel();
            const buttonModels = levelSelectionModel.getButtonModels();

            for (let buttonModel of buttonModels) {
                const mouseModel = this.gameModels.getMouseModel();
                const mouseX = mouseModel.x;
                const mouseY = mouseModel.y;
                const buttonClicked =
                    (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
                    (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
                if (buttonClicked) {
                    buttonModel.onClick();
                }
            }
        });
    }
    registerHandlers(canvas) {
        canvas.addEventListener("click", (event) => {
            const stateModel = this.gameModels.getStateModel();
            for (let handler of this.clickStateMap[stateModel.state()]) {
                handler.handle(event);
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            this.getMouseMoveMouseModelHandler().handle(event);
        });
    }
    getHandler(key, handleLambda) {
        if(!this[key]) {
            this[key] = new EventHandler();
            this[key].handle = handleLambda;
        }
        return this[key];
    }
    getButtonHandler(key) {
        return this.getHandler('_click' + key.substring(3), (event) => {
            const buttonModel = this.gameModels[key]();
            const mouseModel = this.gameModels.getMouseModel();
            const mouseX = mouseModel.x;
            const mouseY = mouseModel.y;
            const buttonClicked =
                (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
                (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
            if (buttonClicked) {
                buttonModel.onClick();
            }
        });
    }
    getMouseMoveMouseModelHandler() {
        return this.getHandler('_mouseMoveMouseModelHandler', (event) => {
            const mouseModel = this.gameModels.getMouseModel();
            const element = event.target;
            mouseModel.x = event.pageX - element.offsetLeft;
            mouseModel.y = event.pageY - element.offsetTop;
        });
    }
}