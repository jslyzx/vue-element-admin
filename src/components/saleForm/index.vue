<template>
  <div>
    <el-card class="cardBody">
      <div class="outBox">
        <div class="selectBox" v-if="quickShow">
          <div ref="year" data-time="1" :class="{ 'active': ruleForm.queryType == '1' }" @click="changeTime">
            当年
          </div>
          <div ref="quarter" data-time="2" :class="{ 'active': ruleForm.queryType == '2' }" @click="changeTime">
            本季度
          </div>
          <div ref="month" data-time="3" :class="{ 'active': ruleForm.queryType == '3' }" @click="changeTime">
            本月
          </div>
        </div>
        <div class="inputBox">
          <el-form ref="ruleForm" :model="ruleForm" :inline="true" status-icon 
            label-width="100px">
            <el-form-item label="年份" >
              <el-date-picker v-model="ruleForm.year" value-format="yyyy" type="year" placeholder="选择年"
                class="selectRegion" />
            </el-form-item>
            <el-form-item label="开始月份">
              <el-date-picker v-model="ruleForm.startMonth" popper-class="monthStyle" type="month" placeholder="选择开始日期"
                :picker-options="pickerOptions" value-format="M" format="M月" class="selectRegion" />
            </el-form-item>
            <el-form-item label="截止月份">
              <el-date-picker v-model="ruleForm.endMonth" popper-class="monthStyle" type="month" placeholder="选择结束日期"
                :picker-options="pickerOptions1" value-format="M" format="M月" class="selectRegion" />
            </el-form-item>
            <el-form-item label="商品">
              <!-- <el-cascader v-model="ruleForm.productId" class="selectRegion" :options="options" @change="handleChange" /> -->
              <el-input v-model="inputText" disabled></el-input>
            </el-form-item>
            <el-form-item label="大区" v-if="regionShow">
              <el-select v-model="ruleForm.regionId" placeholder="请选择" @change="changeRegion" :disabled="!!regionId">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="片区" v-if="regionShow">
              <el-select v-model="ruleForm.sectionId" placeholder="请选择" @change="changeRegion2" :disabled="!!sectionId">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="省区" v-if="regionShow">
              <el-select v-model="ruleForm.provinceId" placeholder="请选择" @change="changeRegion3"
                :disabled="!!provinceId">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="门店" v-if="regionShow">
              <el-select v-model="ruleForm.shopId" placeholder="请选择">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="utilsShow == 1" label="医院">
              <el-select v-model="ruleForm.hospital" placeholder="请选择">
                <!-- <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" /> -->
              </el-select>
            </el-form-item>
            <el-form-item class="lastForm" style="float: right;">
              <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { queryProvinceSalePriceRate, queryArea, queryShop, submitTop } from "@/api/sales"
