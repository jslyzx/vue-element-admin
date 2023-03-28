<template>
  <div class="body">
    <div id="container" class="chart-part" style="height: 100%" />
  </div>
</template>
<script>
let BMap = {}
let map = {}
export default {
  name: 'ShopDistributed',
  data() {
    return {
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
          'latitude': 32.043853759765628
        },
        {
          'name': '苏州德轩堂药房有限公司',
          'longitude': 120.54890441894531,
          'latitude': 31.4341983795166
        },
        {
          'name': '徐州延顺堂药房有限公司',
          'longitude': 117.17539978027344,
          'latitude': 34.26227569580078
        },
        {
          'name': '淮安德轩堂药房有限公司',
          'longitude': 119.01316833496094,
          'latitude': 33.62675094604492
        },
        {
          'name': '常州德轩堂药房有限公司',
          'longitude': 119.959716796875,
          'latitude': 31.78243637084961
        },
        {
          'name': '南京延顺堂大药房有限公司',
          'longitude': 118.78749084472656,
          'latitude': 32.064022064208987
        },
        {
          'name': '无锡德轩堂药房有限公司',
          'longitude': 120.31443786621094,
          'latitude': 31.547887802124025
        },
        {
          'name': '扬州德轩堂药房有限公司',
          'longitude': 119.4072265625,
          'latitude': 32.3927001953125
        },
        {
          'name': '盐城德轩堂药房有限公司',
          'longitude': 120.1700668334961,
          'latitude': 33.38267517089844
        },
        {
          'name': '南通德轩堂药房有限公司',
          'longitude': 120.86742401123047,
          'latitude': 32.00920867919922
        },
        {
          'name': '江苏德轩堂医药（集团）有限公司江苏省肿瘤医院药房',
          'longitude': 118.79000091552735,
          'latitude': 32.06999969482422
        },
        {
          'name': '连云港德益康连锁大药房',
          'longitude': 119.16741943359375,
          'latitude': 34.60169982910156
        },
        {
          'name': '广州德轩堂药房有限公司',
          'longitude': 113.29737854003906,
          'latitude': 23.12896156311035
        },
        {
          'name': '重庆德轩堂药房有限公司',
          'longitude': 106.56463623046875,
          'latitude': 29.520980834960939
        },
        {
          'name': '云南德轩堂药业有限公司',
          'longitude': 102.69091796875,
          'latitude': 25.04450225830078
        },
        {
          'name': '杭州德轩堂众康药房有限公司',
          'longitude': 120.18572235107422,
          'latitude': 30.260610580444337
        },
        {
          'name': '合肥德轩堂药房有限公司',
          'longitude': 117.30792236328125,
          'latitude': 31.793212890625
        },
        {
          'name': '石家庄宁益德轩堂药房有限公司',
          'longitude': 114.48253631591797,
          'latitude': 38.06251525878906
        },
        {
          'name': '福州德轩堂医药有限公司',
          'longitude': 119.30177307128906,
          'latitude': 26.07280731201172
        },
        {
          'name': '深圳德轩堂药房有限公司',
          'longitude': 114.09757232666016,
          'latitude': 22.561246871948243
        },
        {
          'name': '长沙德轩堂药房有限公司',
          'longitude': 112.9884033203125,
          'latitude': 28.216472625732423
        },
        {
          'name': '天津德轩堂药房有限公司',
          'longitude': 117.17594909667969,
          'latitude': 39.06995391845703
        },
        {
          'name': '济南德轩堂药房有限公司',
          'longitude': 116.99533081054688,
          'latitude': 36.65618133544922
        },
        {
          'name': '河南德轩堂药房有限公司',
          'longitude': 113.70039367675781,
          'latitude': 34.75701141357422
        },
        {
          'name': '成都德轩堂药房有限公司',
          'longitude': 104.0665512084961,
          'latitude': 30.628673553466798
        },
        {
          'name': '宿迁德轩堂药房有限公司',
          'longitude': 118.29732513427735,
          'latitude': 33.94375991821289
        },
        {
          'name': '江苏德轩堂医药（集团）有限公司南京市第二医院药房',
          'longitude': 118.7688980102539,
          'latitude': 32.08869934082031
        },
        {
          'name': '泰州德轩堂药房有限公司',
          'longitude': 119.92945861816406,
          'latitude': 32.47151565551758
        },
        {
          'name': '苏州延顺堂药房有限公司',
          'longitude': 120.61083984375,
          'latitude': 31.34779930114746
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

        // 添加显示文本
        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + name + '</p>')

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
      // bindPoint(116.493895, 29.859667, '大光村')
      // bindPoint(121.386816, 29.859667, '李广村')
      // bindPoint(121.286816, 29.859667, '李广村')
      // bindPoint(121.186816, 29.859667, '李广村')
      // bindPoint(121.086816, 29.859667, '李广村')

      // var lon
      // var lat
      // var randomPoint = 50000
      // // 循环生成randomPoint个点
      // for (var k = 0; k < randomPoint; k++) {
      //   lon = randomNum(115.1, 115.3)
      //   lat = randomNum(35.7, 36.0)
      //   console.log(lon + ', ' + lat)
      //   bindPoint(lon, lat, k)
      // }
      // 调用API聚合函数将标记数组显示在地图上
      var markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers1 })
      var markerClusterer1 = new BMapLib.MarkerClusterer(map, { markers: markers2 })
    },
    initmark() {
      var markers = []
      var pt = null
      var i = 0
      var w = [{
        p: new BMap.Point(116.480945, 39.953416)
      }, {
        p: new BMap.Point(116.407503, 39.984104)
      }, {
        p: new BMap.Point(116.497502, 39.908802)
      }, {
        p: new BMap.Point(116.373514, 40.040417)
      }, {
        p: new BMap.Point(116.380945, 39.953416)
      }, {
        p: new BMap.Point(116.307503, 39.984104)
      }, {
        p: new BMap.Point(116.397502, 39.908802)
      }, {
        p: new BMap.Point(98.407503, 39.984104)
      }, {
        p: new BMap.Point(98.407503, 39.984104)
      }, {
        p: new BMap.Point(118.588703, 31.575689)
      }, {
        p: new BMap.Point(119.01874, 32.588932)
      }]
      for (; i < w.length; i++) {
        pt = new BMap.Point(Math.random() * 30 + 85, Math.random() * 20 + 21)
        pt = w[i].p
        markers.push(new BMap.Marker(pt))
      }
      console.log(markers)
      // 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
      var markerClusterer = new BMapLib.MarkerClusterer(map, {
        markers: markers
      })
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
.chartBox {
  margin-top: 16px;
  background-color: #fff;
  padding: 20px;
  height: calc(100% - 130px);
}
</style>
