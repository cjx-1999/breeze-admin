//echart.d.ts
// 因为provide不能传递type的原因，我们将echart的option类型单独抽取出来写一个申明文件
// 1.我们引入了线图和bar图，所以这里我们引入了两者的类型
import { ComposeOption } from 'echarts/core';
import {
    BarSeriesOption,
    LineSeriesOption
} from 'echarts/charts';
//2.引入组件，也就是option选项中的类型
import {
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    // 数据集组件
    DatasetComponentOption,
} from 'echarts/components';

// 3.通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;
// 4.将这个类型暴露出去
export { ECOption }