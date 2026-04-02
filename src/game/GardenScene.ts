import Phaser from "phaser";

// Grid configuration
const COLS = 4;
const ROWS = 3;
const TILE_SIZE = 88;
const TILE_GAP = 6;

// Growth stages
type GrowthStage = "empty" | "seed" | "sprout" | "growing" | "ready";

// Rarity config
const RARITY_COLOURS: Record<string, number> = {
  common: 0x6b5d54,
  uncommon: 0x7bb369,
  rare: 0xd4943a,
  legendary: 0xffc800,
};

const RARITY_BORDER: Record<string, number> = {
  common: 0x8b7d74,
  uncommon: 0x5a9a4a,
  rare: 0xc4830a,
  legendary: 0xffc800,
};

// Soil colour palette for natural variation
const SOIL_BASE = 0x5a3a1a;
const SOIL_LIGHT = 0x6b4a2a;
const SOIL_DARK = 0x4a2a10;

interface PlotData {
  col: number;
  row: number;
  varietyId: string | null;
  cropSlug: string | null;
  varietyName: string | null;
  rarity: string | null;
  growthStage: GrowthStage;
}

interface GameCallbacks {
  onEmptyTileTap: (col: number, row: number) => void;
  onPlantTap: (col: number, row: number, varietyId: string) => void;
  onHarvestTap: (col: number, row: number, varietyId: string) => void;
}

export default class GardenScene extends Phaser.Scene {
  private plots: PlotData[][] = [];
  private tileContainers: Phaser.GameObjects.Container[][] = [];
  private callbacks: GameCallbacks | null = null;
  private gridOffsetX = 0;
  private gridOffsetY = 0;

  constructor() {
    super({ key: "GardenScene" });
  }

  init(data: { callbacks: GameCallbacks }) {
    this.callbacks = data.callbacks;
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(0xf5efe0);

    // Calculate grid position
    const gridWidth = COLS * TILE_SIZE + (COLS - 1) * TILE_GAP;
    const gridHeight = ROWS * TILE_SIZE + (ROWS - 1) * TILE_GAP;
    this.gridOffsetX = (width - gridWidth) / 2;
    this.gridOffsetY = (height - gridHeight) / 2;

    // Draw raised bed border — layered for depth
    this.drawRaisedBed(gridWidth, gridHeight);

    // Draw grass patches around the border
    this.drawGrassPatches(gridWidth, gridHeight);

    // Create plot tiles
    this.plots = [];
    this.tileContainers = [];

    for (let row = 0; row < ROWS; row++) {
      this.plots[row] = [];
      this.tileContainers[row] = [];
      for (let col = 0; col < COLS; col++) {
        this.plots[row][col] = {
          col, row,
          varietyId: null,
          cropSlug: null,
          varietyName: null,
          rarity: null,
          growthStage: "empty",
        };

        const x = this.gridOffsetX + col * (TILE_SIZE + TILE_GAP);
        const y = this.gridOffsetY + row * (TILE_SIZE + TILE_GAP);
        const container = this.createEmptyTile(x, y, col, row);
        this.tileContainers[row][col] = container;
      }
    }
  }

  private drawRaisedBed(gridWidth: number, gridHeight: number) {
    const pad = 14;
    const g = this.add.graphics();

    // Outer shadow
    g.fillStyle(0x3a2a10, 0.3);
    g.fillRoundedRect(
      this.gridOffsetX - pad - 2,
      this.gridOffsetY - pad + 2,
      gridWidth + pad * 2 + 4,
      gridHeight + pad * 2 + 2,
      10
    );

    // Outer wood
    g.fillStyle(0x7a5020, 1);
    g.fillRoundedRect(
      this.gridOffsetX - pad,
      this.gridOffsetY - pad,
      gridWidth + pad * 2,
      gridHeight + pad * 2,
      10
    );

    // Inner wood (lighter grain)
    g.fillStyle(0x9a6830, 1);
    g.fillRoundedRect(
      this.gridOffsetX - pad + 3,
      this.gridOffsetY - pad + 3,
      gridWidth + pad * 2 - 6,
      gridHeight + pad * 2 - 6,
      8
    );

    // Wood grain lines
    g.lineStyle(1, 0x8a5820, 0.3);
    for (let i = 0; i < gridHeight + pad * 2; i += 7) {
      const y = this.gridOffsetY - pad + i;
      g.lineBetween(
        this.gridOffsetX - pad + 6,
        y,
        this.gridOffsetX + gridWidth + pad - 6,
        y + 1
      );
    }

    // Soil fill inside the bed
    g.fillStyle(0x4a2a10, 1);
    g.fillRoundedRect(
      this.gridOffsetX - 3,
      this.gridOffsetY - 3,
      gridWidth + 6,
      gridHeight + 6,
      4
    );
  }

