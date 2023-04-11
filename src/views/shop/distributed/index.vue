<template>
  <div class="body">
    <div class="inner">
      <div class="head clearfix">
        <div class="title fl">授权药房分布</div>
        <div class="fr">
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="总数"></el-radio-button>
            <el-radio-button label="DTP药房"></el-radio-button>
            <el-radio-button label="关联药房"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div id="container" class="chart-part" style="height: calc(100% - 40px)" />
      </div>
  </div>
</template>
<script>
import { grid } from '@/api/shop'
import _ from 'lodash'
import img1 from '@/assets/shop_images/pic1.png'
import img2 from '@/assets/shop_images/pic2.png'
let BMap = {}
let map = {}
export default {
  name: 'ShopDistributed',
  data() {
    return {
      img1,
      type: '总数',
      map: {},
      shopArr: []
    }
  },
  created() {
    const that = this
    // setTimeout(() => {
    //   that.initMap()
    // }, 2000)
    this.getShopList()
  },
  methods: {
    async getShopList() {
      const res = await grid({
        page: 1,
        pageSize: 100
      })
      let arr = res.data.data
      arr = _.filter(arr, function(v){return !!v.axis})
      let tmp = []
      this.shopArr = _.map(arr, function(v){
        tmp = v.axis.split(',')
        return {
          name: v.name,
          longitude: tmp[0],
          latitude: tmp[1],
          isDtp: v.isDtp === 1 ? true : false
        }
      })
    },
    initMap() {
      const that = this
      BMap = window.BMap
      map = new BMap.Map('container')
      // 设置地图的中心点的坐标
      var point = new BMap.Point(105, 38)
      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 5)
      map.enableScrollWheelZoom()

      this.initMarks()

      var geoc = new BMap.Geocoder()
      // 省份层级
      var province
      // 市区层级
      var city
      // 区县层级
      var district
      map.addEventListener('click', function (e) {
        console.log(e.point)
        var pt = e.point
        console.log(pt)
        geoc.getLocation(pt, function (res) {
          province = res.addressComponents.province
          city = res.addressComponents.city
          district = res.addressComponents.district
          console.log('district', district)
          // 获取当前页面地图层级
          var zoom = map.getZoom()
          console.log('zoom', zoom)
          // 判断地图层级，并进入相对应的绘画行政区域的方法
          if (zoom == 5) {
            that.provinceArea(province)
          } else if (zoom == 7) {
            that.cityArea(city)
          } else if (zoom == 9) {
            that.districtArea(district)
          }
        })
      })
    },
    initMarks() {
      var markers1 = [] //dtp药房
      var markers2 = [] //关联药房
      let icon1 = new BMap.Icon(img1, new BMap.Size(24, 30))
      let icon2 = new BMap.Icon(img2, new BMap.Size(24, 30))
      // 输入经纬度和名称，标记
      function bindPoint(longti, lati, name, isDtp) {
        // map.clearOverlays();//清空原来的标注

        var pt = null
        // 创建点
        pt = new BMap.Point(longti, lati)
        // 创建标记
        var marker = new BMap.Marker(pt, {icon: isDtp ? icon1 : icon2})
        // 定义文本内容
        var opts = {
          width: 250,
          height: 5,
          title: '',
          message: ''
        }
        // 添加显示文本
        var infoWindow = new BMap.InfoWindow(name, opts)

        // 添加鼠标放置事件
        marker.addEventListener('mouseover', function () { this.openInfoWindow(infoWindow) })
        // 添加点击事件
        // marker.addEventListener('click', function () { alert(name) })
        // 将标记放入标记数组
        if (isDtp) {
          markers1.push(marker)
        } else {
          markers2.push(marker)
        }
      }
      this.shopArr.forEach(item => {
        bindPoint(item.longitude, item.latitude, item.name, item.isDtp)
      })
      // 调用API聚合函数将标记数组显示在地图上
      var markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers1 })
      var markerClusterer1 = new BMapLib.MarkerClusterer(map, { markers: markers2 })
    },
    provinceArea(cityName) {
      var bdary = new BMap.Boundary()
      bdary.get(cityName, function (rs) { // 获取行政区域
        map.clearOverlays() // 清除地图覆盖物
        // 思路：利用行政区划点的集合与外围自定义东南西北形成一个环形遮罩层
        // 1.获取选中行政区划边框点的集合rs.boundaries[0]
        var list = rs.boundaries
        var num = ''
        var max = list[0]
        for (var i = 1; i < list.length; i++) {
          if (list[i].length > max.length) {
            max = list[i]
          }
        }
        var strs = new Array()
        strs = max.split(';')
        var ENWS = ''
        for (var i = 0; i < strs.length; i++) {
          ENWS += strs[i] + ';'
        }
        // 2.自定义外围边框点的集合
        var E_JW = '170.672126, 39.623555;' // 东
        var EN_JW = '170.672126, 81.291804;' // 东北角
        var N_JW = '105.913641, 81.291804;' // 北
        var NW_JW = '-169.604276,  81.291804;' // 西北角
        var W_JW = '-169.604276, 38.244136;' // 西
        var WS_JW = '-169.604276, -68.045308;' // 西南角
        var S_JW = '114.15563, -68.045308;' // 南
        var SE_JW = '170.672126, -68.045308 ;' // 东南角
        // 3.添加环形遮罩层
        var ply1 = new BMap.Polygon(ENWS + E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + N_JW + EN_JW + E_JW, {
          strokeColor: 'none',
          strokeOpacity: 0,
          fillColor: '#00ffff',
          strokeOpacity: 0.5,
          fillOpacity: '1'
        }) // 建立多边形覆盖物
        console.log(ply1)
        map.addOverlay(ply1) // 遮罩物是半透明的，如果需要纯色可以多添加几层
        // 4. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
        var ply = new BMap.Polygon(max, {
          strokeWeight: 3,
          strokeColor: '#064fa0',
          fillColor: ''
        })
        map.addOverlay(ply)
        map.setViewport(ply.getPath()) // 调整视野
        // 设置地图层级
        map.setZoom(7)
      })
    },
    cityArea(city) {
      var bdary = new BMap.Boundary()
      bdary.get(city, function (rs) { // 获取行政区域
        map.clearOverlays() // 清除地图覆盖物
        // 思路：利用行政区划点的集合与外围自定义东南西北形成一个环形遮罩层
        // 1.获取选中行政区划边框点的集合rs.boundaries[0]
        var list = rs.boundaries
        var num = ''
        var max = list[0]
        for (var i = 1; i < list.length; i++) {
          if (list[i].length > max.length) {
            max = list[i]
          }
        }
        var strs = new Array()
        strs = max.split(';')
        var ENWS = ''
        for (var i = 0; i < strs.length; i++) {
          ENWS += strs[i] + ';'
        }

        // 2.自定义外围边框点的集合
        var E_JW = '170.672126, 39.623555;' // 东
        var EN_JW = '170.672126, 81.291804;' // 东北角
        var N_JW = '105.913641, 81.291804;' // 北
        var NW_JW = '-169.604276,  81.291804;' // 西北角
        var W_JW = '-169.604276, 38.244136;' // 西
        var WS_JW = '-169.604276, -68.045308;' // 西南角
        var S_JW = '114.15563, -68.045308;' // 南
        var SE_JW = '170.672126, -68.045308 ;' // 东南角
        // 3.添加环形遮罩层
        var ply1 = new BMap.Polygon(ENWS + E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + N_JW + EN_JW + E_JW, {
          strokeColor: 'none',
          strokeOpacity: 0,
          fillColor: '#00ffff',
          strokeOpacity: 0.5,
          fillOpacity: '1'
        }) // 建立多边形覆盖物
        console.log(ply1)
        map.addOverlay(ply1) // 遮罩物是半透明的，如果需要纯色可以多添加几层
        // 4. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
        var ply = new BMap.Polygon(max, {
          strokeWeight: 3,
          strokeColor: '#064fa0',
          fillColor: ''
        })
        map.addOverlay(ply)
        map.setViewport(ply.getPath()) // 调整视野
        // 设置地图层级
        map.setZoom(9)
      })
    },
    districtArea(district) {
      var bdary = new BMap.Boundary()
      bdary.get(district, function (rs) { // 获取行政区域
        map.clearOverlays() // 清除地图覆盖物
        // 思路：利用行政区划点的集合与外围自定义东南西北形成一个环形遮罩层
        // 1.获取选中行政区划边框点的集合rs.boundaries[0]
        var list = rs.boundaries
        var num = ''
        var max = list[0]
        for (var i = 1; i < list.length; i++) {
          if (list[i].length > max.length) {
            max = list[i]
          }
        }
        var strs = new Array()
        strs = max.split(';')
        var ENWS = ''
        for (var i = 0; i < strs.length; i++) {
          ENWS += strs[i] + ';'
        }

        // 2.自定义外围边框点的集合
        var E_JW = '170.672126, 39.623555;' // 东
        var EN_JW = '170.672126, 81.291804;' // 东北角
        var N_JW = '105.913641, 81.291804;' // 北
        var NW_JW = '-169.604276,  81.291804;' // 西北角
        var W_JW = '-169.604276, 38.244136;' // 西
        var WS_JW = '-169.604276, -68.045308;' // 西南角
        var S_JW = '114.15563, -68.045308;' // 南
        var SE_JW = '170.672126, -68.045308 ;' // 东南角
        // 3.添加环形遮罩层
        var ply1 = new BMap.Polygon(ENWS + E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + N_JW + EN_JW + E_JW, {
          strokeColor: 'none',
          strokeOpacity: 0,
          fillColor: '#00ffff',
          strokeOpacity: 0.5,
          fillOpacity: '1'
        }) // 建立多边形覆盖物
        console.log(ply1)
        map.addOverlay(ply1) // 遮罩物是半透明的，如果需要纯色可以多添加几层
        // 4. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
        var ply = new BMap.Polygon(max, {
          strokeWeight: 3,
          strokeColor: '#064fa0',
          fillColor: ''
        })
        map.addOverlay(ply)
        map.setViewport(ply.getPath()) // 调整视野
      })
    }
  },
  watch: {
    shopArr() {
      this.initMap()
    }
  },
  computed: {
    dtpNum() {
      return _.filter(this.shopArr,function(v){ return v.isDtp }).length
    },
    totalNum() {
      return this.shopArr.length
    },
    otherNum() {
      return _.filter(this.shopArr,function(v){ return !v.isDtp }).length
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    height: calc(100vh - 110px);
    background: #fff;
    padding: 10px;
    .head {
      margin-bottom: 10px;
      .title {
        line-height: 32px;
        height: 32px;
      }
    }
    .chartBox {
      margin-top: 16px;
      background-color: #fff;
      padding: 20px;
      height: calc(100% - 40px);
    }
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
    top:75px !important;
    border-radius:7px;
  }
  
  ::v-deep .BMap_pop img {
    top:85px !important;
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
