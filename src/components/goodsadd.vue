 <template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <el-alert title="添加商品信息" type="info" center show-icon class="elalert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :space="200" :active="active*1">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-form :model="form" label-position="top" label-width="80px" class="form">
      <el-tabs v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
            <el-form-item label="商品名称">
                <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
             <el-form-item label="商品价格">
                <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
                <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
             <el-form-item label="商品数量">
                <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
             <el-form-item label="商品分类">
                <el-input v-model="form.goods_cat"></el-input>
            </el-form-item> 
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
      form: {
        goods_name: '',
        goods_cat:  '',
        goods_price: '',
        goods_number:"",
        goods_weight: "",
        goods_introduce:"",
        prices: "",
        attrs: ""
      }
    };
  }
};
</script>

<style>
.search {
  margin-top: 20px;
}
.searchInput {
  width: 350px;
}
.elalert {
  margin: 20px 0;
}
.box {
  height:100%
}
.form {
  height: 350px;
  overflow: auto;
}
</style>
