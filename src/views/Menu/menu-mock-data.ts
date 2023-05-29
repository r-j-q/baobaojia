export const mockData = [{
    title: '系统管理',
    id: 'sys',
    logo: 'Menu',
    children: [{
      title: '权限管理',
      id: 'permission',
      logo: 'User',
      children: [
        { title: '角色管理', id: 'role', logo: 'User' },
        { title: '资源管理', id: 'res', logo: 'User' }
      ]
    }, {
      title: '字典管理', id: 'dict', logo: 'User'
    }]
  }, {
    title: '营销管理', id: '2', logo: 'Menu'
  }, {
    title: '测试',
    id: 'test',
    logo: 'Menu',
    children: [{
      title: '测试-1',
      id: 'test-1',
      logo: 'Document',
      children: [{ title: '测试-1-1', id: 'test-1-1', logo: 'Document', children: [{ title: '测试-1-1-1', id: 'test-1-1-1', logo: 'Document' }]}, { title: '测试-1-2', id: 'test-1-2', logo: 'Document' }]
    }]
  }]
  