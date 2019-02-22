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

        <el-tab-pane name="2" label="商品参数">
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in arrDy" :key="item1.attr_id">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaic" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane name="4" label="商品图片">
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :headers="headers"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>

        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button @click="addgoods()">添加商品</el-button>
            <!-- 富文本 -->
            <quill-editor
            v-model="form.goods_intorduce"
            
            ></quill-editor>
          </el-form-item>
          
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
// 引入富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
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
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      },
      arrDy: [],
      checkList: [],
      arrStaic: [],
      headers: {
        Authorization:localStorage.getItem('token')
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 添加商品
    addgoods(){},
    //上传图片
    handleRemove(file,fileList) {
      console.log(file,fileList);
      file.response.data.tmp_path;
    },
    handleSuccess(response,file,fileList) {
      console.log(response);
    },

    async changeTab() {
      //   if(this.active==="3") {

      //   };

      if (this.active === "2" || this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          this.$message.error("请先选择三级分类");
          return;
        }
        // 获取静态数据
        if (this.active === "3") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          const {
            meta: { msg, status },
            data
          } = res.data;
          if (status === 200) {
            this.arrStaic = data;
            // console.log(this.arrStaic);
          }
        }
      }

      // 动态参数数据
      if (this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        //  console.log(res);

        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          this.arrDy.forEach(item => {
            //   if (item.attr_vals.leng === 0) {
            //     item.attr_vals = [];
            //   } else {
            //     item.attr_vals = item.attr_vals.trim().split(",");
            //   }
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);

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
.box {
  height: 100%;
}
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
.ql-container {
  min-height: 200px
}
</style>
