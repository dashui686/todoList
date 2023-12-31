<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue/global';
const queryParam = reactive({
  content: undefined
})
</script>

<template>
    <el-container class="layout-container">
      <el-main>
        <header>
          <div>
            <h1>
              我的一天
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
          <ul>
            <li v-for="item in 100">
            {{ item }}
            <p style="font-size: 11px;">任务组</p>
            </li>
          </ul>
        </section>
        <footer>
          <el-input v-model="queryParam.content" class="addContent" placeholder="Pick a date">
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

li {
  height: 58px;
  background-color: #f6f6f6;
  margin-bottom: 2px;
  opacity: 0.95;
  transition: opacity 0.3s ease; /* 过渡效果 */
  padding:8px;
  border-radius: 5px;
}

li:hover {
  opacity: 1;
}


</style>