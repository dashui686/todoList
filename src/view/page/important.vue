<script setup lang="ts">
import { Plus,Star,StarFilled } from '@element-plus/icons-vue/global';
// import { useTodayInfo } from '@/stores/base/today'
import { uuid } from '@/utils/random';
import { getList,saveItem,editItem } from '@/api/todoItem'
const currentId = ref('1')
const currentName = ref('今天的事儿')

onMounted(()=>{
  query()
})

const query = () =>{
  getList({isImportant:true}).then((res:anyObj)=>{
    items.value = res.data
  })
}
// const today = useTodayInfo()

const items = ref<TodoItem[]>([])
const content = ref('')

const changeBox = (id:any,status:boolean | undefined) =>{
  editItem({id,isCompleted:!status}).then(res=>{
    if(res.data && !status){
      query()
    }
  })
}
const changeStar = (id:any,status:boolean | undefined) =>{
  editItem({id,isImportant:!status}).then(res=>{
    if(res.data){
      if(res.data && !status){
        query()
      }
    }
  })
}

const handleEnterKey = () =>{
  const row = <TodoItem>{
    id:uuid(),
    classificationId:currentId.value,
    content:content.value,
    classification:{
      id:currentId.value,
      classifyName:currentName.value
    }
  }
  saveItem(row).then(res=>{
    if(res.code === 200){
      row.id = res.data.id 
      items.value?.splice(0,0,row)
      content.value = ''
    }
  })

}

</script>

<template>
    <el-container class="layout-container">
      <el-main>
        <header>
          <div>
            <h1>
              {{ currentName }}
            </h1>
            <p style="color:white">
              2023-12-17 星期天
            </p>
          </div>
          <div>
            我的一天
          </div>
        </header>
        <section class="contentList">
          <TransitionGroup tag="ul" name="fade">
            <div v-for="(item) in items" :key="item.id" class="listItem">
              <div class="todoItem">
                <div>
                  <el-checkbox v-model="item.isCompleted" class="custom-checkbox" @click="changeBox(item.id,item.isCompleted)"></el-checkbox>
                </div>
                <div>
                  <p>{{ item.content }}</p>
                  <p style="font-size: 11px;">{{ item.classification?item.classification.classifyName:currentName }}</p>
                </div>
              </div>
              <div>
                <el-icon @click="changeStar(item.id,item.isImportant)"><StarFilled v-if="item.isImportant" /> <Star v-else /></el-icon>
              </div>
            </div>
          </TransitionGroup>

        </section>
        <footer>
          <el-input v-model="content" class="addContent" @keyup.enter="handleEnterKey" placeholder="Pick a date">
            <template #prefix>
              <el-icon class="el-input__icon"><Plus /></el-icon>
            </template>
          </el-input>
        </footer>
      </el-main>
    </el-container>
</template>


<style lang="scss" scoped>

.el-main{
  padding: 20px !important;
}

.el-main{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0;
}

header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1{
  font-size: 30px;
  color: white;
}

.contentList{
  overflow-y: scroll; // 隐藏滚动条
  margin: 20px 0 10px 0;
  flex-grow: 400;
}


.contentList::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.addContent{
  background-color: transparent;
  // font-size: 30px;
  height: 50px;
  width: 100%;
}

footer{
  flex-grow: 1;
  height: 50px;
}

.listItem {
  height: 58px;
  background-color: #f6f6f6;
  margin-bottom: 2px;
  opacity: 0.95;
  transition: opacity 0.3s ease; /* 过渡效果 */
  padding:8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listItem:hover {
  opacity: 1;
}

.todoItem {
  display: flex;
}


/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}

/* 自定义 Checkbox 样式 */
.custom-checkbox .el-checkbox__input .el-checkbox__inner{
  border-radius: 50% !important;
}

</style>