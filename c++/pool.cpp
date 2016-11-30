

/**
 * 内存池实现
 */


/**
 * 相比malloc/new内存碎片少
 * 申请/释放速度快
 * 可避免内存泄漏
 */


/**
 * Pool结构体
 */
struct Pool
{
	List *list_first; // 当前内存池第一个list链表
	List *list_last; // 当前内存池最后一个list链表
};


/**
 * List结构体
 */
struct List
{
	Pool *pool; // 当前list所在Pool的指针
	List *list; // 下一list地址
};


/**
 * Block
 */
struct Block
{
	List *list; // Block所在list的指针
	Block *block; // Block的used指针
	int check; // 当前内存块校验码
};

/**
 * Pool---->list指针------------->list结构体
 * 		|							|____>free指针---->Block结构体(空闲内存)
 * 		|							|____>used指针---->Block结构体(使用中内存)
 * 		|							|____>size常量---->内存块大小
 * 		|							|____>next指针---->下一个Block地址
 * 		|__>list_last指针---|
 * 							|---->list结构体
 * 									|____>free指针
 * 									|____>used指针
 * 									|____>size常量
 * 									|____>next指针
 */

