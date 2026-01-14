interface ComponentStyle {
  top: number
  left: number
  width: number
  height: number
  rotate: number
}

interface BaseStyle {
  [key: string]: any
}

interface Component {
  component: any
  index?: number
}

type SeiresType = 'all' | 'bar' | 'strip' | 'line' | 'area' | 'pie' | 'point' | 'radar' | 'relation' | 'other'

interface ComponentTypeItem {
  name: string
  icon: any
  tabs?: {
    title: string
    type: SeiresType
    components: any[]
  }[]
  components?: AsideComponentItem[]
}

interface AsideComponentTypeItem {
  [key: string]: ComponentTypeItem
  echarts: ComponentTypeItem
  info: ComponentTypeItem
  table: ComponentTypeItem
  control: ComponentTypeItem
  like: ComponentTypeItem
}

interface ComponentItem {
  title: string
  image: string
  type: string
  tab: 'echarts' | 'info' | 'control' | 'table'
  component: string
  events: any[]
  bases: {
    width: number | string
    height: number | string
    translateX: number | string
    translateY: number | string
    rotate: number | string
    opacity: number | string
    chart?: any
    control?: any
  }
  id: string
  offsetX: number
  offsetY: number
}

interface ColumnItem {
  title: string
  dataIndex: string
  type: string
  id: number
  desc: string
  disDel: boolean
  fixed?: booleam
  placeholder?: string
}
