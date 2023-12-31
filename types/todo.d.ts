interface TodoItem {
  // id
  id: string,
  // 分类 默认任务
  classificationId?: string,
  // 内容
  content: string,
  // 是否重要
  isImportant?: boolean,
  // 是否完成 
  isCompleted?: boolean,
  // 是否是今天事项
  isToday?: boolean,
  // 提醒时间
  reminderTime?: date,
  // 到期时间
  expirationTime?: date,
  // 重复类型
  repetitiveType?: string,
  // 备注
  remark?: string,
  // 分配人
  assignor?: string,
  createBy?: string,
  updateBy?: string,
  createTime?: date,
  updateTime?: date,
  classification?: TodoClassification,
}

interface TodoClassification {
  // id
  id:string,
  // 分类名称
  classifyName: string,
  // 分类类型 分类目录/分类 M/V/D
  classifyType: string,
  // 父级ID
  parentId: string,
  // 路径
  path: string,
  // 图标
  icon: string,
  // 主题
  theme?: string,
  unDo?: number,
  createBy?: string,
  updateBy?: string,
  createTime?: date,
  updateTime?: date,
  children?: TodoItem[]
}