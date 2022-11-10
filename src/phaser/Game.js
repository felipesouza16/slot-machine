import { Game } from "phaser";
import Phaser from "phaser";
import bg from "../assets/bg.png";
import frame from "../assets/frame.png";
import winline from "../assets/winline.png";
import button from "../assets/buttons/play_button_0.png";
import buttonHover from "../assets/buttons/play_button_2.png";
import buttonDisabled from "../assets/buttons/play_button_3.png";
import apple from "../assets/symbols/apple.png";
import banana from "../assets/symbols/banana.png";
import bar from "../assets/symbols/bar.png";
import cherry from "../assets/symbols/cherry.png";
import grape from "../assets/symbols/grape.png";
import lemon from "../assets/symbols/lemon.png";
import orange from "../assets/symbols/orange.png";
import watermellon from "../assets/symbols/watermellon.png";
import Container from "./class/Container";

export default class Scene extends Phaser.Scene {
  constructor() {
    super();
    this.checkClick = false;
    this.orderContainer = 0;
  }

  preload() {
    this.load.image("background", bg);
    this.load.image("frame", frame);
    this.load.image("winline", winline);
    this.load.image("button", button);
    this.load.image("button_hover", buttonHover);
    this.load.image("button_disabled", buttonDisabled);
    this.load.image("apple", apple);
    this.load.image("banana", banana);
    this.load.image("bar", bar);
    this.load.image("cherry", cherry);
    this.load.image("grape", grape);
    this.load.image("lemon", lemon);
    this.load.image("orange", orange);
    this.load.image("watermellon", watermellon);
  }

  create() {
    this.balance = 500;
    this.winnigs = 0;
    //containers (spin)
    this.container1 = new Container(this, 203, 5);
    this.container2 = new Container(this, 338, 5);
    this.container3 = new Container(this, 468, 5);
    //

    this.bg = this.add.image(400, 300, "background");
    this.frame = this.add.image(400, 300, "frame");

    this.message = this.add
      .text(320, 442, "GOOD LUCK", {
        color: "#000",
        fontSize: "25px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setDepth(2);

    this.balanceText = this.add
      .text(195, 145, `Balance:${this.balance}`, {
        color: "#000",
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setDepth(2);

    this.winnigsText = this.add
      .text(488, 145, `Winnings:${this.winnigs}`, {
        color: "#000",
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setDepth(2);

    this.buttonPlay = this.add
      .sprite(400, 520, "button")
      .setInteractive()
      .setDepth(1);

    this.txtPlay = this.add
      .text(374, 505, "Play", {
        fontSize: "25px",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setDepth(2);

    this.buttonPlay.on("pointerdown", this.onPlay, this);

    this.buttonPlay.on(
      "pointerover",
      () => {
        if (!this.checkClick) {
          this.buttonPlay = this.add
            .sprite(400, 520, "button_hover")
            .setDepth(1);
          this.txtPlay.setDepth(2);
        }
        document.body.style.cursor = "pointer";
      },
      this
    );
    this.buttonPlay.on(
      "pointerout",
      () => {
        if (!this.checkClick) {
          this.buttonPlay = this.add.sprite(400, 520, "button").setDepth(1);
          this.txtPlay.setDepth(2);
        }
        document.body.style.cursor = "auto";
      },
      this
    );
  }

  update() {}

  onPlay() {
    if (!this.checkClick) {
      this.winline?.destroy();
      this.message.setText("GOOD LUCK").setDepth(2);
      this.checkClick = true;
      this.disableButton();
      this.balance -= 1;
      this.balanceText.setText(`Balance:${this.balance}`);
      this.tweens.add(
        {
          targets: this.container1,
          y: 130,
          duration: 100,
          ease: "Linear",
          yoyo: true,
          repeat: 5,
          onYoyo: () => {
            this.container1 = new Container(this, 203, 5);
            this.bg.setDepth(1);
            this.frame.setDepth(1);
            this.buttonPlay.setDepth(1);
            this.txtPlay.setDepth(2);
            this.balanceText.setDepth(2);
            this.winnigsText.setDepth(2);
          },
          onComplete: () => {
            this.tweens.add({
              targets: this.container2,
              y: 130,
              duration: 100,
              ease: "Linear",
              yoyo: true,
              repeat: 5,
              onYoyo: () => {
                this.container2 = new Container(this, 338, 5);
                this.bg.setDepth(1);
                this.frame.setDepth(1);
                this.buttonPlay.setDepth(1);
                this.txtPlay.setDepth(2);
              },
              onComplete: () => {
                this.tweens.add({
                  targets: this.container3,
                  y: 130,
                  duration: 100,
                  ease: "Linear",
                  yoyo: true,
                  repeat: 5,
                  onYoyo: () => {
                    this.container3 = new Container(this, 468, 5);
                    this.bg.setDepth(1);
                    this.frame.setDepth(1);
                    this.buttonPlay.setDepth(1);
                    this.txtPlay.setDepth(2);
                  },
                  onComplete: () => {
                    this.buttonPlay = this.add
                      .sprite(400, 520, "button")
                      .setDepth(1);
                    this.txtPlay.setDepth(2);
                    this.checkClick = false;
                    this.result();
                  },
                });
              },
            });
          },
        },
        this
      );
    }
  }

  disableButton() {
    this.buttonPlay = this.add.sprite(399, 520, "button_disabled").setDepth(1);
    this.txtPlay.setDepth(2);
  }

  result() {
    const symbol1 = this.container1.symbol3.texture.key;
    const symbol2 = this.container2.symbol3.texture.key;
    const symbol3 = this.container3.symbol3.texture.key;

    if (symbol1 === symbol2 && symbol1 === symbol3) {
      this.winline = this.add.sprite(400, 300, "winline").setDepth(3);
      this.winnigs += 1;
      this.winnigsText.setText(`Winnings:${this.winnigs}`);
      switch (symbol1) {
        case "apple":
          this.message.setText("3 Apple = 15").setDepth(2);
          this.balance += 15;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "banana":
          this.message.setText("3 Banana = 1").setDepth(2);
          this.balance += 1;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "bar":
          this.message.setText("3 Bar = 100").setDepth(2);
          this.balance += 100;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "cherry":
          this.message.setText("3 Cherry = 50").setDepth(2);
          this.balance += 50;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "grape":
          this.message.setText("3 Grape = 10").setDepth(2);
          this.balance += 10;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "lemon":
          this.message.setText("3 Lemon = 25").setDepth(2);
          this.balance += 25;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "orange":
          this.message.setText("3 Orange = 5").setDepth(2);
          this.balance += 5;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
        case "watermellon":
          this.message.setText("3 Watermellon = 20").setDepth(2);
          this.balance += 20;
          this.balanceText.setText(`Balance:${this.balance}`).setDepth(2);
          break;
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: Scene,
};

new Game(config);
