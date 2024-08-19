class Entity extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }
}
class Base extends Entity{
  constructor(scene, x, y, key){
    super(scene, x, y, key, 'Base');
    this.body.debugBodyColor = 0xff00ff;
    this.body.allowGravity = false;
    //zones
    this.zones = this.scene.add.group();
    //this.tint = 0x000000;
  }
  setFrameCustom(frameName){
    this.setFrame(frameName);
    this.body.setSize(this.frame.width, this.frame.height);
    var z = (this.frame.customData.zindex !== 'undefined')? this.frame.customData.zindex: 0;
    this.setDepth( z );//set z-index?
    var piezas = this.frame.customData.piezas;
    for(var pieza in piezas ){
      //console.log(pieza, piezas[pieza].hx, piezas[pieza].hy);
      this.zones.add( new Hitbox(this.scene, (this.x+piezas[pieza].hx), (this.y+piezas[pieza].hy), 50, 50).setData("name", pieza) );
    }
    //this.setInteractive();
  }
  checkOverlap(pieza){
    var zones = this.zones.getChildren();
    var boundsB =pieza.zone.getBounds();
    for(var i=0; i<zones.length; i++){
      //validate zone with pieza first
      if(!pieza.frame.name.includes(zones[i].getData("name"))){ continue; }
      //validate zones intersect
      var boundsA = zones[i].getBounds();
      var res = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
      //console.log("Pname:",pieza.frame.name,"Zname:",zones[i].getData("name"),"x1:",pieza.x,"y1:",pieza.y,"x2:",zones[i].x,"y2:",zones[i].y);
      if(res){
        pieza.x = boundsA.x + (boundsA.width*0.5);
        pieza.y = boundsA.y + (boundsA.height*0.5);
        pieza.draggable = false;
        pieza.zone.update(pieza.x, pieza.y);
        pieza.paint(0x04D868);
        _logic.add_correct();
        this.scene.player.set( "score", this.scene.player.get("score")+1 );
        this.scene.player.validate();
      }else{
        pieza.body.moves = true;
        _logic.add_movimiento();
        pieza.paint(0xFA1509);
      }//END IF
    }//END FOR
  }//END checkOverlap()
  //DELETE FUNCTION TO PRODUCTION
  generateZones(){
    var str_cadena =" piezas: { ";
    var piezas = this.scene.piezas.getChildren();
    var bx = this.x;
    var by = this.y;
    var zx = 0;
    var zy = 0;
    var hx = 0;
    var hy = 0;
    for(var i=0; i<piezas.length; i++){
      zx = piezas[i].zone.x;
      zy = piezas[i].zone.y;
      hx = zx-bx;
      hy = zy-by;
      //console.log("pieza:",piezas[i].frame.name,"bx:",bx,"by:",by,"zx:",zx,"zy:",zy,"hx:",hx,"hy:",hy);
      str_cadena+= "\""+piezas[i].frame.name+"\" :{\"hx\":"+(Math.round(hx * 10) / 10)+", \"hy\":"+(Math.round(hy * 10) / 10)+"},";
      this.zones.add( new Hitbox(this.scene, zx, zy, 10, 10).setData("name", piezas[i].frame.name).test() );
    }
    console.log(str_cadena+" } ");
  }
  update(args){
    //console.log("baseU:", args);
  }//END update()
}//END Base
class Basura extends Entity{
  constructor(scene, x, y, key){
    super(scene, x, y, key, 'Basura');
    this.draggable = false;
    this.body.debugBodyColor = 0x00ffff;
    this.body.setCollideWorldBounds(true);
    this.body.setVelocity(100, 200);
    this.body.setBounce(1, 1);
  }
  setFrameCustom(frameName){
    this.setFrame(frameName);
    this.body.setSize(this.frame.width, this.frame.height);
    var z = (this.frame.customData.zindex !== 'undefined')? this.frame.customData.zindex: 0;
    this.setDepth( z );
  }
  update(){

  }
}//END Basura
class Pieza extends Entity{
  constructor(scene, x, y, key){
    super(scene, x, y, key, 'Pieza');
    this.draggable = true;
    this.body.debugBodyColor = 0xff0000;
    this.setInteractive({ pixelPerfect: true, draggable: true });
    this.body.setCollideWorldBounds(true);
    this.body.setVelocity(0, 0);
    //this.body.setBounce(1, 1);
    //zone
    this.zone = new Hitbox(this.scene, this.x, this.y, 25, 25);
  }
  setFrameCustom(frameName){
    this.setFrame(frameName);
    this.body.setSize(this.frame.width, this.frame.height);
    var z = (this.frame.customData.zindex !== 'undefined')? this.frame.customData.zindex: 0;
    this.setDepth( z );
  }
  paint( color ){
    var that = this;
    this.tint =color;
    this.scene.time.addEvent({
      delay: 250,
      callback: function(){
        that.clearTint();
      },
      callbackScope: this,
      loop: false
    });
  }
  update(args){
  }
}
class Hitbox extends Phaser.GameObjects.Rectangle{
  constructor(scene, x, y , width, height){
    super(scene, x, y, width, height, 0xffffff, 1);
    this.scene = scene;
    this.scene.physics.world.enableBody(this, 0);
    this.body.debugBodyColor = 0x0000ff;
    this.body.allowGravity = false;
    this.setData("type", "hitbox");
    //this.body.allowGravity = false;
    this.enable = false;
    this.hx = 0;
    this.hy = 0;
  }
  setHitboxCenter(x, y){
    this.hx = x;
    this.hy = y;
    this.body.debugBodyColor = 0x00ffff;
    this.update(this.x, this.y);
  }
  test(){
    this.body.debugBodyColor = 0xff00ff;
    return this;
  }
  update(x, y){
    this.x = (x+this.hx);
    this.y = (y+this.hy);
    //dibujar cuadrado
    var graphics = this.scene.add.graphics();
    graphics.fillRectShape(this);
    graphics.clear();
  }
}//END class Hitbox
class Player extends Phaser.Data.DataManager{
  constructor(parent, eventEmitter) {
    super(parent, eventEmitter);
    this.set("dificulty", 1);
    this.set("vidas", 3);
    this.set("score", 0);
    this.set("click", false);
    this.set("endGame", false);
    this.set("timeGame", 0);
    this.set("log", []);
    this.set("pause", true);
  }
  validate(){
    var piezas = this.parent.scene.scene.piezas.getChildren();
    var end = true;
    for( var i=0; i<piezas.length; i++ ){
      if(piezas[i].draggable) end = false;
    }
    if(end) this.endGame();
  }
  endGame(){
    var basuras = this.parent.scene.scene.basuras.getChildren();
    while(basuras.length>0){
      basuras[0].destroy();
    }
    this.parent.scene.scene.timedEven.paused=true;
    this.parent.scene.scene.time.addEvent({
      delay: (3000),
      callback: function(){
        this.parent.scene.stop("GameDragg");
        this.parent.scene.start("EndGame");
        _logic.end_game();
      },
      callbackScope: this,
      loop: false
    });
  }
  timeFormat( time ){
    var cro = time;
    function addZ(n) {
      return (n<10? '0':'') + n;
    }
    var ms = cro % 1000;
    var s = (cro - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var _finalTime = addZ(hrs) + ':' + addZ( mins ) + ':' + addZ( secs );//+ '.' + addZ( parseInt(ms/10) );
    return _finalTime;
  }
}
class GameDragg extends Phaser.Scene{
  constructor(){
    super({key:"GameDragg"});
  }
  preload(){
  }//END preload()
  create(){
    this.add.image(this.game.config.width*0.5, this.game.config.height*0.5, 'fondo');
    var modelo = 'rompecabezas';//(typeof _logic.modelo === 'undefined')?'modelo1':'modelo'+_logic.modelo;
    var spawnA = new Phaser.Geom.Rectangle(120, 100, 400, (this.game.config.height-300) );
    var spawnB = new Phaser.Geom.Rectangle((this.game.config.width-500), 100, 400, (this.game.config.height-300) );
    var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000ff }, fillStyle: { color: 0xff0000 }});
    //graphics.strokeRectShape(spawnA);
    //graphics.strokeRectShape(spawnB);
    var margen = new Phaser.Geom.Rectangle(0, 0, (this.game.config.width), (this.game.config.height));
    //var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0f0f0f }, fillStyle: { color: 0x0f0f0f }});
    //graphics.strokeRectShape(margen);
    var assets = this.textures.get(modelo).getFrameNames();
    this.piezas = this.add.group();
    var x = 200, y=200, rand = null;
    for(var i=0; i<assets.length; i++){
      if(assets[i]=="base.png" || assets[i]=="completo.png"){ continue; }
      rand = ((Phaser.Math.Between(0, 10)%2) == 0 )? spawnA.getRandomPoint(): spawnB.getRandomPoint();
      var pieza = new Pieza(this, rand.x, rand.y, modelo);
      pieza.setFrameCustom(assets[i]);
      pieza.body.setBoundsRectangle(margen);
      this.piezas.add(pieza);
    }

    this.base = new Base(this, (this.game.config.width*0.5), (this.game.config.height*0.5), modelo);
    this.base.setFrameCustom("base.png");

    this.basuras = this.add.group();
    var assetRandom, rand2, band;
    /*
    for(var i=0; i<10; i++){
      rand = Phaser.Math.Between(1, 10);
      if( rand==_logic.modelo && band==rand ){ i--; continue; }
      band=rand;
      modelo = 'modelo'+rand;
      assets = this.textures.get(modelo).getFrameNames();
      assetRandom = assets[Math.floor(Math.random()*assets.length)];
      if( assetRandom.includes('oreja') || assetRandom.includes('nariz') || assetRandom.includes('base') || assetRandom.includes('completo') ){ i--; continue; }
      //console.log('rand:',rand, 'AR:',assetRandom);
      rand2 = ((Phaser.Math.Between(0, 10)%2) == 0 )? spawnA.getRandomPoint(): spawnB.getRandomPoint();
      var basura = new Basura(this, rand2.x, rand2.y, modelo);
      basura.setFrameCustom(assetRandom);
      basura.body.setBoundsRectangle(margen);
      this.basuras.add(basura);
      //console.log("R:",rand,"L:",_logic.modelo,"basura:", assetRandom, modelo);
    }
    */

    this.input.on('dragstart', function (pointer, gameObject) {
      if(gameObject.draggable){
        gameObject.body.moves = false;
        this.children.bringToTop(gameObject);
      }
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      if(gameObject.draggable){
        gameObject.x = dragX;
        gameObject.y = dragY;
        gameObject.zone.update(dragX, dragY);
      }
    });

    this.input.on('dragend', function (pointer, gameObject) {
      if(gameObject.draggable){
        this.base.checkOverlap(gameObject);
      }
    }, this);

    this.player = new Player( this );

    //this.title = this.add.text(0, 150, "ARMA EL ROMPECABEZAS!", { fontFamily: 'Galano Grotesque', fontSize: 40, fontStyle: 'bold', color: '#dde3eb', align: 'center' });
    //this.title.setX( (this.game.config.width*0.5) - (this.title.width/2) );
    //this.txt_nombre = this.add.text(50, 30, "HOLA <nombre>", { fontFamily: 'Galano Grotesque', fontSize: 36, fontStyle: 'bold', color: '#dde3eb', align: 'left' });
    //this.txt_socio = this.add.text(50, 60, "NO. DE SOCIO: 0000000", { fontFamily: 'Galano Grotesque', fontSize: 26, fontStyle: 'bold', color: '#dde3eb', align: 'left' });
    this.txt_timer = this.add.text(0, 30, "TIEMPO: 00:00:00", { fontFamily: 'Avenir', fontSize: 26, fontStyle: 'bold', color: '#f2891e', align: 'right' });
    this.txt_timer.setX( (this.game.config.width) - (this.txt_timer.width+100) );

    //TIMER GAME
    this.timedEven = this.time.addEvent({
      delay: (30*60*1000),
      callback: function(){
        this.player.endGame();
      },
      callbackScope: this,
      loop: false
    });

    this.opt_fullscreen = this.add.sprite( 1050, 45, 'FULLSCREEN' ).setInteractive();
    this.opt_fullscreen.setX( (this.game.config.width) - (this.txt_timer.width+150) );
    /*
    if( _game.device.os.desktop ){//punt button fullscreen in mobile
      this.opt_fullscreen.destroy();
    }
    */

    var scene = this;
    this.input.on('gameobjectup', function (pointer, gameObject){
      if( !(gameObject instanceof Pieza) ){
        if (scene.scale.isFullscreen) {
          scene.scale.stopFullscreen();
          this.opt_fullscreen.setTexture('FULLSCREEN');
          // On normal screen
        }else {
          scene.game.scale.startFullscreen();
          // On fulll screen
          this.opt_fullscreen.setTexture('FULLSCREEN_EXIT');
          $("canvas#game").css({"max-width": "none", "height":"100%"});
        }
        return;
      }
    }, this);

    _logic.start_game();

  }//END create()
  update(time, delta){
    this.txt_timer.setText("TIEMPO: "+ _logic.time_format(this.timedEven.getElapsed()) );
  }//END update()
}//END class GameDragg
class EndGame extends Phaser.Scene{
  constructor(){
    super({key:"EndGame"});
  }
  preload(){

  }
  create(){
    this.title = this.add.text(0, 300, "FIN DEL JUEGO\nESPERA...", { fontFamily: 'Avenir', fontSize: 50, fontStyle: 'bold', color: '#ffffff', align: 'center' });
    this.title.setX( (this.game.config.width*0.5) - (this.title.width/2) );
  }
  update(time, delta){
  }
}//END class EndGame
class SeePaint extends Phaser.Scene{
  constructor(){
    super({key:"SeePaint"});
  }
  preload(){
  }
  create(){
    var modelo = 'rompecabezas';//(typeof _logic.modelo === 'undefined')?'modelo1':'modelo'+_logic.modelo;
    this.completo = this.add.sprite((this.game.config.width*0.5), (this.game.config.height*0.5), modelo);
    this.completo.setFrame("completo.png");


    this.title = this.add.text(0, 10, "OBSERVA EL ROMPECABEZAS! POR 3 SEGUNDOS!", { fontFamily: 'Avenir', fontSize: 30, fontStyle: 'bold', color: '#ffffff', align: 'center' });
    this.title.setX( (this.game.config.width*0.5) - (this.title.width/2) );

    this.timedEven = this.time.addEvent({
      delay: 3000,
      callback: function(){
        this.scene.stop("SeePaint");
        this.scene.start("GameDragg");
      },
      callbackScope: this,
      loop: false
    });

  }//END create()
  update(time, delta){
    this.title.setText("OBSERVA EL ROMPECABEZAS! POR "+ Math.round( Math.floor(3000 - this.timedEven.getElapsed())/1000 ) + " SEGUNDOS!");
  }
}
class MainGame extends Phaser.Scene{
  constructor(){
    super({key:"MainGame"});
  }
  preload(){
    //LOADER DEFAULT
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((this.game.config.width*0.5)-160, (this.game.config.height*0.5), 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((this.scene.game.config.width*0.5)-150, (this.scene.game.config.height*0.5)+10, 300 * value, 30);
    });
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
      assetText.setX( (this.scene.game.config.width*0.5) - (assetText.width/2) );
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
    //END LOADER DEFAULT
    this.load.atlas("loader", "/site_media/img/game/loader.png", "/site_media/img/game/loader.json?v=0.01");
    this.load.atlas('rompecabezas', '/site_media/img/game/rompecabezas.png', '/site_media/img/game/rompecabezas.json?v=0.01');
    this.load.image('FULLSCREEN', '/site_media/img/game/fullscreen.png');
    this.load.image('FULLSCREEN_EXIT', '/site_media/img/game/fullscreen-exit.png');
    this.load.image('fondo', '/site_media/img/game/fondo.jpg?v=0.1');
  }
  create(){
    var frames = [];
    var frameNames = this.textures.get('loader').getFrameNames();
    for(var i=1; i<=frameNames.length; i++){
      frames.push({ key: 'loader', frame: frameNames[i] });
    }
    this.anims.create({
      key: 'load',
      frames: frames,
      frameRate: 26,
      repeat: 0
    });
    this.loader = this.add.sprite((this.game.config.width*0.5), (this.game.config.height*0.5), 'loader');
    this.loader.play('load');

    this.title = this.add.text(0, 150, "ARMA EL ROMPECABEZAS!", { fontFamily: 'Avenir', fontSize: 40, fontStyle: 'bold', color: '#ffffff', align: 'center' });
    this.title.setX( (this.game.config.width*0.5) - (this.title.width/2) );
  
    this.subtitle = this.add.text(0, 250, "CARGANDO", { fontFamily: 'Avenir', fontSize: 20, fontStyle: 'bold', color: '#f2891e', align: 'center' });    
    this.subtitle.setX( (this.game.config.width*0.5) - (this.subtitle.width/2) );

    this.timedEven = this.time.addEvent({
      delay: 1200,
      callback: function(){
        this.scene.stop("MainGame");
        this.scene.start("SeePaint");
        _logic.prepare_start();
      },
      callbackScope: this,
      loop: false
    });
  }//create()
  update(time, delta){
  }//update()
}//END class MainGame
var configPhaser = {
  type: Phaser.WEBGL,
  width: 1779,
  height: 900,
  transparent: true,
  canvas: document.getElementById('game'),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    }
  },
  scene: [ MainGame, SeePaint, GameDragg, EndGame ],
  //  Open the Dev Tools
  //  Notice that it no longer says Phaser, or the Phaser version, in the banner
  banner: {
    hidePhaser: true
  }
};
_game = new Phaser.Game(configPhaser);