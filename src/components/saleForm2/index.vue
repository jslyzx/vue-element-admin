<template>
  <div>
    <el-card class="cardBody">
      <div class="outBox">
        <div class="selectBox">
          <div ref="year" data-time="year" :class="{'active':ruleForm.time=='year'}" @click="changeTime">
            当年
          </div>
          <div ref="quarter" data-time="quarter" :class="{'active':ruleForm.time=='quarter'}" @click="changeTime">
            本季度
          </div>
          <div ref="month" data-time="month" :class="{'active':ruleForm.time=='month'}" @click="changeTime">
            本月
          </div>
        </div>
        <div class="inputBox">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :inline="true"
            status-icon
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="年份">
              <el-date-picker v-model="ruleForm.year" type="year" placeholder="选择年" class="selectRegion" />
            </el-form-item>
            <el-form-item label="月份">
              <el-date-picker v-model="ruleForm.month" type="month" placeholder="选择月" class="selectRegion" />
            </el-form-item>
            <el-form-item label="商品">
              <el-cascader v-model="ruleForm.goods" class="selectRegion" :options="options" @change="handleChange" />
            </el-form-item>
            <el-form-item label="大区">
              <el-select v-model="ruleForm.bigArea" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="片区">
              <el-select v-model="ruleForm.middleArea" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="省区" class="mode">
              <el-select v-model="ruleForm.provienceArea" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="门店" class="mode1">
              <el-select v-model="ruleForm.shop" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="lastForm">
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
export default {
  name: 'SaleForm2',
  props: {
    ruleForm: {
      type: Object,
      default: () => { }
    }

  },
  data() {
    return {
      radio1: '',
      rules: {
        //   year: [
        //     { validator: validatePass, trigger: 'blur' }
        //   ],
        //   startMonth: [
        //     { validator: validatePass2, trigger: 'blur' }
        //   ],
        //   endMonth: [
        //     { validator: checkAge, trigger: 'blur' }
        //   ],
      },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  computed: {
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
    handleChange() {

    },
    submitForm() {

    },
    resetForm() {

    },
    changeTime(e) {
      this.ruleForm.time = e.target.dataset.time
    }
  }
}
</script>

<style lang="scss" scoped>
.cardBody {
    height: 143px;
    .outBox {
        display: flex;
        flex-flow: wrap nowrap;

        .selectBox {
            div {
                width: 83px;
                height: 27.05px;
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
                line-height: 27.05px;
            }
        }
        .mode{
            margin-left: 17px;
        }
        .mode1{
          margin-left: 16px;
        }
        .lastForm{
            margin-left: 129px;
        }
        .active{
            background: #ECF5FFFF !important;
            color:#3CA0FFFF !important;
        }
        // .selectRegion{
        //     width: 50px;
        // }
    }

}
</style>
