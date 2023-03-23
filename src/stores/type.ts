import type { Role } from '@/pages/system/role/type';

export interface UserInfo {
    id: string;
    username: string;
    password: string;
    phone: string;
    create_time: string;
    roles?: Role[],
    menus?: Menu[] | []
}

export interface MapInfo {
    cityName: string,
    code: string
}

export interface Menu {
    menuname: string;
    path: string;
    pid: string;
    pMenuname: string;
    icon?: string;
    id: string;
    create_time: Date
    children?: Menu[] | []
}

export interface tabs {
    routerPath: string,
    title: string
}

export interface ChinaTotal {
    heal: number;
    importedCase: number;
    localConfirmH5: number;
    deadAdd: number;
    highRiskAreaNum: number;
    nowConfirm: number;
    mRiskTime: string;
    dead: number;
    mtime: string;
    noInfect: number;
    showlocalinfeciton: number;
    noInfectH5: number;
    local_acc_confirm: number;
    localWzzAdd: number;
    localConfirmAdd: number;
    mediumRiskAreaNum: number;
    confirm: number;
    suspect: number;
    nowSevere: number;
    showLocalConfirm: number;
    confirmAdd: number;
    nowLocalWzz: number;
    localConfirm: number;
}

export interface ChinaAdd {
    nowSevere: number;
    noInfect: number;
    localConfirm: number;
    noInfectH5: number;
    confirm: number;
    heal: number;
    dead: number;
    nowConfirm: number;
    suspect: number;
    importedCase: number;
    localConfirmH5: number;
}

export interface ShowAddSwitch {
    all: boolean;
    suspect: boolean;
    importedCase: boolean;
    localConfirm: boolean;
    localinfeciton: boolean;
    confirm: boolean;
    dead: boolean;
    heal: boolean;
    nowConfirm: boolean;
    nowSevere: boolean;
    noInfect: boolean;
}

export interface Total {
    showRate: boolean;
    heal: number;
    highRiskAreaNum: number;
    continueDayZeroLocalConfirmAdd: number;
    nowConfirm: number;
    confirm: number;
    dead: number;
    showHeal: boolean;
    wzz: number;
    provinceLocalConfirm: number;
    mtime: string;
    mediumRiskAreaNum: number;
    continueDayZeroLocalConfirm: number;
    adcode: string;
}

export interface Today {
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: number;
    local_confirm_add: number;
    abroad_confirm_add: number;
    dead_add: number;
    confirm: number;
}

export interface Total {
    highRiskAreaNum: number;
    continueDayZeroConfirmAdd: number;
    continueDayZeroLocalConfirmAdd: number;
    adcode: string;
    dead: number;
    heal: number;
    wzz: number;
    provinceLocalConfirm: number;
    continueDayZeroConfirm: number;
    showRate: boolean;
    nowConfirm: number;
    showHeal: boolean;
    mediumRiskAreaNum: number;
    mtime: string;
    confirm: number;
}

export interface Today {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    wzz_add: number;
    local_confirm_add: number;
}

export interface Total {
    highRiskAreaNum: number;
    nowConfirm: number;
    dead: number;
    showRate: boolean;
    showHeal: boolean;
    wzz: number;
    continueDayZeroLocalConfirmAdd: number;
    continueDayZeroLocalConfirm: number;
    confirm: number;
    provinceLocalConfirm: number;
    mediumRiskAreaNum: number;
    mtime: string;
    adcode: string;
    heal: number;
}


export interface Children {
    date: string;
    today: Today;
    total: Total;
    name: string;
    adcode: string;
}

export interface Children {
    date: string;
    today: Today;
    total: Total;
    children: Children[];
    name: string;
    adcode: string;
}

export interface Today {
    confirm: number;
    isUpdated: boolean;
}

export interface AreaTree {
    total: Total;
    children: Children[];
    name: string;
    today: Today;
}

export interface Diseaseh5Shelf {
    lastUpdateTime: string;
    chinaTotal: ChinaTotal;
    chinaAdd: ChinaAdd;
    isShowAdd: boolean;
    showAddSwitch: ShowAddSwitch;
    areaTree: AreaTree[];
}

export interface LocalCityNCOVDataList {
    adcode: string;
    isUpdated: boolean;
    mtime: string;
    isSpecialCity: boolean;
    province: string;
    city: string;
    date: string;
    local_confirm_add: number;
    local_wzz_add: string;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
}

