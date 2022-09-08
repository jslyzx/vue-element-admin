<template>
    <div class="body">
        <div class="formCard">
            <saleForm :rule-form="ruleForm" />
            <div class="chartBox">
                <sTable :tableData="data1.tableData" :headerData="headerData" :total="data1.total"
                    :currentPage="data1.currentPage" :pageSizes="data1.pageSizes" :pageSize="data1.pageSize"></sTable>

            </div>
        </div>
    </div>

</template>
  
  <script>
import saleForm from '@/components/saleForm'
import sTable from '@/components/table'
export default {
    name: 'ShopSale',
    components: {
        saleForm,
        sTable
    },
    data() {
        return {
            ruleForm: {
                time: 'year',
                year: '',
                startMonth: '',
                endMonth: '',
                goods: '',
                bigArea: '',
                middleArea: '',
                provienceArea: '',
                shop: ''
            },
            data1: {
                currentPage: 1,
                pageSizes: [10, 20, 30, 40],
                pageSize: 10,
                total: 100,
                tableData: [
                    {
                        index: 1,
                        person: 1,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 2,
                        person: 2,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 3,
                        person: 3,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 4,
                        person: 4,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 5,
                        person: 5,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 6,
                        person: 6,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 7,
                        person: 7,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 8,
                        person: 8,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 9,
                        person: 9,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 10,
                        person: 10,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 11,
                        person: 11,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 12,
                        person: 12,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 13,
                        person: 13,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                    {
                        index: 14,
                        person: 14,
                        name: "李月娥",
                        monthRate: "88.88%",
                        monthMath: "1.2%",
                        quarterRate: "88.88%",
                        quarterMath: 128,
                        yearRate: "88.88%",
                        yearMath: "1.2%",
                        math: "8.8%"
                    },
                ],
            },
            headerData: [
                {
                    id: 1,
                    label: "排名",
                    prop: "person"
                },
                {
                    id: 2,
                    label: "门店名称",
                    prop: "name"
                },
                {
                    id: 3,
                    label: "省区",
                    prop: "monthRate"
                },
                {
                    id: 4,
                    label: "片区",
                    prop: "monthMath"
                },
                {
                    id: 5,
                    label: "大区",
                    prop: "quarterRate"
                },
                {
                    id: 6,
                    label: "销售数量",
                    prop: "quarterMath"
                },
                {
                    id: 7,
                    label: "销售金额",
                    prop: "yearRate"
                },
                {
                    id: 8,
                    label: "环比",
                    prop: "yearMath"
                },
                {
                    id: 9,
                    label: "同比",
                    prop: "math"
                },
            ]
        }
    },
    computed: {
        countSum() {
            return this.chartsData1.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        },
        countSum2() {
            return this.chartsData2.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        },
        countSum3() {
            return this.chartsData3.reduce((data1, data2) => {
                if (data2.value) {
                    return data2.value + data1
                }
            }, 0)
        }
    },
    mounted() {
        this.initCharts()
        this.initCharts2()
        this.initCharts3()
        this.initCharts4()
    },
    methods: {
        handleClick() {

        },
    }
}
</script>
  
  <style lang="scss" scoped>
  .body {
      width: 100%;
      height: 100vh;
      background: rgba(235, 238, 242, 1);
      padding: 29px;
  }
  
  .formCard {
      margin: 0px 24px 25px -10px;
      width: 1655px;
      height: 143px;
  }
  
  .chartBox {
      margin: 25px 24px 25px -1px;
      width: 1655px;
      height: 811px;
      background-color: #fff;
      padding: 39px 36px 34px 27px;
  }
  </style>
  