import { defineStore } from "pinia";
import type { MapInfo } from "@/stores/type";

export const homeStore = defineStore('homeStore', {
    state: () => ({
        mapInfo: <MapInfo[]>[
            {
                cityName: "全国",
                code: '100000',
            },
        ],
        year: 2018,
        sum: 0,
    }),
    getters: {
        abcode(): string {
            return this.mapInfo[this.mapInfo.length - 1].code
        },
        parentInfo(): MapInfo[] {
            return this.mapInfo
        }
    },
    actions: {

        addInfo(info: MapInfo) {
            this.mapInfo.push(info);
        },
        removeInfo(index: number) {
            this.mapInfo.splice(index);
        },
        setYear(year: number) {
            this.year = year;
        },
        setSum(sum: number) {
            this.sum = sum;
        },
    }
})