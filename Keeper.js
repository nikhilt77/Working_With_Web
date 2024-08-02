function cleaned() {
    alert("Cleaning done");
}

function tip() {
    alert("Tip me big");
}

class Keeper {
    constructor(name, age, permit, languages) {
        this.name = name;
        this.age = age;
        this.hasWorkPermit = permit;
        this.languages = languages;
    }

    clean() {
        alert("Cleaning in progress!");
        cleaned();
        tip();
    }

    introduce() {
        alert(`Hello, my name is ${this.name}. I am ${this.age} years old.`);
    }

    listLanguages() {
        alert(`I can speak the following languages: ${this.languages.join(', ')}`);
    }

    workPermitStatus() {
        alert(`Work permit status: ${this.hasWorkPermit ? 'Valid' : 'Invalid'}`);
    }
}

const keeper1 = new Keeper("Nikhil", 15, true, ["English", "Spanish"]);

keeper1.clean();
keeper1.introduce();
keeper1.listLanguages();
keeper1.workPermitStatus();
