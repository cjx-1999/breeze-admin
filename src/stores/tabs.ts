import { defineStore } from 'pinia';
import type { tabs } from './type';

export const tabStore = defineStore('tabStore', {
    state: () => ({
        tabList: <tabs[]>[
            {
                routerPath: '/home',
                title: '首页'
            }
        ],
        currentTab: '/home',
        currentMenu: '首页'
    }),
    actions: {
        addTab(item: tabs): void {
            var json = JSON.stringify(this.tabList);
            if (json.indexOf(JSON.stringify(item)) == -1) {
                this.tabList.push(item);
                this.currentTab = item.routerPath;
            }
        },
        removeTab(routerPath: string): void {
            this.tabList = this.tabList.filter((tab) => {
                return tab.routerPath != routerPath
            })
        }
    },
    persist: {
        enabled: true  //开启缓存，默认会话存储
    }
})