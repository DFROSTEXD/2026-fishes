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

    async showScene(nextSceneName, params) {

        if (params == undefined) {
            params = {
                transition : this.cut
            }
        }
        //Make sure we're using THIS director
        params.transition = params.transition.bind(this);

        //Make the transition happen
        await params.transition(this.currentScene, nextSceneName, params);

         //Update current scene
        this.currentScene = nextSceneName;

    }

    //Transition functions
    //Simple cut
    cut(oldSceneName, newSceneName, params) {
        //Grab current scene
        let oldScene = this.scene[oldSceneName];

        //Remove current scene
        this.stage.removeChild(oldScene);

        //New scene
        let newScene = this.scene[newSceneName];

        //Add new scene
        this.stage.addChild(newScene);
    }

    //Simple fade
    async fade(oldSceneName, newSceneName, params) {

        let oldScene = this.scene[oldSceneName];
        let newScene = this.scene[newSceneName];

        //Step 1: Fade the current scene out
        await Animate.to(oldScene, {
            duration: 1000,
            alpha:0
        });
        //Step 2: Remove the old scene
        this.stage.removeChild(oldScene);

        //Step 3: Make the new scene transparent
        newScene.alpha = 0;

        //Step 4: Put the new scene on stage
        this.stage.addChild(newScene);
        //Step 5: Fade in the new scene
        await Animate.to(newScene, {
            duration: 1000,
            alpha:1
        });
        //Step 6: Fade the old scene
        oldScene.alpha = 1;

    }

} //End Director

export { Director };