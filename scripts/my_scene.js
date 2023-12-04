
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

        // this.jiro = this.physics.add.sprite(400, 300, 'jiro');

        //hanakoを表示
        // let x = Phaser.Math.Between(100, 400) ;// y は　50～750の間の値
        // this.hanako = this.physics.add.sprite(x, 100, 'hanako');

        this.taro_direction = 1;

        this.taro.angle = 0

        //Myworldを表示
        // this._leftTimeText = this.add.text(600, 400, 'MyWorld ' );

        this.Hello = this.add.text(100,150, '').setFontSize(32).setColor('#0f0').setInteractive({ useHandCursor: true });

        this.Hello_text = this.add.text(100, 50, 'Hello!');
        this.Hello_text.setVisible(false);

        this.Hey_text = this.add.text(100, 50, 'Hey!');
        this.Hey_text.setVisible(false);
        
        // this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');

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
    
        //3秒ごとにhanakono画像をランダムに位置を変える
       //タイマー
        this._timeCounter = 0;  
       //残り時間
        this._leftTime = 3;
        this._leftTimeText = this.add.text(300, 16, 'Time: ' + this._leftTime, { fontSize: '28px', fill: '#FFF' ,fontFamily: "Arial"}); //時間表示
       // カウントダウンタイマーを稼働させるか判定するフラグ
        this.countdounTimer = true;

        
// physics グループの作成
this.hanakoGroup = this.physics.add.group();

// シーンに衝突検出を有効にする
this.physics.world.setBounds(0, 0, D_WIDTH, D_HEIGHT);

// 衝突検出の処理
this.physics.add.collider(this.taro, this.hanakoGroup, this.handleCollision, null, this);

        this.quitGame();
    }

    handleCollision(taro, hanako) {
        this.physics.world.disable(taro);
        this.physics.world.disable(hanako);


        this.Hello.setText('痛い！').setVisible(true);
        this.hanako.destroy();
        this.time.delayedCall(2000, function () {
            this.physics.world.enable(taro);
            this.physics.world.enable(hanako);
            this.Hello.setVisible(false);
        }, [], this);
    }
    
    // jiro_move(cursors, object){
    //     if(cursors.left.isDown){
    //         console.log("Left");
    //         object.setVelocityX(5);// 左方向の速度を設定
    //     }else if(cursors.right.isDown){
    //         console.log("Right!!");
    //         object.setVelocityX(-5);// 右方向の速度を設定
    //     }else{
    //         object.setVelocity(0,0);// 横方向の速度を0
    //     }
    // }
    hanako_move(keys,object){
        if(keys.keyW.isDown){ //Wが押されている
            let x = Phaser.Math.Between(100, 400) ;
            object.setPosition(x, 100);
        }
    }
    
    // taro_move(cursors, object){
    //     if(cursors.left.isDown){
    //         console.log("Left");
    //         object.setVelocityX(-5);// 左方向の速度を設定
    //     }else if(cursors.right.isDown){
    //         console.log("Right!!");
    //         object.setVelocityX(5);// 右方向の速度を設定
    //     }else{
    //         object.setVelocity(0,0);// 横方向の速度を0
    //     }
    // }
    
    taro_move(cursors, object){
        if(cursors.up.isDown){
            console.log("Up!!");
            object.setVelocityY(-200);// 上方向の速度を設定
        }else if(cursors.down.isDown){
            console.log("down!!");
            object.setVelocityY(200);// 下方向の速度を設定
        }else if(cursors.left.isDown){
            console.log("Left");
            object.setVelocityX(-200);// 左方向の速度を設定
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object.setVelocityX(200);// 右方向の速度を設定
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }
    }

    countdown(delta){
        // 毎フレーム事にタイマーを更新
        this._timeCounter += delta;
        // _timeCounterが1000になった1秒
        if(this._timeCounter > 1000) {
            this._timeCounter += delta;
            // _timeCounterが1000になった1秒
            if(this._timeCounter > 1000) {
                // 1000ミリ秒経過したのでカウンターをリセット
                this._timeCounter = 0;
                // 残り時間を減らす
                this._leftTime --;
                // テキストを更新する
                this._leftTimeText.setText('Time: ' + this._leftTime);
            }
        }
        if(this._leftTime <= 0) {

            // this._leftTime=30;

            this.quitGame();

        }

    }

    quitGame(){
        this._leftTime=3;
        if(this.hanako != null){
            this.hanako.destroy();
            this.hanako = null;
        }
        let  randx = Phaser.Math.Between(200, 400) ; 
        let  randy = Phaser.Math.Between(100, 200) ; 
        const hanako = this.hanakoGroup.create(randx, randy, 'hanako'); 
        this.hanako = hanako;
        hanako._timeCounter = 0; // hanako 固有のタイマーを初期化
        hanako._leftTime = 3; // hanako 固有の残り時間を初期化
        // this.countdounTimer = false;
        return;
    }

  // 毎フレーム実行される繰り返し処理
    update(time, delta) {
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
        // this.jiro_move(cursors, this.jiro);
        this.taro_move(cursors, this.taro);
        // this.hanako_move(this.keys,this.hanako);

        if (this.countdounTimer) {
            this.countdown(delta);

            if (this._leftTime <= 0) {
                this.quitGame();
            }
        }


    }
}