  private drawGrassPatches(gridWidth: number, gridHeight: number) {
    const g = this.add.graphics();
    const grassColours = [0x6a9a4a, 0x5a8a3a, 0x7aaa5a, 0x4a7a2a];

    // Scatter small grass tufts around the raised bed
    for (let i = 0; i < 30; i++) {
      const side = Phaser.Math.Between(0, 3);
      let gx: number, gy: number;

      const pad = 24;
      switch (side) {
        case 0: // top
          gx = Phaser.Math.Between(this.gridOffsetX - pad, this.gridOffsetX + gridWidth + pad);
          gy = Phaser.Math.Between(this.gridOffsetY - pad - 30, this.gridOffsetY - pad - 5);
          break;
        case 1: // bottom
          gx = Phaser.Math.Between(this.gridOffsetX - pad, this.gridOffsetX + gridWidth + pad);
          gy = Phaser.Math.Between(this.gridOffsetY + gridHeight + pad + 5, this.gridOffsetY + gridHeight + pad + 30);
          break;
        case 2: // left
          gx = Phaser.Math.Between(this.gridOffsetX - pad - 30, this.gridOffsetX - pad - 5);
          gy = Phaser.Math.Between(this.gridOffsetY - pad, this.gridOffsetY + gridHeight + pad);
          break;
        default: // right
          gx = Phaser.Math.Between(this.gridOffsetX + gridWidth + pad + 5, this.gridOffsetX + gridWidth + pad + 30);
          gy = Phaser.Math.Between(this.gridOffsetY - pad, this.gridOffsetY + gridHeight + pad);
      }

      const col = grassColours[Phaser.Math.Between(0, grassColours.length - 1)];
      g.fillStyle(col, 0.6);

      // Small leaf/blade shapes
      const size = Phaser.Math.Between(3, 8);
      g.fillEllipse(gx, gy, size, size * 1.5);
    }
  }

  private createSoilGraphics(x: number, y: number): Phaser.GameObjects.Graphics {
    const g = this.add.graphics();

    // Base soil
    g.fillStyle(SOIL_BASE, 1);
    g.fillRoundedRect(x, y, TILE_SIZE, TILE_SIZE, 6);

    // Random soil texture — darker patches
    const rng = new Phaser.Math.RandomDataGenerator([`${x}-${y}`]);
    for (let i = 0; i < 5; i++) {
      const px = x + rng.between(8, TILE_SIZE - 8);
      const py = y + rng.between(8, TILE_SIZE - 8);
      const ps = rng.between(4, 12);
      g.fillStyle(rng.pick([SOIL_DARK, SOIL_LIGHT]), 0.3);
      g.fillEllipse(px, py, ps, ps * 0.7);
    }

    // Subtle furrow lines
    g.lineStyle(1, SOIL_LIGHT, 0.15);
    for (let i = 0; i < 3; i++) {
      const ly = y + 15 + i * 25 + rng.between(-3, 3);
      g.lineBetween(x + 6, ly, x + TILE_SIZE - 6, ly + rng.between(-2, 2));
    }

    // Tiny pebbles
    for (let i = 0; i < 3; i++) {
      const px = x + rng.between(10, TILE_SIZE - 10);
      const py = y + rng.between(10, TILE_SIZE - 10);
      g.fillStyle(0x8a7a6a, 0.25);
      g.fillCircle(px, py, rng.between(1, 3));
    }

    return g;
  }

