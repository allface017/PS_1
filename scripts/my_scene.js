
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('city', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jiro', 'assets/jiro.png');
        this.load.image('hanako','assets/hanako.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'city');
        
        this.taro = this.physics.add.sprite(500, 350, 'taro');

        this.jiro = this.physics.add.sprite(400, 300, 'jiro');

        this.taro_direction = 1;

        this.taro.angle = 0

        //Myworldを表示
        this._leftTimeText = this.add.text(600, 400, 'MyWorld ' );

        this.Hello_text = this.add.text(100, 50, 'Hello!');
        this.Hello_text.setVisible(false);

        this.Hey_text = this.add.text(100, 50, 'Hey!');
        this.Hey_text.setVisible(false);
        
        this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');

        this.input.keyboard.on('keydown-A', function (event) {
            this.Hello_text.setVisible(true);
        }, this);

        this.input.keyboard.on('keydown-S', function (event) {
            this.Hey_text.setVisible(true);
        }, this);

        this.input.keyboard.on('keydown-D', function (event) {
            this.Hello_text.setVisible(false);
            this.Hey_text.setVisible(false);
        }, this);



        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    
    }


    
    jiro_move(cursors, object){
        if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(5);// 左方向の速度を設定
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(-5);// 右方向の速度を設定
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }
    }

    taro_move(cursors, object){
        if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(-5);// 左方向の速度を設定
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(5);// 右方向の速度を設定
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }
    }

  // 毎フレーム実行される繰り返し処理
    update() {
  // プレイヤーの移動
//     if (this.taro_direction == 1) {
//         this.taro.setVelocityX(50);
//         this.taro.setVelocityY(-50);
//     } 
        // this.taro.angle += 5;
        // if(D_WIDTH < this.taro.x || D_HEIGHT < this.taro.y  ){
        //     this.taro.x =500; 
        //     this.taro.y =350;
        // }
        // if (this.taro_direction == 1){
        //     // 回転角度を設定
        //     this.taro.setVelocityX(50);
        //     this.taro.setVelocityY(-50);
        // }    

        // キーボードの情報を取得
        let cursors = this.input.keyboard.createCursorKeys();
        this.jiro_move(cursors, this.jiro);
        this.taro_move(cursors, this.taro);
    }
}