import { emit } from "process"
export default {
  name: 'SaleForm',
  // watch: {
  //     'ruleForm.startMonth'(val) {
  //       this.ruleForm.startMonth= '2022-' + val;
  //     },
  //     'ruleForm.endMonth'(val) {
  //       this.ruleForm.endtMonth= '2022-' + val;
  //     }
  // },
  props: {
    ruleForm: {
      type: Object,
      default: {
        queryType: 1
      }
    },
    utilsShow: {
      default: ''
    },
    regionShow: {
      type: Boolean,
      default: true
    },
    quickShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputText: '拓益',
      radio1: '',
      rules: {
          year: [
          {required:true,trigger:'change', message: '请输入活动名称',}
          ],
      },
      options: [],
      options1: [],
      options2: [],
      options3: [],
      options4: []
    }
  },
  mounted() {
    this.queryData2();
    if (this.regionId) {
      this.ruleForm.regionId = this.regionId
      if(this.regionShow){
        this.changeRegion(this.regionId)
      }
    }
    if (this.sectionId) {
      this.ruleForm.sectionId = this.sectionId
      if(this.regionShow){
        this.changeRegion2(this.sectionId)
      }
    }
    if (this.provinceId) {
      this.ruleForm.provinceId = this.provinceId
    }
  },
  computed: {
    ...mapGetters([
      'regionId',
      'sectionId',
      'provinceId'
    ]),
    pickerOptions() {
      const that = this
      return {
        disabledDate(time) {
          if (that.ruleForm.startMonth && that.ruleForm.startMonth !== '') {
            return time.getTime() > new Date(that.ruleForm.startMonth).getTime()
          }
        }
      }
    },
    pickerOptions1() {
      const that = this
      return {
        disabledDate(time) {
          if (that.ruleForm.endMonth && that.ruleForm.endMonth !== '') {
            return (time.getTime() + 3600 * 1000 * 24) < new Date(that.ruleForm.endTime).getTime()
          }
        }
      }
    }
  },
  methods: {
    async changeRegion3(id) {
      this.ruleForm.shopId = '';
      this.options4 = [];
      let res = await queryShop({ regionId: this.ruleForm.regionId + '', page: 1, pageSize: 100, sectionId: this.ruleForm.sectionId + '', provinceId: id + '' });
      if (res.code == 0) {
        this.options4 = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    async changeRegion2(id) {
      this.ruleForm.provinceId = "";
      this.ruleForm.shopId = "";
      this.options3 = [];
      this.options4 = [];
      let res = await this.queryArea1(id + '');
      if (res.code == 0) {
        this.options3 = res.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    async changeRegion(id) {
      this.ruleForm.sectionId = "";
      this.ruleForm.provinceId = "";
      this.ruleForm.shopId = "";
      this.option2 = [];
      this.options3 = [];
      this.options4 = [];
      let res = await this.queryArea1(id + '');
      if (res.code == 0) {
        this.options2 = res.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    async queryData2() {
      let res = await this.queryArea1('91498336854474752');
      this.options1 = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    async queryArea1(id) {
      let res = await queryArea(id + '');
      return res;
    },
    handleChange() {

    },
    submitForm() {
      if(!this.ruleForm.year){
        this.$message.error('请选择年份');
      }else{
        let form = JSON.parse(JSON.stringify(this.ruleForm));
          delete form.queryType;
          this.$emit("changeForm", form);
      }
    },
    changeTime(e) {
      this.ruleForm.queryType = e.target.dataset.time
      let form = { queryType: this.ruleForm.queryType }
      this.resetForm();
      if (this.regionId) {
        form.regionId = this.regionId
      }
      if (this.sectionId) {
        form.sectionId = this.sectionId
      }
      if (this.provinceId) {
        form.provinceId = this.provinceId
      }
      this.$emit("queryProvinceSalePrice", form)
    },
    resetForm() {
      this.ruleForm.year = "";
      this.ruleForm.startMonth = '';
      this.ruleForm.endMonth = '';
    },
  }
}

</script>
<style lang="scss" scoped>
.cardBody {

  .el-select,
  .el-input {
    width: 220px;
  }

  .outBox {
    display: flex;
    flex-flow: wrap nowrap;

    .selectBox {
      div {
        width: 83px;
        margin: 0 0 10px 0;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(229, 229, 229, 1);
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        color: rgba(166, 166, 166, 1);
        text-align: center;
        vertical-align: center;
        line-height: 20px;
        cursor: pointer;
      }

      div:last-child {
        margin: 0;
      }
    }

    .mode {
      margin-left: 18px;
    }

    .lastForm {
      margin-left: 23px;
    }

    .active {
      background: #ECF5FFFF !important;
      color: #3CA0FFFF !important;
    }

    // .selectRegion{
    //     width: 50px;
    // }

  }

}
</style>
<style lang="scss">
.monthStyle {
  .el-date-picker__header--bordered {
    display: none !important;
  }
}

.el-form-item {
  margin-bottom: 10px;
}

.el-card__body {
  padding: 10px 24px 10px 24px;
}
</style>
