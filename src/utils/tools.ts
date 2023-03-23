import type { varType } from "@/types/common";

export const changeRootVar = ((name: typeof varType, value: string): void => {
    var r = document.querySelector(":root") as HTMLElement;
    r.style.setProperty(name, value);
})

export const findRootVar = ((name: typeof varType) => {
    var r = document.querySelector(":root") as HTMLElement;
    return r.style.getPropertyValue(name)
})
//元素聚焦
export function elFocus(name: string) {
    const el = document.getElementById(name) as HTMLElement;
    el.focus();
}
//元素失去焦点
export function elBlur(name: string) {
    const el = document.getElementById(name) as HTMLElement;
    el.blur();
}



