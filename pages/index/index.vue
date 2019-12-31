<template>
	<view class="gd-view">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<view v-for="(item,index) in orderByMenuList" :key="index" class="gd-box" :style="{top: CustomBar + 'px'}">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						{{item.Name}}
					</view>
				</view>
				<sub-menu :subItems="item.Child" ></sub-menu>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from '@/plugins/mescroll-uni/mescroll-uni.vue';
	import Api from '../../api/interface.js'
	import SubMenu from '@/components/SubMenu.vue';
	export default {
		components: {
			MescrollUni,
			SubMenu
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 99 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: []
			}
		},
		computed: {
			orderByMenuList() {
				return this.sortByKey(this.dataList, "ShowOrder");
			},
			
		},
		methods: {
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				let params = {
					"UserId": "75f4c652-0a6d-4885-bd7f-d2c5998ce551"
				};
				Api.getIndexListData("003300900001", params).then(data => {
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data.body.items == null ? [] : data.body.items;
					// 如果是第一页需手动制空列表
					//设置列表数据
					if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据

					// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
					this.$nextTick(() => {
						mescroll.endSuccess(curPageData.length)
					})
				}).catch(err => {
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				})

			},
			
			//菜单排序
			sortByKey(array, key) {
				return array.slice().sort(function(a, b) {
					var x = Number(a[key]);
					var y = Number(b[key]);
					return x < y ? -1 : x > y ? 1 : 0;
				});
			}
		},
		created() {


		}
	}
</script>

<style scoped>
	.gd-view {
		height: 100%;

	}

	.gd-box {
		position: relative;

	}
</style>
