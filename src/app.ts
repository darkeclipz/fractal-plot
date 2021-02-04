import { FractalPlot, Node } from './fractal-plot'
import { BillOfMaterial, Generator } from './model';

class App {
    constructor() {
        const plot = new FractalPlot("canvas"); 
        const bom = Generator.RandomBOM(10, 1, 3);

        const recursivePlotFiller = (bomNode: BillOfMaterial, plotParentNode: Node) => {
            for(let child of bomNode.children) {
                const plotChildNode = plotParentNode.addNode(child.item.code);
                recursivePlotFiller(child, plotChildNode);
            }
        }

        recursivePlotFiller(bom, plot.root);
        plot.draw();

        console.log('plot', plot);
        console.log('bom', bom);
    }
}

document.addEventListener("DOMContentLoaded", (e) => new App());