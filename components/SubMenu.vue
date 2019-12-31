<template>
	<view class="cu-list menu-avatar">
		<view class="cu-item"  v-for="(subitem,subindex) in orderByChildMenuList"  :key="subindex">
			<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
			<view class="content">
				<view class="text-pink">
					<view class="text-cut">{{subitem.Name}}</view>
				</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">凯尔，你被自己的光芒变的盲目！</view>
				</view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">22:20</view>
				<view class="cu-tag round bg-red sm">5</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"SubMenu",
		props: {
			subItems: {
				type: Array,
				default(){
					return [];
				}
			},
		},
		computed: {
			orderByChildMenuList() {
				return this.sortByKey(this.subItems, "ShowOrder");
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			sortByKey(array, key) {
				return array.slice().sort(function(a, b) {
					var x = Number(a[key]);
					var y = Number(b[key]);
					return x < y ? -1 : x > y ? 1 : 0;
				});
			}
		}
	}
</script>

<style>

</style>
