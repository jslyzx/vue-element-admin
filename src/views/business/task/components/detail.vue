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
          <el-input v-model="form.signAxis" type="text" readonly />
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
            <el-radio-group v-if="v.type === 'radio'" v-model="v.value">
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
export default {
  name: 'detail',
  data() {
    return {
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
      const { checkList, description, name, signPics, signAxis, state, signTime } = res.data
      const signPicArr = signPics.split(',')
      _.each(checkList, function(v){ v.list = [] })
      this.form = Object.assign({}, {
        name,
        description,
        checkList,
        signPicArr,
        signAxis,
        state,
        signTime
      })
    },
    async showDetail(id, i) {
      const res = await query({taskCheckId: id})
      _.each(res.data, function(v) { v.options = JSON.parse(v.options) })
      this.form.checkList[i].list = res.data
    },
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
</style>