  private createEmptyTile(x: number, y: number, col: number, row: number): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0);

    // Soil
    const soil = this.createSoilGraphics(x, y);
    container.add(soil);

    // Plus icon — gentle, inviting
    const plus = this.add.text(x + TILE_SIZE / 2, y + TILE_SIZE / 2, "+", {
      fontFamily: "Inter, sans-serif",
      fontSize: "24px",
      color: "#ffffff",
    });
    plus.setOrigin(0.5).setAlpha(0.2);
    container.add(plus);

    // Hover glow outline (hidden by default)
    const hoverOutline = this.add.graphics();
    hoverOutline.lineStyle(2, 0x7bb369, 0.6);
    hoverOutline.strokeRoundedRect(x - 1, y - 1, TILE_SIZE + 2, TILE_SIZE + 2, 7);
    hoverOutline.setAlpha(0);
    container.add(hoverOutline);

    // Hit zone
    const hitZone = this.add.zone(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
    hitZone.setInteractive({ useHandCursor: true });

    hitZone.on("pointerover", () => {
      this.tweens.add({ targets: hoverOutline, alpha: 1, duration: 150 });
      this.tweens.add({ targets: plus, alpha: 0.5, duration: 150 });
    });

    hitZone.on("pointerout", () => {
      this.tweens.add({ targets: hoverOutline, alpha: 0, duration: 150 });
      this.tweens.add({ targets: plus, alpha: 0.2, duration: 150 });
    });

    hitZone.on("pointerdown", () => {
      const plot = this.plots[row][col];
      if (plot.growthStage === "empty") {
        this.callbacks?.onEmptyTileTap(col, row);
      } else if (plot.growthStage === "ready") {
        this.callbacks?.onHarvestTap(col, row, plot.varietyId!);
      } else if (plot.varietyId) {
        this.callbacks?.onPlantTap(col, row, plot.varietyId);
      }
    });

    container.add(hitZone);
    return container;
  }

  /**
   * Plant a variety with animation. Called from React.
   */
  plantSeed(col: number, row: number, varietyId: string, cropSlug: string, rarity: string, varietyName: string) {
    const plot = this.plots[row]?.[col];
    if (!plot) return;

    plot.varietyId = varietyId;
    plot.cropSlug = cropSlug;
    plot.varietyName = varietyName;
    plot.rarity = rarity;
    plot.growthStage = "seed";

    const x = this.gridOffsetX + col * (TILE_SIZE + TILE_GAP);
    const y = this.gridOffsetY + row * (TILE_SIZE + TILE_GAP);

    // Destroy old tile
    this.tileContainers[row][col].destroy(true);

    // Build new planted tile
    const container = this.add.container(0, 0);

    // Soil base (same as empty but we'll add things on top)
    const soil = this.createSoilGraphics(x, y);
    container.add(soil);

    // Rarity border glow
    const rarityCol = RARITY_BORDER[rarity] || 0x8b7d74;
    const borderGlow = this.add.graphics();
    borderGlow.lineStyle(2, rarityCol, 0.7);
    borderGlow.strokeRoundedRect(x, y, TILE_SIZE, TILE_SIZE, 6);
    borderGlow.setAlpha(0);
    container.add(borderGlow);

    // Seed dot — starts invisible, animates in
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2 - 4;
    const seedDot = this.add.ellipse(cx, cy, 10, 8, 0x8b6914);
    seedDot.setScale(0).setAlpha(0);
    container.add(seedDot);

    // Variety name label
    const label = this.add.text(x + TILE_SIZE / 2, y + TILE_SIZE - 6, varietyName || "", {
      fontFamily: "Inter, sans-serif",
      fontSize: "8px",
      color: "#d4c4a0",
      align: "center",
    });
    label.setOrigin(0.5, 1).setAlpha(0);
    label.setWordWrapWidth(TILE_SIZE - 8);
    container.add(label);

    // Hit zone for interactions
    const hitZone = this.add.zone(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
    hitZone.setInteractive({ useHandCursor: true });
    hitZone.on("pointerdown", () => {
      if (plot.growthStage === "ready") {
        this.callbacks?.onHarvestTap(col, row, plot.varietyId!);
      } else if (plot.varietyId) {
        this.callbacks?.onPlantTap(col, row, plot.varietyId);
      }
    });
    container.add(hitZone);

    this.tileContainers[row][col] = container;

    // === PLANTING ANIMATION ===

    // 1. Soil ripple — a ring expanding from centre
    const ripple = this.add.graphics();
    ripple.lineStyle(2, 0x7a5a2a, 0.5);
    ripple.strokeCircle(cx, cy + 4, 5);
    ripple.setScale(0.5).setAlpha(1);
    this.tweens.add({
      targets: ripple,
      scaleX: 3,
      scaleY: 2,
      alpha: 0,
      duration: 600,
      ease: "Sine.easeOut",
      delay: 100,
      onComplete: () => ripple.destroy(),
    });

    // 2. Seed drops in
    seedDot.setY(cy - 40);
    this.tweens.add({
      targets: seedDot,
      y: cy,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 400,
      ease: "Bounce.easeOut",
      delay: 200,
    });

    // 3. Border glow fades in
    this.tweens.add({
      targets: borderGlow,
      alpha: 1,
      duration: 500,
      delay: 500,
    });

    // 4. Name label fades in
    this.tweens.add({
      targets: label,
      alpha: 0.7,
      duration: 400,
      delay: 700,
    });

    // 5. Soil particles scatter on impact
    this.time.delayedCall(300, () => {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = Phaser.Math.Between(15, 30);
        const particle = this.add.circle(cx, cy, Phaser.Math.Between(1, 3), 0x6b4a2a);
        this.tweens.add({
          targets: particle,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist * 0.6,
          alpha: 0,
          duration: 500,
          ease: "Sine.easeOut",
          delay: i * 30,
          onComplete: () => particle.destroy(),
        });
      }
    });

    // 6. Rarity sparkles for rare+
    if (rarity === "rare" || rarity === "legendary") {
      const sparkleCol = RARITY_COLOURS[rarity];
      const count = rarity === "legendary" ? 12 : 6;
      this.time.delayedCall(600, () => {
        for (let i = 0; i < count; i++) {
          const sx = cx + Phaser.Math.Between(-25, 25);
          const sy = cy + Phaser.Math.Between(-25, 15);
          const sparkle = this.add.star(sx, sy, 4, 1, 3, sparkleCol);
          sparkle.setScale(0).setAlpha(1);
          this.tweens.add({
            targets: sparkle,
            scaleX: 1,
            scaleY: 1,
            alpha: 0,
            y: sy - Phaser.Math.Between(15, 35),
            duration: 800,
            ease: "Sine.easeOut",
            delay: i * 80,
            onComplete: () => sparkle.destroy(),
          });
        }
      });
    }

    // 7. Legendary gets a golden flash
    if (rarity === "legendary") {
      this.time.delayedCall(500, () => {
        const flash = this.add.graphics();
        flash.fillStyle(0xffc800, 0.3);
        flash.fillRoundedRect(x - 2, y - 2, TILE_SIZE + 4, TILE_SIZE + 4, 8);
        this.tweens.add({
          targets: flash,
          alpha: 0,
          duration: 800,
          ease: "Sine.easeOut",
          onComplete: () => flash.destroy(),
        });
      });
    }
  }

  /**
   * Update growth stage visually.
   */
  updateGrowth(col: number, row: number, stage: GrowthStage) {
    const plot = this.plots[row]?.[col];
    if (!plot || !plot.varietyId) return;
    plot.growthStage = stage;

    const container = this.tileContainers[row][col];
    const cx = this.gridOffsetX + col * (TILE_SIZE + TILE_GAP) + TILE_SIZE / 2;
    const cy = this.gridOffsetY + row * (TILE_SIZE + TILE_GAP) + TILE_SIZE / 2 - 4;

    // Find the seed dot (ellipse)
    const seedDot = container.list.find(
      (child) => child instanceof Phaser.GameObjects.Ellipse
    ) as Phaser.GameObjects.Ellipse | undefined;

    if (!seedDot) return;

    switch (stage) {
      case "sprout":
        this.tweens.add({
          targets: seedDot,
          scaleX: 1.5,
          scaleY: 1.8,
          duration: 500,
          ease: "Back.easeOut",
        });
        seedDot.setFillStyle(0x4a9a4a);
        break;

      case "growing":
        this.tweens.add({
          targets: seedDot,
          scaleX: 2.2,
          scaleY: 2.5,
          duration: 500,
          ease: "Back.easeOut",
        });
        seedDot.setFillStyle(0x2d8a3e);
        break;

      case "ready": {
        const rarityCol = RARITY_COLOURS[plot.rarity || "common"];
        this.tweens.add({
          targets: seedDot,
          scaleX: 2.8,
          scaleY: 2.8,
          duration: 500,
          ease: "Back.easeOut",
        });
        seedDot.setFillStyle(rarityCol);

        // Pulse for "pick me!"
        this.tweens.add({
          targets: seedDot,
          scaleX: 3.1,
          scaleY: 3.1,
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
          delay: 600,
        });

        // Gentle sparkle loop for ready crops
        this.time.addEvent({
          delay: 2000,
          loop: true,
          callback: () => {
            if (plot.growthStage !== "ready") return;
            const sparkle = this.add.star(
              cx + Phaser.Math.Between(-15, 15),
              cy + Phaser.Math.Between(-15, 15),
              4, 1, 3,
              rarityCol
            );
            sparkle.setAlpha(0.7).setScale(0.5);
            this.tweens.add({
              targets: sparkle,
              alpha: 0,
              y: sparkle.y - 15,
              scaleX: 0,
              scaleY: 0,
              duration: 1000,
              onComplete: () => sparkle.destroy(),
            });
          },
        });
        break;
      }
    }
  }

  /**
   * Harvest with celebration animation.
   */
  harvestPlant(col: number, row: number) {
    const plot = this.plots[row]?.[col];
    if (!plot) return;

    const x = this.gridOffsetX + col * (TILE_SIZE + TILE_GAP);
    const y = this.gridOffsetY + row * (TILE_SIZE + TILE_GAP);
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    const container = this.tileContainers[row][col];
    const rarityCol = RARITY_COLOURS[plot.rarity || "common"];

    // 1. Pop-up and fade
    this.tweens.add({
      targets: container,
      y: -20,
      alpha: 0,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 400,
      ease: "Back.easeIn",
      onComplete: () => container.destroy(true),
    });

    // 2. Celebration burst — coloured particles
    this.time.delayedCall(150, () => {
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const dist = Phaser.Math.Between(30, 60);
        const colours = [rarityCol, 0x7bb369, 0xf5efe0, 0xd4943a];
        const particle = this.add.circle(
          cx, cy,
          Phaser.Math.Between(2, 5),
          colours[Phaser.Math.Between(0, colours.length - 1)]
        );
        this.tweens.add({
          targets: particle,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist - 20,
          alpha: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 700,
          ease: "Sine.easeOut",
          delay: i * 25,
          onComplete: () => particle.destroy(),
        });
      }

      // Star burst for rare+
      if (plot.rarity === "rare" || plot.rarity === "legendary") {
        for (let i = 0; i < 6; i++) {
          const star = this.add.star(
            cx + Phaser.Math.Between(-10, 10),
            cy + Phaser.Math.Between(-10, 10),
            5, 2, 6, rarityCol
          );
          this.tweens.add({
            targets: star,
            y: star.y - Phaser.Math.Between(30, 60),
            alpha: 0,
            rotation: Phaser.Math.Between(-1, 1),
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 900,
            ease: "Sine.easeOut",
            delay: 100 + i * 60,
            onComplete: () => star.destroy(),
          });
        }
      }
    });

    // 3. Reset plot data
    plot.varietyId = null;
    plot.cropSlug = null;
    plot.varietyName = null;
    plot.rarity = null;
    plot.growthStage = "empty";

    // 4. Recreate empty tile after celebration
    this.time.delayedCall(800, () => {
      const newContainer = this.createEmptyTile(x, y, col, row);
      // Fade in gently
      newContainer.setAlpha(0);
      this.tweens.add({
        targets: newContainer.list,
        alpha: { from: 0, to: 1 },
        duration: 400,
        ease: "Sine.easeOut",
      });
      this.tileContainers[row][col] = newContainer;
    });
  }
}
