<script setup lang="ts">
import { Search,Plus,Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useDefaultMenu } from '@/stores/defaultList';
defineProps<{ msg: string }>()

const router = useRouter()
const state = ref('')




// 查询
const loadAll = () => {
  return []
}
interface LinkItem {
  value: string
  link: string
}
const links = ref<LinkItem[]>([])

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

const handleIconClick = (ev: Event) => {
  console.log(ev)
}

// 查询


// 菜单
const defaultMenu = useDefaultMenu()
const defaultMenus = ref<TodoClassification[]>(defaultMenu.$state)
const menu = ref<anyObj[]>([])
const defaultActive = ref(defaultMenus.value[0].path)
const menuDefaultActive = ref(defaultMenus.value[0].path)
const handleMenuSelect = (index:string) => {
  router.push(index);
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 菜单
const addItem = () =>{
  const row =  {
    id: 1,
    title:"今儿的事儿",
    path:"",
    icon:"",
    name:"Today",
    component:"",
  };
  menu.value.push(row)
}

const addClassify = () =>{
  
}
onMounted(() => {
  links.value = loadAll()
})
</script>

<template>
	<el-container class="layout-container">
	  <el-aside class="content-sidebar">
      <div class="sidebar-heder">
        <el-autocomplete
              v-model="state"
              clearable
              style="display: block;"
              :fetch-suggestions="querySearchAsync"
              placeholder="搜索"
              @select="handleSelect"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="handleIconClick">
                <Search />
              </el-icon>
            </template>
            <template #default="{ item }">
              <div class="value">{{ item.value }}</div>
              <span class="link">{{ item.link }}</span>
            </template>
        </el-autocomplete>
      </div>
      <div class="sidebar-middle">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item v-for="item in defaultMenus" :index="item.path" :key="item.id">
            
            <!-- <menu-item :title="item" /> -->
            <!-- <el-icon v-if="item.icon"><icon-menu /></el-icon>  -->
            <span>{{ item.classifyName }}</span>
            <span v-if="item.unDo && item.unDo > 0" style="border-radius: 50%;background-color: #c4c4c4;height: 20px;line-height: 12px;font-size: 10px;padding: 4px;float: left;">{{ item.unDo }}</span>
          </el-menu-item>

        </el-menu>
        <el-divider border-style="double" />
        <el-menu
          :default-active="menuDefaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item v-for="item in menu" :index="item.name" :key="item.id">
            <menu-item :title="item.title" />
            <!-- <el-icon v-if="item.icon"><icon-menu /></el-icon>  -->
            <span>{{ item.title }}</span>
          </el-menu-item>

        </el-menu>
      </div>
      <div class="sidebar-floor">
        <el-row>
          <el-col :span="20" class="add-item">
            <el-button
              link
              :icon="Plus"
              @click="addItem"
            >找点事儿</el-button>
          </el-col>
          <el-col :span="4" class="add-classify">
            <el-button
              link
              :icon="Edit"
              @click="addClassify"
            />
          </el-col>
        </el-row>
      </div>


    </el-aside>
	  <el-main class="content-wrapper">
      <!-- 路由视图 -->
      <router-view></router-view>
    </el-main>
	</el-container>
</template>

<style scoped>

.content-wrapper {
	width: 100%;
	height: 100%;
	/* border-radius: 10px; */
   /* 左上角和左下角设置为 10px 圆角 */
   border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #5f73c2;
}

.content-sidebar{
  display: flex;
  align-items: stretch;
  width: 300px;
  background-color: #f3f3f3;
  padding: 10px;
  flex-direction: column;
}

.el-aside,.el-main{
  height: 100vh;
}

.el-menu {
  border: none;
  background-color: #f3f3f3;
}
/* 修改菜单项的背景颜色 */
.el-menu-item {
  justify-content: space-between;
  background-color: #f3f3f3;
}


/* 修改菜单项被选中时的背景颜色 */
.el-menu-item.is-active, .el-submenu.is-active {
  background-color: #eaeaea;
}

/* 修改菜单项被选中时的文字颜色 */
.el-menu-item.is-active span, .el-submenu.is-active .el-submenu__title {
  color: black;
}

/* 修改选中菜单项图标的颜色 */
.el-menu-item.is-active .el-icon,
.el-submenu.is-active .el-icon {
  color: black;
}
.el-menu-item.is-active{
  color: black;
}

/* 创建左边框 */
.el-menu-item::before, .el-submenu::before {
  content: '';
  position: absolute;
  left: 0; /* 使左边框居中 */
  top: 25%; /* 使左边框垂直居中 */
  transform: translateX(-50%); /* 通过transform属性调整水平位置 */
  height: 50%; /* 设置高度为总高度的百分之五十 */
  width: 4px; /* 左边框的宽度 */
  background-color: transparent; /* 初始颜色，可以设置为透明 */
  transition: background-color 0.3s ease; /* 过渡效果 */
}


/* 修改选中项左边框的颜色 */
.el-menu-item.is-active::before, .el-submenu.is-active::before {
  background-color: #005fb8;
}

.el-divider--horizontal{
  margin: 6px 0;
}

.el-menu-item{
  height: 40px;
  margin-top: 5px;
  transition: background-color 1s ease;
}

.el-menu-item:hover{
  background-color: #eaeaea;
}

.el-autocomplete{
  display: none !important;
}
.sidebar-heder,.sidebar-middle,.sidebar-floor{
  width: 100% !important;
}

.add-item,.add-classify{
  cursor: default;
  padding: 10px 0;
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.add-item:hover,.add-classify:hover{
  background-color: #eaeaea;
}
/* 修改菜单项文字颜色 */
/* .el-menu-item span {
  color: #your-text-color;
} */

.el-main{
    padding: 0 !important;
}

</style>
