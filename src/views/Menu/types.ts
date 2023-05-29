/**
 * 菜单项
 */
export interface MenuItem {
    /**
     * 菜单名称
     */
    title: string;
    /**
     * 菜单编码（对应 el-menu-item / el-sub-menu 组件的唯一标识 index 字段）
     */
    code: string;
    /**
     * 菜单的图标
     */
    icon?: string;
    /**
     * 子菜单
     */
    children?: MenuItem[]
  }
  
  /**
 * 菜单项字段配置结构
 */
export interface MenuOptions {
    title?: string;
    code?: string;
    icon?: string;
    children?: string;
  }
  /**
 * 菜单项默认字段名称
 */
export const defaultMenuOptions: MenuOptions = {
    title: 'title',
    code: 'code',
    icon: 'icon',
    children: 'children'
  }
  
  