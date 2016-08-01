
; (function() {

    /////////////
    // 数据结构
    /////////////
    
    var a_data = {
    	_id: 101,
    	attr: {
	    	hp : 3000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [1,3],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'a',
		slot: 'a',// 角色所处槽位
	};
	var a_data2 = {
		_id: 102,
    	attr: {
	    	hp : 3000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [2,3],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'a',
		slot: 'b',// 角色所处槽位
	};
	var a_data3 = {
		_id: 103,
    	attr: {
	    	hp : 7000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [1,2],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'a',
		slot: 'c',// 角色所处槽位
	};
	var b_data = {
		_id: 201,
    	attr: {
	    	hp : 5000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [2,3],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'b',
		slot: 'a',// 角色所处槽位
	};
	var b_data2 = {
		_id: 202,
    	attr: {
	    	hp : 4000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [1,3],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'b',
		slot: 'b',// 角色所处槽位
	};
	var b_data3 = {
		_id: 203,
    	attr: {
	    	hp : 6000,// 血量
			ad : 100,// 物理攻击
			armor : 100,// 物理防预力
			adp : 100,// 魔法防预
			ap : 100,// 命中
			rest : 100,// 闪避
			app : 100,// 暴击
			dodge : 100,// 格挡
    	},
		skill: [1,2,3],// 技能数组
		isAtk: false,
		isDeath: false,
        camp: 'b',
		slot: 'c',// 角色所处槽位
	};
	var Const = {
		ROUND_A: 10,
		ROUND_B: 11,
        CAMP_A: 'a',
        CAMP_B: 'b',
		ATK: 1,
		ATK2: 2,
		ATK3: 3,
	};

	var atk = {
		_id: 1,
		val: 100,// 技能额外伤害
		mag: 100,// 技能所需魔法值
	};
	var atk2 = {
		_id: 2,
		val: 200,
		mag: 200,
	};
	var atk3 = {
		_id: 3,
		val: 300,
		mag: 300,
	};
    
    var _list = [a_data,b_data,b_data2,b_data3];
    var _set = {};
    var _set2 = {};

    function set(list) {
        var set = {};
        if (list && list.length) {
            var copy = deepCopy(list);
            for (var i = 0; i < copy.length; i++) {
                set[copy[i]._id] = copy[i];
            };
        }
        return set;
    }

    ///////////
    // 创建战斗
    ///////////
    /**
     * list: [];// A阵营角色
     * list2: [];// B阵营角色
     */
    function createBattle() {
    	
    	var instruct_set = {// 战斗指令集合
    		A: [],
    		B: []
    	};

        _set = set(_list);// 深拷贝一份数据副本

        var list = [];
        var list2 = [];
        for (var key in _set) {
            if (_set[key].camp === Const.CAMP_A) {
                list.push(_set[key]);
            } else if (_set[key].camp === Const.CAMP_B) {
                list2.push(_set[key]);
            }
        }

    	var round_state = Const.ROUND_A;// 控制战斗
    	
    	var a_num = list.length;// A阵营存活角色数量
    	var b_num = list2.length;// B阵营存活角色数量
    	var a_count = 0;// A阵营角色攻击次数
        var b_count = 0;// B阵营角色攻击次数

    	/**
         * 开始战斗
         * 战斗顺序按a,b,c,d,e,f顺序双方交叉执行(A阵营先手)
         */
    	while(!(a_num <= 0 || b_num <= 0)) {
	    	
    		var lst = [],
                lst2 = [],
    		    instruct = {
        			skill: [],
        			val: null,
        			attack: [],
        			attacked: []
    		    };

    		if (round_state === Const.ROUND_A) {
    			lst = list;// 处理list列表
    			lst2 = list2;
    		} else {
    			lst = list2;// 处理list2列表
    			lst2 = list;
    		}
    		
    		var allys = getAlly(lst);// 取攻击角色
    		var enemys = getEnemy(lst2);// 取被攻击角色
    		var skill = getSkill(allys);// 攻击角色取技能
    		var value = calcVal(allys,enemys);// 计算攻击伤害
    		
    		// 战斗逻辑
    		if (enemys && enemys.length) {
    			var a = 0;
    			var b = 0;
                var c = 0;
                var d = 0;
    			// 已方阵营(标记为已攻击)
    			for (var i = 0; i < allys.length; i++) {
    				_set[allys[i]].isAtk = true;

    				a = allys[i];
    			};
    			// 敌方阵营(扣血)
	    		for (var i = 0; i < enemys.length; i++) {
	    			_set[enemys[i]].attr.hp -= value[enemys[i]];

	    			b = enemys[i];
                    c = value[enemys[i]];
                    d = skill[i];

	    			if (_set[enemys[i]].attr.hp <= 0) {
	    				_set[enemys[i]].isDeath = true;
                        _set[enemys[i]].isAtk = false;
	    				console.log('/////////////////////')
	    				console.log(b + '死了')
	    				console.log('/////////////////////')
	    			}
	    		};
	    		console.log('***************************************')
	    		console.log('攻击方是：',a)
	    		console.log('被攻击方是：',b)
	    		console.log(a + ' 释放 ' + d + ' 技能扣了 ' + b + '    ' + c + '点血')
	    		console.log('***************************************')
    		} else {
    			throw '未取到敌人';
    		}

    		// 保存指令
    		instruct.skill = skill;// 技能id
    		instruct.val = value;// 伤害值numble
    		instruct.attack = allys;// 角色id
    		instruct.attacked = enemys;// 角色id

    		if (round_state === Const.ROUND_A) {
    			round_state = Const.ROUND_B;
    			instruct_set.A.push(instruct);
    		} else {
    			round_state = Const.ROUND_A;
    			instruct_set.B.push(instruct);
    		}
    		// 统计(判断战斗是否创建完成)
    		a_num = 0;
    		b_num = 0;
            a_count = 0;
            b_count = 0;
	    	for (var i = 0; i < list.length; i++) {
	    		if (!list[i].isDeath) a_num++;
                if (list[i].isAtk) a_count++;
	    	};
	    	for (var i = 0; i < list2.length; i++) {
	    		if (!list2[i].isDeath) b_num++;
                if (list2[i].isAtk) b_count++;
	    	};
            if (a_count === a_num) reset(list);
            if (b_count === b_num) reset(list2);
    	};
        if (!a_num) console.log('战斗结果：B阵营胜利')
        if (!b_num) console.log('战斗结果：A阵营胜利')
    	// 战斗创建完后将_set释放
        _set = null; 
        console.log(instruct_set)
    	return instruct_set;// null说明某一阵营或两阵营没有角色数据
    }

    ///////////////
    /// 拿取角色
    ///////////////
    function getAlly(list) {
    	var list2 = [];
    	if (!list || !list.length) return list2;
    	for (var i = 0; i < list.length; i++) {
    		if (!list[i].isAtk && !list[i].isDeath) {
    			// 此时与其它角色有技能配合将选取多个角色(否则只选取当前角色)
    			list2.push(list[i]._id);
    			return list2;
    		};
    	};
    	return list2;
    }

    //////////////
    /// 拿取当前敌人
    //////////////
    function getEnemy(list) {
    	var list2 = [];
    	if (!list || !list.length) return list2;
    	for (var i = 0; i < list.length; i++) {
    		// 攻击方群攻技能将选取多个角色
    		if (list[i].isDeath) {
    			continue;
    		} else {
	    		list2.push(list[i]._id);
	    		return list2;
    		}
    	};
    	return list2;
    }

    ///////////////
    // 拿取技能方法
    ///////////////
   	function getSkill(list) {
   		var list2 = [];
   		if (!list || !list.length) return list2;
   		for (var i = 0; i < list.length; i++) {
   			// 角色id取角色数据
   			var data = _set[list[i]];
   			// 判断魔法值是否满了
   			if (data.attr.adp === 100) {
   				list2.push(data.skill[Math.floor(Math.random()) + 1]);
   			} else {
   				list2.push(data.skill[0]);
   			}
   		};
   		return list2;
   	}

   	/////////////
    // 伤害计算
    /////////////
    function calcVal(list, list2) {
    	/**
    	 * 需要双方角色战斗属性
    	 */
        var val = {};
        if (!list || !list.length) return val;
        if (!list2 || !list2.length) return val;
        for (var i = 0; i < list2.length; i++) {
            val[list2[i]] = Math.floor(Math.random() * 3000);
        };
    	return val;
    }

    function reset(list) {
    	if (!list || !list.length) return;
    	for (var i = 0; i < list.length; i++) {
    		list[i].isAtk = false;
    	};
    }

    //////////////
    /// 对象深拷贝
    //////////////
    function deepCopy(param) {

    	// 返回一个副本对像
        var copyObj = null;
    	var oClass = ideClass(param);
        // 类型判断
        if (oClass === "Object"){
            copyObj = {};
        } else if (oClass === "Array"){
            copyObj = [];
        } else {
            return param;
        }
        for (key in param) {
            var copy = param[key];
            if (ideClass(copy) == "Object"){
                copyObj[key] = arguments.callee(copy);//递归调用
            } else if (ideClass(copy) == "Array"){
                copyObj[key] = arguments.callee(copy);
            } else {
                copyObj[key] = param[key];
            }
        }
        return copyObj;
    }
    function ideClass(param) {
        if(param === null) return "Null";
        if(param === undefined) return "Undefined";
        return Object.prototype.toString.call(param).slice(8,-1);
    }
    utils.deepCopy = deepCopy;


    /////////////////////
    /// 战斗
    /////////////////////
    var path = 'res/static/x1/battle/';
    kk.Demo = Demo;
	function Demo() {
        PIXI.Container.call(this);
        this.testDemo();
    }

    Demo.prototype = Object.create(PIXI.Container.prototype);
    Demo.prototype.constructor = Demo;

    Demo.prototype.testDemo = function() {
        var size = kk.getWinSize();

        _set2 = set(_list);
        var list = [];
        var list2 = [];
        
        for (var key in _set2) {
            if (_set2[key].camp === Const.CAMP_A) {
                list.push(_set2[key]);
            } else if (_set2[key].camp === Const.CAMP_B) {
                list2.push(_set2[key]);
            }
        }

        // 初始化a阵营Person实例
        for (var i = 0; i < list.length; i++) {
        	var id = list[i]._id;
        	var person = new Person(id);

        	person.x = 50 + (i * 200);
        	person.y = 30;
        	this.addChild(person);

        	person.createData(list[i]);
        	person.createSkill(id);

        };

        for (var i = 0; i < list2.length; i++) {
        	var id = list2[i]._id;
        	var person = new Person(id);

        	person.x = 50 + (i * 200);
        	person.y = 800;
        	this.addChild(person);

        	person.createData(list2[i]);
        	person.createSkill(id);

        };

        //////////////////
        /// 测试
        //////////////////
		var close = new wow.ui.Button({

			b1: 'pub_b_9.png',
			anime: true,
			width: 155,
			height: 58
		},{
			t1: {
				text: '创建战斗',
			}
		},function() {
			createBattle();
		}.bind(this));

		close.x = size.w * 0.5;
		close.y = size.h * 0.5;
		this.addChild(close);
        
        // 创建战斗完成后按规则播放战斗
        b = _set2;
        c = _list;
        
    }
    Demo.prototype.$destroy = function() {
    }

    /////////////
    /// Data类
    /////////////
    function Data(res) {

    	this.attr = res.attr;
    	this.skill = res.skill;// 技能数组
    	this.isAtk = res.isAtk;
    	this.isDeath = res.isDeath;
    }

    //////////////
    // Skill类
    //////////////
    function Skill(id) {
    	this._id = id;
    	this.init();
    }
    Skill.prototype.init = function() {
    	var person = _set2[this._id];

    	// 初始化角色技能
    	

    }
    Skill.prototype.$destroy = function() {
    }

    /////////////
   	// Person类
   	/////////////
   	function Person(id) {
   		PIXI.Container.call(this);
   		this._id = id;
   		this._data = null;
   		this._skill = null;
   		this.createView();
   	}
   	Person.prototype = Object.create(PIXI.Container.prototype);
    Person.prototype.constructor = Person;
    Person.prototype.createView = function() {

   		var view = kk.sprite(path + 'demo.png');
   		view.$anchor(0,0);
   		view.x = 0;
   		view.y = 0;
   		this.addChild(view);
   	}

    Person.prototype.createData = function(data) {
    	this._data = new Data(data);
    }
   	Person.prototype.createSkill = function(id) {
   		this._skill = new Skill(id);
   	}
   	Person.prototype.$destroy = function() {
   		this._data = null;
   		if (this._skill) this._skill.$destroy();
   	}
    
    
})();