import {
  Icon,
  Layout,
  Menu,
} from 'antd';

import React from 'react';

const { Item, SubMenu, } = Menu;
const { Sider, } = Layout;
const SideBar = ( {
  isSidebarCollapsed, menuItems, goToPath, toggleSideBar, currentPath, toggleKey, openKeys,
} ) => {
  const selectedKeys = [];
  const openSelectedKeys = [ ...openKeys, ];
  const determineIfOpen = item => {
    if ( currentPath.indexOf( item.path ) === 0 && item.path.length >= currentPath.length - 1 ) {
      if ( item.subMenu ) {
        openSelectedKeys.push( item.key );

        item.subMenu.forEach( determineIfOpen );
      } else selectedKeys.push( item.key );
    }
  };

  menuItems.forEach( determineIfOpen );

  const menuItemMap = item =>
    item.subMenu ? (
      <SubMenu
        key={ item.key }
        onTitleClick={ ( { key, } ) => toggleKey( key ) }
        title={
          <span>
            <Icon type={ item.icon } />
            <span>{item.label}</span>
          </span>
        }>
        {item.subMenu.map( menuItemMap )}
      </SubMenu>
    ) : (
      <Item
        key={ item.key }
        path={ item.path }>
        <Icon type={ item.icon } />
        <span>{item.label}</span>
      </Item>
    );

  return (
    <Sider
      collapsed={ isSidebarCollapsed }
      collapsible
      onMouseEnter={ () => isSidebarCollapsed && toggleSideBar() }
      onMouseLeave={ () => !isSidebarCollapsed && toggleSideBar() }
      style={ { backgroundColor: '#fff', } }
      trigger={ null }>
      <div className='logo' />
      <Menu
        mode='inline'
        onClick={ ( { item, } ) => goToPath( item.props.path ) }
        openKeys={ isSidebarCollapsed ? [] : openSelectedKeys }
        selectedKeys={ selectedKeys }
        style={ { height: '100%', } }
        theme='dark'>
        {menuItems.map( menuItemMap )}
      </Menu>
    </Sider>
  );
};

export default SideBar;
