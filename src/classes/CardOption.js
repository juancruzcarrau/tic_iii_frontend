import CardService from "../services/CardService";

class CardOption {

    constructor(name, action) {
        this.name = name;
        this.action = action
    }

}

const cardOptions = [
    new CardOption("Delete", (cardId) => {
        CardService.deleteCard(cardId)
    })
]

export {CardOption, cardOptions}