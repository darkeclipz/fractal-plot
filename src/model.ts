export class Item {
    code: string;
    description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }
}

export class BillOfMaterial {
    item: Item;
    quantity: number;
    children: BillOfMaterial[] = [];
    parent: BillOfMaterial | undefined;

    constructor(item: Item, qty: number, parent: BillOfMaterial | undefined = undefined) {
        this.item = item;
        this.quantity = qty;
        this.parent = parent;
    }

    // Add a new line to the bill of material.
    addLine(item: Item, qty: number) {
        const line = new BillOfMaterial(item, qty, this);
        this.children.push(line);
        return line;
    }

    // Find an item in the bill of material (BFS).
    find(code: string) {
        let queue = [...this.children];
        while(queue.length > 0) {
            const line = queue.shift();
            if(line!.item.code === code) {
                return line;
            }
            queue = queue.concat(...line!.children);
        }
    }
}

export class Generator {
    // Generate a random bill of material with a certain depth, and a number
    // of random items.
    static RandomBOM(depth: number, minLines: number, maxLines: number) {

        const randomItem = (i: number) => new Item("Item " + i, "Randomly generated item " + i + ".");

        const recursiveGenerator = (current: BillOfMaterial, depth: number) => {
            if(depth === 0) {
                return;
            }
            let n = Math.floor(Math.random() * (maxLines - minLines)) + minLines;
            while(n > 0) {
                const item = randomItem(n);
                const line = current.addLine(item, Math.floor(Math.random() * 10 + 1))
                recursiveGenerator(line, depth - 1);
                n--;
            }
        };

        const bom = new BillOfMaterial(new Item("Root", "Root of the bill of material."), 1);
        recursiveGenerator(bom, depth);
        return bom;
    }
}