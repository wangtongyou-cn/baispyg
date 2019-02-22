<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="分类参数"></cus-bread>

    <el-alert title="注意:只允许为第三级分类设置参数" type="info" center show-icon class="elalert"></el-alert>
    <el-form :model="form" label-position="top" label-width="80px" class="form">
      <el-form-item label="商品名称">
        <el-cascader
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
      // 级联选择器数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      }
    };
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
