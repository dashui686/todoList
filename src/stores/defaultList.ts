import { uuid } from '@/utils/random'
import { defineStore } from 'pinia'

export const useDefaultMenu = defineStore('todayInfo', {
    state: (): TodoClassification[] => {
        return [
                {
                    id: uuid(),
                    classifyName:"今儿的事儿",
                    classifyType:"D",
                    path:"/today",
                    icon:"",
										parentId: "",
										unDo:10
                  },
                  {
                    id: uuid(),
                    classifyName:"重要的事儿",
                    classifyType:"D",
                    path:"/important",
                    icon:"",
										parentId: "",
										unDo:10
                  },
                  {
                    id: uuid(),
                    classifyName:"明儿的事儿",
                    classifyType:"D",
                    path:"/tomorrow",
                    icon:"",
										parentId: "",
										unDo:10
                  },
                  {
                    id: uuid(),
                    classifyName:"任务",
                    classifyType:"D",
                    path:"/all",
                    icon:"",
										parentId: "",
										unDo:10
                  },
            ]
    },
    actions: {
        
    },
    persist: {
        key: 'todayInfo',
    },
})
