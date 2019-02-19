 <template>
    <el-card class="box">
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <!-- 搜素 -->
    <el-row class="search">
      <el-col>
        <el-input
          placeholder="请输入内容"
          class="searchInput"
          clearable
          @clear="getAllUser()"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" >添加用户</el-button>
      </el-col>
    </el-row>
    </el-card>
 </template>
<script>
export default {

}
</script>

<style>

</style>
