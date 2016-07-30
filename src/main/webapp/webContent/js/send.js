var SEND = 'http://localhost:8080/smart_printers/orders/buy';

// Mock.mock(SEND,{
//    status: 'SUCCESS'
// });

/********** end *********/


var menu_data = {
	dishes: [
		{
			name: '腐竹肉片',
			price: 10,
			count: 0
		},{
			name: '土豆排骨',
			price: 9,
			count: 0
		},{
			name: '牛肉盖饭',
			price: 15,
			count: 0
		},{
			name: '赤焰三文鱼盖饭',
			price: 29,
			count: 0
		},{
			name: '柳州螺蛳粉',
			price: 10,
			count: 0
		},
	]
}

Vue.config.debug = true
var vue = new Vue({
	el: '#model_all',
	data: menu_data,
	computed: {
		sum: function(){
			countSum();		
		}
	},
	methods: {
		changeDishStatus: function(index){
			return ++this.dishes[index].count;		
		},
		reduceDishCount: function(index){
			if(this.dishes[index].count <= 0){
				return 0;
			}else
			return --this.dishes[index].count;
		},
		addDishCount: function(index){
			return ++this.dishes[index].count;
		}

	}
});
Vue.nextTick(function(){
	countSum();
});
function countSum(){
	var len = menu_data.dishes.length,
		dishes = menu_data.dishes,
		sum = 0,
		counter = 0;
	// 计算总值+计算数量 
	for(var i = 0; i < len; i++){
		sum += dishes[i].price * dishes[i].count;
		counter += dishes[i].count;
	}
	document.getElementById('sum').innerHTML = sum;		
	document.getElementById('counter_num').innerHTML = counter;		
}
document.getElementById('toggle_card').addEventListener('click',function(event){
	var ele = document.getElementById('sc_area');
	if(ele.className.indexOf('show') === -1){
		ele.className += ' show';
	}else{
		ele.className = ele.className.replace(' show', '');
	}
});
var ware = {
    width: document.body.offsetWidth,
    displacement_1: 0,
    displacement_2: 0,
    move: function(){
        $('#ware').css('background-position', (this.displacement_1 = this.displacement_1+ 10) + 'px  bottom,' + (this.displacement_2 = this.displacement_2 + 5) + 'px  bottom');
        if(this.width < this.displacement_1){
            this.displacement_1 -= 1087;
        }
        if(this.width < this.displacement_2){
            this.displacement_2 -= 1209;
        }
        setTimeout('ware.move()', 50);
    }
};
document.oncontextmenu=new Function("event.returnValue=false;");
document.onselectstart=new Function("event.returnValue=false;");
document.getElementById('send_order').addEventListener('click',function(event){
	var temp = new Date();
	var str = ""+ temp.getFullYear()
			+ (temp.getMonth() + 1)
			+ temp.getDate()
			+ temp.getHours()
			+ temp.getMinutes()
			+ temp.getSeconds();
	var dishes = menu_data.dishes;
	var data = {
		"company"       : '嘻唰唰火锅店',
		"orderTime"     : str,
		"expectTime"    : "" + (temp.getHours()+1) + temp.getMinutes(),
		"item"			: [ ],
		"orderRemark"   : '',
		"orderMealFee"  : 0,
		"orderDisFee"   : 0,
		"orderPreAmount": 0,
		"orderPayStatus": '已付款',
		"userName"      : '梁朝伟',
		"userAddress"   : '广东省广州市广州大学城广东工业大学工学一号馆',
		"userTelephone" : '15521190833'
	}
	for(var i = 0,len = dishes.length; i < len; i++){
		if(dishes[i].count > 0){
			data.item.push(dishes[i]);
		}
	}
	if(data.item.length === 0){
		alert('禁止空订单');
		return ;
	}
	$.ajax({
		url: SEND,
		type: 'post',
		data:  data,
		contentType: 'json',
		dataType: 'json',
		success: function(data){
			console.info(data);
			alert('success');
		},
		error: function(data){
			console.info(data);
			alert('success');
		}
	});		
});

// ware.move();
