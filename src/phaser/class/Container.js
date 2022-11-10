export default class Container extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    scene.add.existing(this);

    this.randomProbability();

    this.symbol1 = scene.add
      .sprite(0, 0, this.randomProbability())
      .setOrigin(0)
      .setScale(0.83);
    this.symbol2 = scene.add
      .sprite(0, 115, this.randomProbability())
      .setOrigin(0)
      .setScale(0.83);
    this.symbol3 = scene.add
      .sprite(0, 115 * 2, this.randomProbability())
      .setOrigin(0)
      .setScale(0.83);
    this.symbol4 = scene.add
      .sprite(0, 115 * 3, this.randomProbability())
      .setOrigin(0)
      .setScale(0.83);
    this.symbol5 = scene.add
      .sprite(0, 115 * 4, this.randomProbability())
      .setOrigin(0)
      .setScale(0.83);

    this.add([
      this.symbol1,
      this.symbol2,
      this.symbol3,
      this.symbol4,
      this.symbol5,
    ]);
  }

  randomProbability() {
    const randomNumber = Math.floor(Math.random() * (87 - 0) + 0);

    if (randomNumber === 1 || randomNumber === 0) {
      return "bar";
    } else if (randomNumber === 2) {
      return "cherry";
    } else if (randomNumber <= 4) {
      return "lemon";
    } else if (randomNumber <= 8) {
      return "watermellon";
    } else if (randomNumber <= 12) {
      return "apple";
    } else if (randomNumber <= 16) {
      return "grape";
    } else if (randomNumber <= 20) {
      return "orange";
    }
    return "banana";
  }
}
