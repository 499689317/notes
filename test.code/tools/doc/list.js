
function Node(data, pre, next) {
	this.preNode = null;
	this.nextNode = null;
	this.data = null;
	this.init(data, pre, next);
};

Node.prototype.init = function(data, pre, next) {
	this.data = data;
	this.preNode = pre;
	if (this.preNode) {// 前置节点存在，将当前节点引用给前置节点的下一节点指针
		this.preNode.nextNode = this;
	}
	this.nextNode = next;
};

Node.prototype.print = function() {
	
	if (this.nextNode) {
		return (this.data + this.nextNode.print() );
	}
	return this.data;
};
Node.prototype.insert = function(node) {
	
	node.preNode = this;
	node.nextNode = this.nextNode;

	// 从插入点断掉原链表连接
	if (this.nextNode) {
		this.nextNode.preNode = node;
	}
	this.nextNode = node;
};
Node.prototype.remove = function() {

	if (this.nextNode) {
		this.nextNode.preNode = this.preNode;
		this.preNode.nextNode = this.nextNode;
	} else {
		this.preNode.nextNode = null;
	}
};
Node.prototype.revert = function() {
	var t = null;
	function rev() {
		if (!this.nextNode) {
			this.preNode = null;
			this.nextNode = t;
			return this;
		} else {
			this.preNode = this.nextNode;
			this.nextNode = t;
			t = this;
			return rev.call(this.preNode);
		}
	};
	return rev.call(this);
};


// 创建链表
var ln = new Node("0", null, null);

// 往节点内添加节点
var l1 = new Node("1", ln, null);
var l2 = new Node("2", l1, null);
var l3 = new Node("3", l2, null);
console.log(ln.print() );

// 链表的增删改查
var l4 = new Node("4", null, null);
l3.insert(l4);
console.log(ln.print() );
l4.remove();
console.log(ln.print() );
ln = ln.revert();
console.log(ln.print() );




