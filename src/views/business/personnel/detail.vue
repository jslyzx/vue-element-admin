<template>
  <el-container class="bcF4F6F9 p20">
    <el-header class="detail-header">
      <el-image
        style="width: 100px; height: 100px;vertical-align: top;"
        class="inlineBlock"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <div class="inlineBlock header-main">
        <el-row>
          <span class="f24 fw c4497F6 mr20 va-b">  张三</span>
          <el-tag effect="dark" class="mr10"><svg-icon icon-class="nan" class-name="pr5 f16 va-28" />男</el-tag>
          <el-tag effect="dark" class="mr10" type="success">标签二</el-tag>
          <el-tag effect="dark" class="mr10" type="info">标签三</el-tag>
        </el-row>
        <el-row class="mt20">
          <svg-icon icon-class="dianhua" class-name="pr5 f25 va-28 c4497F6" />180923823333
          <svg-icon icon-class="geren" class-name="pr5 f25 va-28 c4497F6 ml20" />区域：江苏省南京市
        </el-row>
      </div>
    </el-header>
    <el-container>
      <el-aside class="mr20 bcFFFFFF" width="500px">
        <h4>所辖药房</h4>
        <p class="lep1"> <svg-icon icon-class="yaofang" class-name="pr5 f25 va-28 c4497F6" />江苏省南京市区域江苏省南京市</p>
      </el-aside>
      <el-main class="bcFFFFFF">Ma1212in</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { find } from '@/api/salesman'
export default {
  name: 'BusinessPersonnel',
  data() {
    return {
      // 遮罩层
      loading: true,
      detail: {}
    }
  },
  async created() {
    this.id = this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      const res = await find({ id })
      this.detail = res.data
    }

  }
}
</script>

<style lang="scss" scoped>
.header-main{
  padding: 10px 0px 0 20px
}
.detail-header{
  background-color:#fff ;
  border-top: 5px solid #4497F6;
  margin-bottom: 20px;
  height: auto !important;;
  padding: 20px;
}
</style>
