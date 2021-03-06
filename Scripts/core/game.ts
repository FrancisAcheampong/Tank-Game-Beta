/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function(){

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage:createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;

  assetManifest = [
    {id: "clickMeButton"                          , src:"./Assets/images/buttons/clickMeButton.png"},
    {id: "startButton"                            , src:"./Assets/images/buttons/start_button_yellow.png"},
    {id: "nextButton"                             , src:"./Assets/images/buttons/nextButton.png"},
    {id: "backButton"                             , src:"./Assets/images/buttons/replay.png"},
    {id: "pause_button"                           , src:"./Assets/images/buttons/pause.png"},
    {id: "bullet"                                 , src:"./Assets/images/bullets/bullet_small.png"},
    {id: "tank1"                                  , src:"./Assets/images/tanks/tank_green_1.png"},
    {id: "tank2"                                  , src:"./Assets/images/tanks/tank_blue_1.png"},
    {id: "terrain1"                               , src:"./Assets/images/terrains/sand_pitchlAltered.jpg"},
    {id: "terrain2"                               , src:"./Assets/images/terrains/macrograss.png"},
    {id: "terrain3"                               , src:"./Assets/images/terrains/gray_extended.png"},
    {id: "powerupOil"                             , src:"./Assets/images/powerups/oil_barrel_small.png"},
    {id: "powerupLife"                            , src:"./Assets/images/powerups/life_power_up.png"},
    {id: "powerupLandMine"                        , src:"./Assets/images/powerups/bomb_power_up.png"},
    {id: "popUpOil"                               , src:"./Assets/images/popups/pop_up_oil_barrel_small.png"},
    {id: "popUpLife"                              , src:"./Assets/images/popups/pop_up_life.png"},
    {id: "popUpLandMine"                          , src:"./Assets/images/popups/pop_up_land_mine.png"},
    {id: "popUpSpeed"                             , src:"./Assets/images/popups/pop_up_speed.png"},
    {id: "barrier"                                , src:"./Assets/images/barriers/brick_big_1.png"},
    {id: "barrier_undestructible"                 , src:"./Assets/images/barriers/brick_big_undestructible.png"},
    {id: "rock_barrier"                           , src:"./Assets/images/barriers/rock_barrier.png"},
    {id: "rock_barrier_undestructible"            , src:"./Assets/images/barriers/rock_barrier_undestructible.png"},
    {id: "metal_barrier"                          , src:"./Assets/images/barriers/metal_barrier.png"},
    {id: "metal_barrier_undestructible"           , src:"./Assets/images/barriers/metal_barrier_undestructible.png"},
    {id: "battle"                                 , src:"./Assets/audio/8_bits_elethronic.ogg"},
    {id: "barrier_shot"                           , src:"./Assets/audio/barrier_shot.ogg"},
    {id: "tank_engine"                            , src:"./Assets/audio/tank_engine_short.ogg"},
    {id: "powerup_snd"                            , src:"./Assets/audio/powerup.ogg"},
    {id: "new_powerup_snd"                        , src:"./Assets/audio/new_powerup.ogg"},
    {id: "pop_up_snd"                              , src:"./Assets/audio/pop_up.ogg"},
    {id: "new_pop_up_snd"                          , src:"./Assets/audio/new_pop_up.ogg"},
    {id: "round_end_snd"                          , src:"./Assets/audio/round_end.ogg"},
    {id: "tank_fire"                              , src:"./Assets/audio/tank_fire_1.ogg"}
  ];

  // preloads assets
  function Init():void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start():void {
    console.log("Starting Application...")

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    
    objects.Game.stage = stage;
    objects.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;
 
    // keyboardManager = new managers.Keyboard();
    // objects.Game.keyboardManager = keyboardManager;
    Main();
  }

  function Update():void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if(currentState!= objects.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    
    stage.update(); // redraws the stage
    
  }

  function Main():void {
    stage.removeAllChildren();
    
    switch(objects.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene(assetManager);
      break;
      case config.Scene.PLAY1:
        currentScene = new scenes.PlayScene1(assetManager);
      break;
      case config.Scene.PLAY2:
        currentScene = new scenes.PlayScene2(assetManager);
      break;
      case config.Scene.PLAY3:
        currentScene = new scenes.PlayScene3(assetManager);
      break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene(assetManager);
      break;
      case config.Scene.ROUND1:
        currentScene = new scenes.RoundInformScene(assetManager,1);
      break;
      case config.Scene.ROUND2:
        currentScene = new scenes.RoundInformScene(assetManager,2);
      break;
      case config.Scene.ROUND3:
        currentScene = new scenes.RoundInformScene(assetManager,3);
      break;
    }

    currentState = objects.Game.currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
