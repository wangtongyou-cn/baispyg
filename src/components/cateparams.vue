<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <el-alert title="注意:只允许为第三级分类商品设置参数" type="warning" show-icon class="elalert"></el-alert>
    <el-form :model="form" label-position="top" label-width="80px" class="form">
      <el-form-item label="请选择商品分类">
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      // 级联选择器数据
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      }
    };
  },
  created() {
    this.getGoodsCate()
  },
  methods: {
    handleChange() {
        console.log("级联的change触发了")
    },
    // 获取三级分类
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
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.elalert {
  margin-top: 20px;
}
</style>
