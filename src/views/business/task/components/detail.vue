<template>
  <div>
    <el-dialog
      width="800px"
      title="执行情况"
      :visible.sync="visible"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        label-position="left"
        label-width="100px"
        size="medium"
        >
        <el-form-item label="任务名称">
          <el-input v-model="form.name" type="text" readonly />
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="form.description" type="text" readonly />
        </el-form-item>
        <el-form-item label="执行状态">
          <el-select v-model="form.state" class="full-width-input" disabled>
            <el-option
              v-for="(item, index) in stateOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="签到时间">
          <el-input v-model="form.signTime" type="text" readonly />
        </el-form-item>
        <el-form-item label="签到位置">
          <div id="container" class="chart-part" style="height: 300px"></div>
        </el-form-item>
        <el-form-item label="签到图片">
          <el-image
            v-for="img in form.signPicArr"
            style="width: 200px; height: 200px"
            :src="img"
            :preview-src-list="form.signPicArr"
          />
        </el-form-item>
        <el-divider content-position="left">任务情况</el-divider>
        <el-card class="box-card" v-for="(item, i) in form.checkList" :key="i" style="margin-bottom: 20px;">
          <el-form-item label="检查项名称">
            <el-input v-model="item.checkName" type="text" readonly />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="item.isCompleted" class="full-width-input" disabled>
              <el-option
                v-for="(item, index) in checkOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="buttun" style="margin-left: 100px;" v-if="item.isCompleted === 1" @click="showDetail(item.id, i)">查看检查情况</el-button>
          </el-form-item>
          <el-divider content-position="left">检查项</el-divider>
          <el-form-item v-for="v in item.list" :label="v.title" label-width="200px">
            <el-radio-group v-if="v.type === 'radio'" v-model="v.value" disabled>
              <el-radio
                v-for="k in v.options"
                :label="k.value"
              >{{ k.label }}</el-radio>
            </el-radio-group>
            <el-select v-if="v.type === 'select'" v-model="v.value" class="full-width-input" disabled>
              <el-option
                v-for="(item, index) in v.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-if="v.type === 'input'" v-model="v.value" type="text" readonly />
            <el-input v-if="v.type === 'textarea'" type="textarea" v-model="v.value" readonly></el-input>
            <el-checkbox-group v-if="v.type === 'checkbox'" v-model="v.value" disabled>
              <el-checkbox
                v-for="k in v.options"
                :label="k.value"
              >{{ k.label }}</el-checkbox>
            </el-checkbox-group>
            <div v-if="v.type === 'file' && v.value.length">
              <el-image
                v-for="img in v.value"
                style="width: 100px; height: 100px"
                :src="img"
                :preview-src-list="v.value"
              />
            </div>
          </el-form-item>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { find } from '@/api/task'
import { grid, query } from '@/api/taskCheck'
import _ from 'lodash'
import img1 from '@/assets/shop_images/pic3.png'
import img2 from '@/assets/shop_images/pic4.png'
let BMap = {}
let map = {}
export default {
  name: 'detail',
  data() {
    return {
      img1,
      img2,
      map: {},
      visible: false,
      form: {

      },
      stateOptions: [{label: '待执行', value: 0},{label: '已签到', value: 1},{label: '已执行', value: 2},{label: '已取消', value: 3}],
      checkOptions: [{label: '未完成', value: 0},{label: '已完成', value: 1}]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
  },
  methods: {
    cancel() {
      this.visible = false
    },
    show(id) {
      this.detail(id)
      this.visible = true
    },
    async detail(id) {
      const res = await find({id})
      const { checkList, description, name, signPics, shopAxis, signAxis, state, signTime, shopName } = res.data
      const signPicArr = signPics.split(',')
      _.each(checkList, function(v){ v.list = [] })
      this.form = Object.assign({}, {
        name,
        description,
        checkList,
        signPicArr,
        shopAxis,
        signAxis,
        state,
        signTime,
        shopName
      })
      if(this.form.shopAxis) {
        this.initMap()
      }
    },
    async showDetail(id, i) {
      const res = await query({taskCheckId: id})
      _.each(res.data, function(v) { 
        v.options = JSON.parse(v.options)
        if(v.type === 'checkbox' || v.type === 'file') {
          if(v.value){
            v.value = v.value.split(',')
          }else {
            v.value = []
          }
        }
      })
      this.form.checkList[i].list = res.data
    },
    initMap() {
      const that = this
      var arr = this.form.shopAxis.split(',')
      BMap = window.BMap
      map = new BMap.Map('container')
      // 设置地图的中心点的坐标
      var point = new BMap.Point(parseInt(arr[0]), parseInt(arr[1]))
      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 8)
      map.enableScrollWheelZoom()
      let icon1 = new BMap.Icon(img1, new BMap.Size(24, 30))
      let icon2 = new BMap.Icon(img2, new BMap.Size(24, 30))
      var pt = null
      var marker = null
      var opts = {
        width: 250,
        height: 5,
        title: '',
        message: ''
      }
      var infoWindow = null
      // 创建点
      pt = new BMap.Point(arr[0], arr[1])
      // 创建标记
      marker = new BMap.Marker(pt, {icon: icon1})
      infoWindow = new BMap.InfoWindow(this.form.shopName, opts)

      // 添加鼠标放置事件
      marker.addEventListener('mouseover', function () { this.openInfoWindow(infoWindow) })
      map.addOverlay(marker)

      // 签到地点
      if(this.form.signAxis && this.form.signAxis.indexOf(',') > -1) {
        arr = this.form.signAxis.split(',')
        // 创建点
        pt = new BMap.Point(arr[0], arr[1])
        // 创建标记
        marker = new BMap.Marker(pt, {icon: icon2})
        infoWindow = new BMap.InfoWindow('签到地点', opts)

        // 添加鼠标放置事件
        marker.addEventListener('mouseover', function () { this.openInfoWindow(infoWindow) })
        map.addOverlay(marker)
      }
    }
  },
  filters: {
    stateFilter(state) {
      let re = ''
      switch(state){
        case 0:
          re = '待执行'
          break
        case 1:
          re = '已签到'
          break
        case 2:
          re = '已执行'
          break
        case 9:
          re = '已取消'
          break
      }
      return re
    }
  }
}
</script>

<style scoped>
.el-image ~ .el-image {
  margin-left: 20px;
}
::v-deep .BMap_bubble_title {
    color:white;
    font-size:13px;
    font-weight:bold;
    text-align:left;
    padding-left:5px;
    padding-top:5px;
    border-bottom:1px solid gray;
    background-color:#0066b3;
  }
  ::v-deep .BMap_bubble_content {
    background-color:white;
    padding-left:5px;
    padding-top:5px;
    padding-bottom:10px;
  }
  ::v-deep .BMap_pop div:nth-child(9) {
    top: 40px !important;
    border-radius:7px;
  }
  
  ::v-deep .BMap_pop img {
    top: 60px !important;
    left:250px !important;
  }
  ::v-deep .BMap_top {
    display:none;
  }
  ::v-deep .BMap_bottom {
    display:none;
  }
  ::v-deep .BMap_center {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(1) div {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(3) {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(4) {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(5) {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(6) {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(7) {
    display:none;
  }
  ::v-deep .BMap_pop div:nth-child(8) {
    display:none;
  }
</style>
