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
      <el-tabs v-model="active" tab-position="left" @tab-click="changeTab()">
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
            <!-- <el-input v-model="form.goods_cat"></el-input> -->
            <!-- 配置表单数据  级联选择器  -->
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              :props="defaultProp"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <!-- 复选框组 -->
        <el-tab-pane name="2" label="商品参数">
          <el-form-item label="写死一个">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

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
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        prices: [],
        attrs: []
      },
      // 级联选择器数据
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 复选框组数据
      checkList: [],
      arrDy: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 点击tab触发
    async changeTab() {
      // 点第二个
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          // 如果是三级分类
          this.$message.error("请先选择三级分类");
          return;
        }
        // 获取动态参数数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
        }
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res)
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    },
    handleChange() {}
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
  height: 100%;
}
.form {
  height: 350px;
  overflow: auto;
}
</style>
