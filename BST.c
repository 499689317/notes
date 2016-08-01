
////////////////////////
// 操作二叉树(c语言实现)
////////////////////////

#include <stdio.h>
#include <stdlib.h>


typedef struct Node Node;
typedef int ElementTP;

// 二叉树节点(结构体)
struct Node
{
	ElementTP element;
	Node *parent, *lchild, *rchild;
};


typedef struct Node Tree;// 根节点是一棵树

///////////
// 函数声明
///////////

void print_sort_tree(Tree *tree);
Node* find_min_node(Tree *tree);
Node* find_max_node(Tree *tree);
Node* find_node(Tree *tree, ElementTP elem);
Node* insert_node(Tree *tree, ElementTP elem);
ElementTP delete_node(Node *node);

static int is_root(Node *node);
static int is_leaf(Node *node);
static ElementTP delete_leaf(Node *node);
static void insert_node_noempty_tree(Tree *tree, Node *node);


///////////
// 函数实现
///////////

/**
 * print 打印
 * @param tree [Tree *]
 */
void print_sort_tree(Tree *tree) {
	if (tree == NULL)
	{
		// printf("空树\n");
		return;
	}
	print_sort_tree(tree->lchild);
	printf("%d \n",tree->element);
	print_sort_tree(tree->rchild);
}

/**
 * 查找树中最小值
 * @param  tree [Tree *]
 * @return      [Node *]
 */
Node* find_min_node(Tree *tree) {
	if (tree == NULL) return NULL;
	while(tree->lchild != NULL) {
		tree = tree->lchild;
	}
	return tree;
}

/**
 * 查找树中最大值
 * @param  tree [Tree *]
 * @return      [Node *]
 */
Node* find_max_node(Tree *tree) {
	if (tree == NULL) return NULL;
	while(tree->rchild != NULL) {
		tree = tree->rchild;
	}
	return tree;
}

/**
 * 根据节点data查找该节点(递归查找)
 * @param  tree [Tree *]
 * @param  elem [ElementTP int]
 * @return      [Node *]
 */
Node* find_node(Tree *tree, ElementTP elem) {
	if (tree == NULL) return NULL;
	if (tree->element == elem) {
		return tree;
	} else if (tree->element > elem) {
		find_node(tree->lchild, elem);
	} else {
		find_node(tree->rchild, elem);
	}
}

/**
 * 插入一个节点到树中
 * @param  tree [Tree *]
 * @param  elem [ElementTP int]
 * @return      [Tree *]
 */
Tree* insert_node(Tree *tree, ElementTP elem) {
	Node *node = (Node *)malloc(sizeof(Node));

	node->element = elem;
	node->parent = NULL;
	node->lchild = NULL;
	node->rchild = NULL;

	if (tree == NULL) {
		tree = node;
	} else {
		insert_node_noempty_tree(tree, node);
	}
	return tree;
}

/**
 * 树中删除一个节点
 * @param  node [Node *]
 * @return      [ElementTP int]
 */
ElementTP delete_node(Node *node) {
	// 如果是叶节点直接释放
	if (is_leaf(node)) {
		return delete_leaf(node);
	} else {
		// 判断往左推还是往右推
		Node *repeat = (node->lchild != NULL) ? find_max_node(node->lchild) : find_min_node(node->rchild);
		ElementTP elem = node->element;
		node->element = delete_node(repeat);
		return elem;
	}
}

/**
 * 判断当前节点是否为根节点
 * @param  node [Node *]
 * @return      [bool]
 */
static int is_root(Node *node) {
	return (node->parent == NULL);
}

/**
 * 判断当前节点是否为叶节点
 * @param  node [Node *]
 * @return      [bool]
 */
static int is_leaf(Node *node) {
	return (node->lchild == NULL && node->rchild == NULL);
}

/**
 * 删除叶节点
 * @param  node [Node *]
 * @return      [ElementTP int]
 */
static ElementTP delete_leaf(Node *node) {
	ElementTP elem = node->element;
	Node *parent = node->parent;
	if (!is_root(node))
	{
		// 释放父节点引用
		if (parent->lchild == node) {
			parent->lchild = NULL;
		} else {
			parent->rchild = NULL;
		}
	}
	// 释放节点
	free(node);
	return elem;
}

/**
 * 插入一个节点到非空树(递归插入)
 * @param tree [Tree *]
 * @param node [Node *]
 */
static void insert_node_noempty_tree(Tree *tree, Node *node) {
	if (node->element < tree->element)
	{
		if (tree->lchild == NULL) {
			tree->lchild = node;
			node->parent = tree;
			return;
		} else {
			// 往左递归
			insert_node_noempty_tree(tree->lchild, node);
		}
		
	}
	else if (node->element > tree->element)
	{
		if (tree->rchild == NULL) {
			tree->rchild = node;
			node->parent = tree;
			return;
		} else {
			// 往右递归
			insert_node_noempty_tree(tree->rchild, node);
		}
	}
}

int main(int argc, char const *argv[])
{
	printf("*********************************\n");
	printf("************BST Test*************\n");
	printf("*********************************\n");

	/////////
	/// 测试
	/////////
	Tree *tree = NULL;// 用node拼接一棵树


	tree = insert_node(tree, 1000);
	tree = insert_node(tree, 18);
	tree = insert_node(tree, 5);
	tree = insert_node(tree, 2);
	tree = insert_node(tree, 8);
	tree = insert_node(tree, 81);
	tree = insert_node(tree, 101);

	
	// 打印tree
	printf("原二叉树\n");
	print_sort_tree(tree);

	// 找到8这个节点并删除
	Node *node = find_node(tree,101);
	if (node != NULL)
	{
		delete_node(node);
		printf("删除节点后二叉树\n");
		print_sort_tree(tree);
	}

	return 0;
}