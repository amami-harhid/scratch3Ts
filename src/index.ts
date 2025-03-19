import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";

Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";

const Jurassic:string = "Jurassic";
const Jurassic2:string = "Jurassic2";
const Chill:string = "Chill";
const Mya: string = "Mya";
const Cat:string = "Cat";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

const Scratch3LikeJsLib = "https://amami-harhid.github.io/scratch3likejslib";

Pg.preload = async function preload(this: S3PlayGround) {
    // 注意！ Scratch3 に登録されているSVG画像をそのまま使う場合と 
    // Scratch3の画像エディターで加工、または複製した画像を使う場合では
    // 表示サイズ（縦横）が異なる。Scratch3用のSVG設定に変化してしまうため。
    // テキストエディターで <svg>タグ、<g>タグのサイズ設定を変更する必要がある。
    this.Image.load('/assets/Jurassic.svg', Jurassic2);
    this.Image.load('/assets/Jurassic2.svg', Jurassic);
    this.Sound.load(Scratch3LikeJsLib+'/web/assets/Chill.wav', Chill);
    this.Image.load(Scratch3LikeJsLib+'/web/assets/cat.svg', Cat);
    this.Sound.load(Scratch3LikeJsLib+'/web/assets/Cat.wav', Mya);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Image.add( Jurassic2 );
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    /**
     * ずっと背景を１秒ごとに切り替え続ける
     */
    stage.Event.whenFlag(async function*(this:S3Stage){
        for(;;){
            await this.Control.wait(1);
            // ２番目に切り替えると 表示される背景の中心が右上にずれるバグがある
            this.Looks.switchBackdrop(Jurassic2);
            await this.Control.wait(1);
            this.Looks.switchBackdrop(Jurassic);
            yield;
        }
    });

    stage.Event.whenFlag(async function*(this:S3Stage){
        // ここでの『this』は P であるので、this.sounds は P.soundsと同じである。 
        // stageのインスタンスは 『stage』の変数で受け取っている。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
        while(true){
            // ＢＧＭを鳴らし続ける（終わるまで待つ）
            await this.Sound.playUntilDone();
            yield;
        }
    });

    const catStep = 10;

    cat.Event.whenFlag( async function(this:S3Sprite){
        // 初期化
        this.Motion.gotoXY({x:0, y:0});
        this.Motion.pointInDirection( 40 );
    });

    cat.Event.whenFlag( async function*(this:S3Sprite){
        await this.Sound.add( Mya );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと「左右」に動く。端に触れたら跳ね返る。
        while(true){
            this.Motion.moveSteps(catStep);
            this.Motion.ifOnEdgeBounds();
            if(this.Sensing.isTouchingEdge()){
                this.Sound.play();
            }
            yield;
        }
    });


}