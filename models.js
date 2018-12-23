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
    getMovesButtonModel() {
        return this.getModel('_moveButtonModel', () => {
            return {
                x: () => 50,
                y: () => 350,
                width: () => 700,
                height: () => 200,
                highlighted: false
            };
        });
    }
}