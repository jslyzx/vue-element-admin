<template>
  <div class="body">
    <div class="inner">
      <div class="head clearfix">
        <div class="title fl">授权药房分布</div>
        <div class="fr">
          <el-radio-group v-model="type" size="small">
            <el-radio-button label="总数" ></el-radio-button>
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
let BMap = {}
let map = {}
export default {
  name: 'ShopDistributed',
  data() {
    return {
      type: '总数',
      map: {}
    }
  },
  created() {
    const that = this
    setTimeout(() => {
      that.initMap()
    }, 2000)
  },
  methods: {
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
      var markers1 = []; var markers2 = []
      var pointList = [
        {
          'name': '南京德众堂大药房有限公司',
          'longitude': 118.7642593383789,
          'latitude': 32.043853759765628,
          'type': 2
        },
        {
          'name': '苏州德轩堂药房有限公司',
          'longitude': 120.54890441894531,
          'latitude': 31.4341983795166,
          'type': 2
        },
        {
          'name': '徐州延顺堂药房有限公司',
          'longitude': 117.17539978027344,
          'latitude': 34.26227569580078,
          'type': 2
        },
        {
          'name': '淮安德轩堂药房有限公司',
          'longitude': 119.01316833496094,
          'latitude': 33.62675094604492,
          'type': 2
        },
        {
          'name': '常州德轩堂药房有限公司',
          'longitude': 119.959716796875,
          'latitude': 31.78243637084961,
          'type': 2
        },
        {
          'name': '南京延顺堂大药房有限公司',
          'longitude': 118.78749084472656,
          'latitude': 32.064022064208987,
          'type': 2
        },
        {
          'name': '无锡德轩堂药房有限公司',
          'longitude': 120.31443786621094,
          'latitude': 31.547887802124025,
          'type': 2
        },
        {
          'name': '扬州德轩堂药房有限公司',
          'longitude': 119.4072265625,
          'latitude': 32.3927001953125,
          'type': 2
        },
        {
          'name': '盐城德轩堂药房有限公司',
          'longitude': 120.1700668334961,
          'latitude': 33.38267517089844,
          'type': 1
        },
        {
          'name': '南通德轩堂药房有限公司',
          'longitude': 120.86742401123047,
          'latitude': 32.00920867919922,
          'type': 1
        },
        {
          'name': '江苏德轩堂医药（集团）有限公司江苏省肿瘤医院药房',
          'longitude': 118.79000091552735,
          'latitude': 32.06999969482422,
          'type': 1
        },
        {
          'name': '连云港德益康连锁大药房',
          'longitude': 119.16741943359375,
          'latitude': 34.60169982910156,
          'type': 1
        },
        {
          'name': '广州德轩堂药房有限公司',
          'longitude': 113.29737854003906,
          'latitude': 23.12896156311035,
          'type': 1
        },
        {
          'name': '重庆德轩堂药房有限公司',
          'longitude': 106.56463623046875,
          'latitude': 29.520980834960939,
          'type': 1
        },
        {
          'name': '云南德轩堂药业有限公司',
          'longitude': 102.69091796875,
          'latitude': 25.04450225830078,
          'type': 1
        },
        {
          'name': '杭州德轩堂众康药房有限公司',
          'longitude': 120.18572235107422,
          'latitude': 30.260610580444337,
          'type': 1
        },
        {
          'name': '合肥德轩堂药房有限公司',
          'longitude': 117.30792236328125,
          'latitude': 31.793212890625,
          'type': 1
        },
        {
          'name': '石家庄宁益德轩堂药房有限公司',
          'longitude': 114.48253631591797,
          'latitude': 38.06251525878906,
          'type': 1
        },
        {
          'name': '福州德轩堂医药有限公司',
          'longitude': 119.30177307128906,
          'latitude': 26.07280731201172,
          'type': 1
        },
        {
          'name': '深圳德轩堂药房有限公司',
          'longitude': 114.09757232666016,
          'latitude': 22.561246871948243,
          'type': 1
        },
        {
          'name': '长沙德轩堂药房有限公司',
          'longitude': 112.9884033203125,
          'latitude': 28.216472625732423,
          'type': 1
        },
        {
          'name': '天津德轩堂药房有限公司',
          'longitude': 117.17594909667969,
          'latitude': 39.06995391845703,
          'type': 1
        },
        {
          'name': '济南德轩堂药房有限公司',
          'longitude': 116.99533081054688,
          'latitude': 36.65618133544922,
          'type': 1
        },
        {
          'name': '河南德轩堂药房有限公司',
          'longitude': 113.70039367675781,
          'latitude': 34.75701141357422,
          'type': 1
        },
        {
          'name': '成都德轩堂药房有限公司',
          'longitude': 104.0665512084961,
          'latitude': 30.628673553466798,
          'type': 1
        },
        {
          'name': '宿迁德轩堂药房有限公司',
          'longitude': 118.29732513427735,
          'latitude': 33.94375991821289,
          'type': 1
        },
        {
          'name': '江苏德轩堂医药（集团）有限公司南京市第二医院药房',
          'longitude': 118.7688980102539,
          'latitude': 32.08869934082031,
          'type': 1
        },
        {
          'name': '泰州德轩堂药房有限公司',
          'longitude': 119.92945861816406,
          'latitude': 32.47151565551758,
          'type': 1
        },
        {
          'name': '苏州延顺堂药房有限公司',
          'longitude': 120.61083984375,
          'latitude': 31.34779930114746,
          'type': 2
        }
      ]
      // 输入经纬度和名称，标记
      function bindPoint(longti, lati, name, type) {
        // map.clearOverlays();//清空原来的标注

        var pt = null
        // 创建点
        pt = new BMap.Point(longti, lati)
        // 创建标记
        var marker = new BMap.Marker(pt)
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
        if (type === 1) {
          markers1.push(marker)
        } else {
          markers2.push(marker)
        }
      }
      pointList.forEach(item => {
        bindPoint(item.longitude, item.latitude, item.name, item.type)
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
