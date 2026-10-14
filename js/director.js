import {Animate} from './animate.js';

class Director {

    constructor(stage) {
        this.stage = stage;
        this.scene = {};
        this.currentScene = null;
    }

    addScene(name, scene) {


        if (this.scene[name] != undefined) {
            throw "That scene already exists!";
        }

        //Otherwise add the scene
        this.scene[name] = scene;

        //If it's the first add to the stage
        if (this.currentScene == null) {
            this.currentScene = name;
            this.stage.addChild(scene);
        }
    }

    showScene(nextSceneName) {

        //Grab current scene
        let oldScene = this.scene[this.currentScene];

        //Remove current scene
        this.stage.removeChild(oldScene)

        //New scene
        let newScene = this.scene[nextSceneName];

        //Add new scene
        this.stage.addChild(newScene);

        //Update current scene
        this.currentScene = nextSceneName;
    }

} //End Director

export { Director };