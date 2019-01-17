/**
 * @this {Block}
 * @constructor
 * @property {String} name - Имя блока
 * @property {Object} elems - Элементы блока
 * @property {Object} mods - Объект атрибутов формата {mod: value}
 * @return {Block} block
 */

class Block {
    constructor(name, parent, tag, attributes) {
        if (!parent || !tag) {
            console.log("Unknown tag or parent"); // обработать нормально ошибки
        };

        this.HTMLElement = document.createElement(tag);
        // задаю через mods
        // if (attributes) {
        //     Object.entries(attributes).forEach( (item) => this.HTMLElement.setAttribute(item[0], item[1]))
        // };

        parent.appendChild(this.HTMLElement);

        this.name = name;
    };

    addElem(elem) {
        this.elems = this.elems || {};
        if (elem instanceof Block) {
            elem.nameElem = this.name + '__' + elem.name;
            this.elems['blocks'] = this.elems['blocks'] || [];
            this.elems['blocks'].push(elem);
        }
        else
            this.elems['name'] = this.name + "__" + elem;
    }

    addMod(name, value, elem) { // value - '_yes' for example
        this.mods = this.mods || {};
        let modValue;
        if (!value) {
            modValue = this.name + "_" + name;
            this.mods[name] = true;
        }
        else if(value && !elem) {
            modValue = this.name + "_" + name + "_" + value;
            console.log(modValue);
            this.mods[name] = modValue;
        }
        else if (elem) {
            modValue = this.name + "__" + elem + "_" + name + "_" + value;
            this.mods[name] = modValue;
        }
        console.log(modValue);
        this.HTMLElement.setAttribute('class', modValue);
    }
};
