import { BlessingFlip } from "./blessing-flip.schema";
import { CurrencyService } from "src/currency/currency.service";
import { BlessingFlipService } from "./blessing-flip.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlessingFlipDefaultData {
    constructor(
        private readonly currencyService: CurrencyService,
        private readonly blessingFlipService: BlessingFlipService
    ) { }

    private blessingList: BlessingFlip[] = [];

    private xophData = [
        {
            itemName: "Xoph's Inception",
            resultedItemName: "Xoph's Nurture"
        },
        {
            itemName: "The Formless Flame",
            resultedItemName: "The Formless Inferno"
        },
        {
            itemName: "Xoph's Heart",
            resultedItemName: "Xoph's Blood"
        }
    ];

    private tulData = [
        {
            itemName: "Tulborn",
            resultedItemName: "Tulfall"
        },
        {
            itemName: "The Snowblind Grace",
            resultedItemName: "The Perfect Form"
        },
        {
            itemName: "The Halcyon",
            resultedItemName: "The Pandemonius"
        }
    ]

    private eshData = [
        {
            itemName: "Hand of Thought and Motion",
            resultedItemName: "Hand of Wisdom and Action"
        },
        {
            itemName: "Esh's Mirror",
            resultedItemName: "Esh's Visage"
        },
        {
            itemName: "Voice of the Storm",
            resultedItemName: "Choir of the Storm"
        }
    ]

    private uulNetolData = [
        {
            itemName: "Uul-Netol's Kiss",
            resultedItemName: "Uul-Netol's Embrace"
        },
        {
            itemName: "The Anticipation",
            resultedItemName: "The Surrender"
        },
        {
            itemName: "The Infinite Pursuit",
            resultedItemName: "The Red Trail"
        }
    ]

    private chayulaData = [
        {
            itemName: "Skin of the Loyal",
            resultedItemName: "Skin of the Lords"
        },
        {
            itemName: "Eye of Chayula",
            resultedItemName: "Presence of Chayula"
        },
        {
            itemName: "The Red Dream",
            resultedItemName: "The Red Nightmare"
        },
        {
            itemName: "The Green Dream",
            resultedItemName: "The Green Nightmare"
        },
        {
            itemName: "The Blue Dream",
            resultedItemName: "The Blue Nightmare"
        }
    ]

    async generateData(): Promise<BlessingFlip[]> {
        await this.generateBlesingFlips('xoph');
        await this.generateBlesingFlips('tul');
        await this.generateBlesingFlips('esh');
        await this.generateBlesingFlips('uul-netol');
        await this.generateBlesingFlips('chayula');

        return await this.blessingFlipService.insertMany(this.blessingList);
    }

    private async generateBlesingFlips(blessingName: string): Promise<void> {
        const blessing = await this.currencyService.findOneByName(`blessing of ${blessingName}`);
        const itemCombinations = blessingName == "uul-netol" ? this.uulNetolData : this[blessingName + "Data"];

        for (const itemCombination of itemCombinations) {
            let blessingFlip: BlessingFlip = {
                blessing: blessing.name,
                itemName: itemCombination.itemName,
                itemPrice: 0,
                resultedItemName: itemCombination.resultedItemName,
                resultedItemPrice: 0
            }

            this.blessingList.push(blessingFlip);
        }
    }
}