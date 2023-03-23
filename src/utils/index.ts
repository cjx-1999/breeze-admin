// Parse the time to string
export const parseTime = (
    time?: object | string | number | null,
    cFormat?: string
): string | null => {
    if (time === undefined || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date: Date
    if (typeof time === 'object') {
        date = time as Date
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(/-/gm, '/')
            }
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj: { [key: string]: number } = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return timeStr
}

// Format and filter json data using filterKeys array
/**
 * 
 * @param filterKeys any
 * @param jsonData any
 * @returns underfined
 * 表格数据格式化处理
 */
export const formatJson = (filterKeys: any, jsonData: any) =>
    jsonData.map((data: any) => filterKeys.map((key: string) => {
        if (key === 'timestamp') {
            return parseTime(data[key])
        } else {
            return data[key]
        }
    }))

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
    return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
    if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
    if (hasClass(ele, className)) {
        const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
    if (!ele || !className) {
        return
    }
    let classString = ele.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    ele.className = classString
}

/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */

export function debounce(this: any, func: Function, delay: number, immediate = false) {
    let timer: number | undefined,
        context = this;
    return (...args: any) => {
        if (immediate) {
            func.apply(context, args);
            immediate = false;
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

/**
 * 高德地图api包
 */
import AMapLoader from "@amap/amap-jsapi-loader";
/**
 *  通过高德获取geoJson
 *  @param {string} abcode     行政区code
 *  @param {string} geoJson    上一次获取的geoJson数据
 *  @return {}
 * GeoJSON是一种用于编码各种地理数据结构的数据。GeoJSON对象可以表示几何、特征或特征集合。
 * GeoJSON支持以下几何类型：
 *     点（Point）、线（LineString）、面（Polygon）、多点（MultiPoint）、多线（MultiLineString）、
 *     多面（MultiPolygon）和几何集合（GeometryCollection）
 *     。GeoJSON中的功能包含几何对象和其他属性，特征集合表示一系列特性。
 * 
 */

export async function getGeoJson(adcode: any, geoJson: any = []) {
    await AMapLoader.load({
        key: '627a453635c2cbf422e9d2802741afaa',
        version: '1.4.15',
        AMapUI: {
            plugins: ['geo/DistrictExplorer'] // 这是关键插件
        }
    })
    return new Promise((resolve, reject) => {
        AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer: new () => any) => {
            var districtExplorer = new DistrictExplorer();
            districtExplorer.loadAreaNode(adcode, function (error: any, areaNode: { getSubFeatures: () => any }) {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                let Json = areaNode.getSubFeatures();
                let mapJson = {
                    features: [],
                };
                if (Json.length === 0) {
                    Json = geoJson.features.filter(
                        (item: { properties: { adcode: any } }) => item.properties.adcode == adcode
                    );
                }
                mapJson.features = Json;
                resolve(mapJson);
            });
        });
    });
}

/**
 *  通过高德获取地图信息
 *  @param {string} abcode  行政区code
 *  @return {}
 */

export async function getMapInfo(abcode: string): Promise<any[]> {
    let AMap = await AMapLoader.load({
        key: '627a453635c2cbf422e9d2802741afaa',//api服务key--另外需要在public中使用安全密钥！！！
        version: '1.4.15',// 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.DistrictSearch']// 需要使用的的插件列表
    })
    var districtSearch = new AMap.DistrictSearch()
    return new Promise((resolve, reject) => {
        districtSearch.search(abcode, function (status: string, result: { districtList: any[] }) {
            if (status != "complete") {
                reject(new Error("获取地图数据失败"));
                return;
            }
            const data = result.districtList[0];
            if (
                (data.level === "district" &&
                    data.districtList[0].level === "street") ||
                !data.districtList
            ) {
                resolve([data]);
            }
            resolve(data.districtList);
        });
    });
}


