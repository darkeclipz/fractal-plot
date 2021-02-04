import { Canvas } from "./canvas";

export class FractalPlot {
    canvas: Canvas;
    root: Node = new Node("Root");

    constructor(elementId: string) {
        this.canvas = new Canvas(elementId);
        this.draw();
    }

    find(name: string): Node | undefined {
        return this.bfs((node: Node): any => {
            if(node.name === name) {
                return node;
            }
        });
    }

    leaves(): Node[] {
        const result: Node[] = [];
        this.bfs((node: Node) => {
            if(node.children.length === 0) {
                result.push(node);
            }
        });
        return result;
    }

    bfs(func: (node: Node) => any): any {
        let queue = [this.root];
        while(queue.length > 0) {
            const node = queue.shift() as Node;
            const result = func(node);
            if(result !== undefined) {
                return result;
            }
            queue = queue.concat(...node.children);
        }
    }

    dfs(func: (node: Node) => any): any {
        let stack = [this.root];
        while(stack.length > 0) {
            const node = stack.pop() as Node;
            const result = func(node);
            if(result !== undefined) {
                return result;
            }
            stack = stack.concat(...node.children);
        }
    }

    draw() {
        this.canvas.clear();
        new FractalPlotDrawer(this.canvas, this);
    }
}

export class FractalPlotDrawer {
    constructor(private canvas: Canvas, private graph: FractalPlot) {
        // Draw the tree
        const recursiveDrawer = (left: number, right: number, top: number, node: Node, parentCenter: Vec2 | undefined = undefined) => {
            const width = right - left;
            const center = new Vec2(left + width / 2, top);
            if(parentCenter !== undefined) {
                canvas.draw.line(center.x, center.y, parentCenter.x, parentCenter.y);
            }
            canvas.draw.rect(center.x, center.y, 10, 10);
            const n = node.children.length;
            if(n > 0) {
                const laneWidth = width / n;
                for(let i = 0; i < n; i++) {
                    const childLaneLeft = left + i * laneWidth;
                    const childLaneRight = left + (i + 1) * laneWidth;
                    const childLaneTop = top + 60;
                    recursiveDrawer(childLaneLeft, childLaneRight, childLaneTop, node.children[i], center);
                }
            }
        };
        recursiveDrawer(0, canvas.width, 20, graph.root);
    }
}

export class Node {
    children: Node[] = [];
    geometry: NodeGeometry = new NodeGeometry();

    constructor(
        public name: string, 
        public parent: Node | undefined = undefined) {
    }

    addNode(name: string): Node {
        const node = new Node(name, this);
        this.children.push(node);
        return node;
    }
}

export class NodeGeometry {
    geometry: Vec2 = new Vec2();
}

export class Vec2 {
    constructor(public x = 0, public y = x) { }
    add(u: Vec2): Vec2 { return new Vec2(this.x + u.x, this.y + u.y) }
    subtract(u: Vec2): Vec2 { return new Vec2(this.x - u.x, this.y - u.y) }
    scale(s: number): Vec2 { return new Vec2(s*this.x, s*this.y); }
    length(): number { return Math.sqrt(this.x*this.x + this.y*this.y); }
    lengthSquared(): number { return this.x*this.x + this.y*this.y; }
    normalize(): Vec2 {
        const length: number = this.length();
        return new Vec2(this.x / length, this.y / length);
    }
}