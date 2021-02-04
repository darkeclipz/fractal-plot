export class Canvas {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    draw: CanvasDrawing;

    constructor(elementId: string) {
        this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.setDimensions();
        this.canvas.addEventListener("onresize", () => this.setDimensions());
        this.draw = new CanvasDrawing(this.canvas, this.ctx);
    }

    setDimensions() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%;'
        this.canvas.style.position = 'relative';
        const parent = this.canvas.parentElement?.getBoundingClientRect();
        if(parent !== undefined) {
            this.canvas.width = this.width = parent!.width;
            this.canvas.height = this.height = parent!.height;
        }
        else {
            this.canvas.width = this.width = window.innerWidth;
            this.canvas.height = this.height = window.innerHeight;
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export class CanvasDrawing {
    mode: DrawMode = DrawMode.Fill;
    position: DrawPosition = DrawPosition.Center;

    constructor(
        private canvas: HTMLCanvasElement, 
        private ctx: CanvasRenderingContext2D) {
    }

    setFillStyle(style: string) {
        this.ctx.fillStyle = style;
    }

    setStrokeStyle(style: string) {
        this.ctx.strokeStyle = style;
    }

    setLineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    rect(x: number, y: number, w: number, h: number) {
        console.log('draw rect');
        if(this.position === DrawPosition.Center) {
            x -= w / 2;
            y -= h / 2;
        }
        if(this.mode === DrawMode.Fill) {
            this.ctx.fillRect(x, y, w, h);
        }
        else if(this.mode === DrawMode.Stroke) {
            this.ctx.strokeRect(x, y, w, h);
        }
    }

    line(x1: number, y1: number, x2: number, y2: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}

export enum DrawPosition {
    LeftTop,
    Center
}

export enum DrawMode {
    Fill,
    Stroke
}