class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class GameEvents {
    constructor(gameModel) {
        this.gameModel = gameModel;
    }
    registerHandlers(canvas) {
        for (let handler of [this.getMovesButtonMouseMoveHandler()]) {
            canvas.addEventListener("mousemove", handler.handle);
        }
        for (let handler of [this.getMovesButtonClickHandler()]) {
            canvas.addEventListener("click", handler.handle);
        }
    }
    getHandler(key, handleLambda) {
        if(!this[key]) {
            this[key] = new EventHandler();
            this[key].handle = handleLambda;
        }
        return this[key];
    }
    getMovesButtonClickHandler() {
        return this.getHandler('_movesButtonClickHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const movesButtonModel = this.gameModel.getMovesButtonModel();
            const movesButtonClicked =
                (movesButtonModel.x() <= mouseX && mouseX <= movesButtonModel.x() + movesButtonModel.width()) &&
                (movesButtonModel.y() <= mouseY && mouseY <= movesButtonModel.y() + movesButtonModel.height());
            if (movesButtonClicked) {
                const enemyModel = this.gameModel.getEnemyModel();
                enemyModel.takeDamage(10);
            }
        });
    }
    getMovesButtonMouseMoveHandler() {
        return this.getHandler('_movesButtonMouseMoveHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const movesButtonModel = this.gameModel.getMovesButtonModel();
            movesButtonModel.highlighted =
                (movesButtonModel.x() <= mouseX && mouseX <= movesButtonModel.x() + movesButtonModel.width()) &&
                (movesButtonModel.y() <= mouseY && mouseY <= movesButtonModel.y() + movesButtonModel.height());
        });
    }
}