export interface RootObject {
    diseaseh5Shelf: Diseaseh5Shelf;
    localCityNCOVDataList: LocalCityNCOVDataList[];
}

export interface ChinaTotal {
    heal: number;
    importedCase: number;
    localConfirmH5: number;
    deadAdd: number;
    highRiskAreaNum: number;
    nowConfirm: number;
    mRiskTime: string;
    dead: number;
    mtime: string;
    noInfect: number;
    showlocalinfeciton: number;
    noInfectH5: number;
    local_acc_confirm: number;
    localWzzAdd: number;
    localConfirmAdd: number;
    mediumRiskAreaNum: number;
    confirm: number;
    suspect: number;
    nowSevere: number;
    showLocalConfirm: number;
    confirmAdd: number;
    nowLocalWzz: number;
    localConfirm: number;
}

export interface ChinaAdd {
    nowSevere: number;
    noInfect: number;
    localConfirm: number;
    noInfectH5: number;
    confirm: number;
    heal: number;
    dead: number;
    nowConfirm: number;
    suspect: number;
    importedCase: number;
    localConfirmH5: number;
}

export interface ShowAddSwitch {
    all: boolean;
    suspect: boolean;
    importedCase: boolean;
    localConfirm: boolean;
    localinfeciton: boolean;
    confirm: boolean;
    dead: boolean;
    heal: boolean;
    nowConfirm: boolean;
    nowSevere: boolean;
    noInfect: boolean;
}

export interface Total {
    showRate: boolean;
    heal: number;
    highRiskAreaNum: number;
    continueDayZeroLocalConfirmAdd: number;
    nowConfirm: number;
    confirm: number;
    dead: number;
    showHeal: boolean;
    wzz: number;
    provinceLocalConfirm: number;
    mtime: string;
    mediumRiskAreaNum: number;
    continueDayZeroLocalConfirm: number;
    adcode: string;
}

export interface Today {
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: number;
    local_confirm_add: number;
    abroad_confirm_add: number;
    dead_add: number;
    confirm: number;
}

export interface Total {
    highRiskAreaNum: number;
    continueDayZeroConfirmAdd: number;
    continueDayZeroLocalConfirmAdd: number;
    adcode: string;
    dead: number;
    heal: number;
    wzz: number;
    provinceLocalConfirm: number;
    continueDayZeroConfirm: number;
    showRate: boolean;
    nowConfirm: number;
    showHeal: boolean;
    mediumRiskAreaNum: number;
    mtime: string;
    confirm: number;
}

export interface Today {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    wzz_add: number;
    local_confirm_add: number;
}

export interface Total {
    highRiskAreaNum: number;
    nowConfirm: number;
    dead: number;
    showRate: boolean;
    showHeal: boolean;
    wzz: number;
    continueDayZeroLocalConfirmAdd: number;
    continueDayZeroLocalConfirm: number;
    confirm: number;
    provinceLocalConfirm: number;
    mediumRiskAreaNum: number;
    mtime: string;
    adcode: string;
    heal: number;
}

export interface Children {
    date: string;
    today: Today;
    total: Total;
    name: string;
    adcode: string;
}

export interface Children {
    date: string;
    today: Today;
    total: Total;
    children: Children[];
    name: string;
    adcode: string;
}

export interface Today {
    confirm: number;
    isUpdated: boolean;
}

export interface AreaTree {
    total: Total;
    children: Children[];
    name: string;
    today: Today;
}

export interface Diseaseh5Shelf {
    lastUpdateTime: string;
    chinaTotal: ChinaTotal;
    chinaAdd: ChinaAdd;
    isShowAdd: boolean;
    showAddSwitch: ShowAddSwitch;
    areaTree: AreaTree[];
}

export interface LocalCityNCOVDataList {
    adcode: string;
    isUpdated: boolean;
    mtime: string;
    isSpecialCity: boolean;
    province: string;
    city: string;
    date: string;
    local_confirm_add: number;
    local_wzz_add: string;
    mediumRiskAreaNum: number;
    highRiskAreaNum: number;
}

export interface RootObject {
    diseaseh5Shelf: Diseaseh5Shelf;
    localCityNCOVDataList: LocalCityNCOVDataList[];
}